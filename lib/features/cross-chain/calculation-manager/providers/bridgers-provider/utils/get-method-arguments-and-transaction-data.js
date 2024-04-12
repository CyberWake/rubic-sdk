"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMethodArgumentsAndTransactionData = void 0;
const blockchains_info_1 = require("../../../../../../core/blockchain/utils/blockchains-info/blockchains-info");
const blockchain_id_1 = require("../../../../../../core/blockchain/utils/blockchains-info/constants/blockchain-id");
const tron_web3_pure_1 = require("../../../../../../core/blockchain/web3-pure/typed-web3-pure/tron-web3-pure/tron-web3-pure");
const web3_pure_1 = require("../../../../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../../../../core/injector/injector");
const bridgers_native_address_1 = require("../../../../../common/providers/bridgers/constants/bridgers-native-address");
const to_bridgers_blockchain_1 = require("../../../../../common/providers/bridgers/constants/to-bridgers-blockchain");
const bridgers_contract_addresses_1 = require("../../../../../common/providers/bridgers/models/bridgers-contract-addresses");
const token_native_address_proxy_1 = require("../../../../../common/utils/token-native-address-proxy");
async function getMethodArgumentsAndTransactionData(from, fromWithoutFee, to, toTokenAmountMin, walletAddress, providerAddress, options, checkAmountFn, skipAmountChangeCheck = false) {
    const amountOutMin = web3_pure_1.Web3Pure.toWei(toTokenAmountMin, to.decimals);
    const fromTokenAddress = (0, token_native_address_proxy_1.createTokenNativeAddressProxy)(fromWithoutFee, bridgers_native_address_1.bridgersNativeAddress).address;
    const toTokenAddress = (0, token_native_address_proxy_1.createTokenNativeAddressProxy)(to, bridgers_native_address_1.bridgersNativeAddress).address;
    const fromAddress = options.fromAddress || walletAddress;
    const swapRequest = {
        fromTokenAddress,
        toTokenAddress,
        fromAddress,
        toAddress: options.receiverAddress,
        fromTokenChain: to_bridgers_blockchain_1.toBridgersBlockchain[fromWithoutFee.blockchain],
        toTokenChain: to_bridgers_blockchain_1.toBridgersBlockchain[to.blockchain],
        fromTokenAmount: fromWithoutFee.stringWeiAmount,
        amountOutMin,
        equipmentNo: fromAddress.slice(0, 32),
        sourceFlag: 'rubic'
    };
    const swapData = await injector_1.Injector.httpClient.post('https://sswap.swft.pro/api/sswap/swap', swapRequest);
    const transactionData = swapData.data?.txData;
    if (!skipAmountChangeCheck) {
        const quoteRequest = {
            fromTokenAddress,
            toTokenAddress,
            fromTokenAmount: fromWithoutFee.stringWeiAmount,
            fromTokenChain: to_bridgers_blockchain_1.toBridgersBlockchain[from.blockchain],
            toTokenChain: to_bridgers_blockchain_1.toBridgersBlockchain[to.blockchain]
        };
        const quoteResponse = await injector_1.Injector.httpClient.post('https://sswap.swft.pro/api/sswap/quote', quoteRequest);
        const transactionQuoteData = quoteResponse.data?.txData;
        if (transactionQuoteData?.amountOutMin) {
            checkAmountFn('value' in transactionData ? transactionData : { data: '', to: '', value: '' }, transactionQuoteData.amountOutMin, web3_pure_1.Web3Pure.toWei(toTokenAmountMin, to.decimals));
        }
    }
    const dstTokenAddress = blockchains_info_1.BlockchainsInfo.isTronBlockchainName(to.blockchain)
        ? tron_web3_pure_1.TronWeb3Pure.addressToHex(to.address)
        : to.address;
    const receiverAddress = blockchains_info_1.BlockchainsInfo.isTronBlockchainName(to.blockchain)
        ? tron_web3_pure_1.TronWeb3Pure.addressToHex(options.receiverAddress)
        : options.receiverAddress;
    const contractAddress = transactionData?.to || bridgers_contract_addresses_1.bridgersContractAddresses[from.blockchain];
    const methodArguments = [
        'native:bridgers',
        [
            from.address,
            from.stringWeiAmount,
            blockchain_id_1.blockchainId[to.blockchain],
            dstTokenAddress,
            amountOutMin,
            receiverAddress,
            providerAddress,
            contractAddress
        ]
    ];
    if (!from.isNative) {
        methodArguments.push(contractAddress);
    }
    return {
        methodArguments,
        transactionData: { ...transactionData, to: contractAddress }
    };
}
exports.getMethodArgumentsAndTransactionData = getMethodArgumentsAndTransactionData;
//# sourceMappingURL=get-method-arguments-and-transaction-data.js.map