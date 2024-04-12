"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IzumiTrade = void 0;
const base_1 = require("iziswap-sdk/lib/base");
const swap_1 = require("iziswap-sdk/lib/swap");
const blockchain_id_1 = require("../../../../../../../core/blockchain/utils/blockchains-info/constants/blockchain-id");
const injector_1 = require("../../../../../../../core/injector/injector");
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const evm_on_chain_trade_1 = require("../../../common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade");
const get_gas_price_info_1 = require("../../../common/utils/get-gas-price-info");
class IzumiTrade extends evm_on_chain_trade_1.EvmOnChainTrade {
    static async getGasLimit(tradeStruct, providerAddress) {
        const fromBlockchain = tradeStruct.from.blockchain;
        const walletAddress = injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(fromBlockchain).address;
        if (!walletAddress) {
            return null;
        }
        try {
            const transactionConfig = await new IzumiTrade(tradeStruct, providerAddress).encode({
                fromAddress: walletAddress
            });
            const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
            const gasLimit = await web3Public.getEstimatedGasByData(walletAddress, transactionConfig.to, {
                data: transactionConfig.data,
                value: transactionConfig.value
            });
            if (!gasLimit?.isFinite()) {
                return null;
            }
            return gasLimit;
        }
        catch (err) {
            console.debug(err);
            return null;
        }
    }
    get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.IZUMI;
    }
    async encodeDirect(options) {
        const tokenChain = blockchain_id_1.blockchainId[this.from.blockchain];
        const swapParams = {
            feeChain: this.swapConfig.feeChain,
            tokenChain: this.swapConfig.tokenChain.map(token => ({
                address: token,
                chainId: tokenChain
            })),
            inputAmount: this.from.stringWeiAmount,
            minOutputAmount: this.toTokenAmountMin.stringWeiAmount,
            recipient: options?.receiverAddress || this.walletAddress,
            strictERC20Token: this.strictERC20Token
        };
        const chainId = blockchain_id_1.blockchainId[this.from.blockchain];
        const chain = base_1.initialChainTable[chainId];
        const web3 = injector_1.Injector.web3PublicService.getWeb3Public(this.from.blockchain).web3Provider;
        const swapContract = (0, swap_1.getSwapContract)(this.dexContractAddress, web3);
        const gasPriceInfo = await (0, get_gas_price_info_1.getGasPriceInfo)(this.from.blockchain);
        const { swapCalling, options: data } = (0, swap_1.getSwapChainWithExactInputCall)(swapContract, this.walletAddress, chain, swapParams, gasPriceInfo.gasPrice.toFixed());
        return {
            to: this.dexContractAddress,
            value: data.value,
            data: swapCalling.encodeABI()
        };
    }
    constructor(tradeStruct, providerAddress) {
        super(tradeStruct, providerAddress);
        this.strictERC20Token = false;
        this.dexContractAddress = tradeStruct.dexContractAddress;
        this.swapConfig = tradeStruct.swapConfig;
        this.strictERC20Token = tradeStruct.strictERC20Token;
    }
}
exports.IzumiTrade = IzumiTrade;
//# sourceMappingURL=izumi-trade.js.map