"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BridgersCrossChainProvider = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../common/errors");
const tokens_1 = require("../../../../../common/tokens");
const native_tokens_1 = require("../../../../../common/tokens/constants/native-tokens");
const blockchain_name_1 = require("../../../../../core/blockchain/models/blockchain-name");
const blockchains_info_1 = require("../../../../../core/blockchain/utils/blockchains-info/blockchains-info");
const web3_pure_1 = require("../../../../../core/blockchain/web3-pure/web3-pure");
const bridgers_native_address_1 = require("../../../../common/providers/bridgers/constants/bridgers-native-address");
const to_bridgers_blockchain_1 = require("../../../../common/providers/bridgers/constants/to-bridgers-blockchain");
const token_native_address_proxy_1 = require("../../../../common/utils/token-native-address-proxy");
const cross_chain_trade_type_1 = require("../../models/cross-chain-trade-type");
const bridgers_cross_chain_supported_blockchain_1 = require("./constants/bridgers-cross-chain-supported-blockchain");
const evm_bridgers_cross_chain_trade_1 = require("./evm-bridgers-trade/evm-bridgers-cross-chain-trade");
const tron_bridgers_cross_chain_trade_1 = require("./tron-bridgers-trade/tron-bridgers-cross-chain-trade");
const cross_chain_provider_1 = require("../common/cross-chain-provider");
const evm_common_cross_chain_abi_1 = require("../common/emv-cross-chain-trade/constants/evm-common-cross-chain-abi");
const tron_common_cross_chain_abi_1 = require("../common/tron-cross-chain-trade/constants/tron-common-cross-chain-abi");
class BridgersCrossChainProvider extends cross_chain_provider_1.CrossChainProvider {
    constructor() {
        super(...arguments);
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.BRIDGERS;
    }
    isSupportedBlockchain(blockchain) {
        return bridgers_cross_chain_supported_blockchain_1.bridgersCrossChainSupportedBlockchains.some(supportedBlockchain => supportedBlockchain === blockchain);
    }
    areSupportedBlockchains(fromBlockchain, toBlockchain) {
        return ((fromBlockchain === blockchain_name_1.BLOCKCHAIN_NAME.TRON && this.isSupportedBlockchain(toBlockchain)) ||
            (this.isSupportedBlockchain(fromBlockchain) && toBlockchain === blockchain_name_1.BLOCKCHAIN_NAME.TRON));
    }
    async calculate(from, toToken, options) {
        const fromBlockchain = from.blockchain;
        const toBlockchain = toToken.blockchain;
        if (!this.areSupportedBlockchains(fromBlockchain, toBlockchain)) {
            return {
                trade: null,
                error: new errors_1.NotSupportedTokensError(),
                tradeType: this.type
            };
        }
        try {
            const contractAbi = blockchains_info_1.BlockchainsInfo.isTronBlockchainName(fromBlockchain)
                ? tron_common_cross_chain_abi_1.tronCommonCrossChainAbi
                : evm_common_cross_chain_abi_1.evmCommonCrossChainAbi;
            let feeInfo = await this.getFeeInfo(fromBlockchain, options.providerAddress, from, false, contractAbi);
            // const fromWithoutFee = getFromWithoutFee(
            //     from,
            //     feeInfo.rubicProxy?.platformFee?.percent
            // );
            const fromWithoutFee = from;
            const fromTokenAddress = (0, token_native_address_proxy_1.createTokenNativeAddressProxy)(from, bridgers_native_address_1.bridgersNativeAddress, false).address;
            const toTokenAddress = (0, token_native_address_proxy_1.createTokenNativeAddressProxy)(toToken, bridgers_native_address_1.bridgersNativeAddress, false).address;
            const quoteRequest = {
                fromTokenAddress,
                toTokenAddress,
                fromTokenAmount: fromWithoutFee.stringWeiAmount,
                fromTokenChain: to_bridgers_blockchain_1.toBridgersBlockchain[fromBlockchain],
                toTokenChain: to_bridgers_blockchain_1.toBridgersBlockchain[toBlockchain]
            };
            const quoteResponse = await this.httpClient.post('https://sswap.swft.pro/api/sswap/quote', quoteRequest);
            const transactionData = quoteResponse.data?.txData;
            if (quoteResponse.resCode !== 100 || !transactionData) {
                return {
                    trade: null,
                    error: cross_chain_provider_1.CrossChainProvider.parseError(new errors_1.BridgersPairIsUnavailableError()),
                    tradeType: this.type
                };
            }
            if (from.tokenAmount.lt(transactionData.depositMin)) {
                return {
                    trade: null,
                    error: new errors_1.MinAmountError(new bignumber_js_1.default(transactionData.depositMin), from.symbol),
                    tradeType: this.type
                };
            }
            if (from.tokenAmount.gt(transactionData.depositMax)) {
                return {
                    trade: null,
                    error: new errors_1.MaxAmountError(new bignumber_js_1.default(transactionData.depositMax), from.symbol),
                    tradeType: this.type
                };
            }
            const to = new tokens_1.PriceTokenAmount({
                ...toToken.asStruct,
                blockchain: toBlockchain,
                tokenAmount: new bignumber_js_1.default(transactionData.toTokenAmount)
            });
            const toTokenAmountMin = web3_pure_1.Web3Pure.fromWei(transactionData.amountOutMin, toToken.decimals);
            if (blockchains_info_1.BlockchainsInfo.isEvmBlockchainName(fromBlockchain)) {
                const gasData = options.gasCalculation === 'enabled' && options.receiverAddress
                    ? await evm_bridgers_cross_chain_trade_1.EvmBridgersCrossChainTrade.getGasData(from, to, options.receiverAddress, options.providerAddress, feeInfo, toTokenAmountMin)
                    : null;
                return {
                    trade: new evm_bridgers_cross_chain_trade_1.EvmBridgersCrossChainTrade({
                        from: from,
                        to: to,
                        toTokenAmountMin,
                        feeInfo,
                        gasData,
                        slippage: options.slippageTolerance
                    }, options.providerAddress, await this.getRoutePath(from, to)),
                    tradeType: this.type
                };
            }
            return {
                trade: new tron_bridgers_cross_chain_trade_1.TronBridgersCrossChainTrade({
                    from: from,
                    to: to,
                    toTokenAmountMin,
                    feeInfo,
                    slippage: options.slippageTolerance,
                    contractAddress: transactionData.contractAddress
                }, options.providerAddress, await this.getRoutePath(from, to)),
                tradeType: this.type
            };
        }
        catch (err) {
            return {
                trade: null,
                error: cross_chain_provider_1.CrossChainProvider.parseError(err),
                tradeType: this.type
            };
        }
    }
    async getFeeInfo(fromBlockchain, _providerAddress, _percentFeeToken, _useProxy, _contractAbi) {
        const nativeToken = await tokens_1.PriceToken.createFromToken(native_tokens_1.nativeTokensList[fromBlockchain]);
        return {
            rubicProxy: {
                fixedFee: {
                    amount: new bignumber_js_1.default(0),
                    token: nativeToken
                }
            }
        };
    }
    async getRoutePath(fromToken, toToken) {
        return [{ type: 'cross-chain', provider: this.type, path: [fromToken, toToken] }];
    }
}
exports.BridgersCrossChainProvider = BridgersCrossChainProvider;
//# sourceMappingURL=bridgers-cross-chain-provider.js.map