"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbiosisCrossChainProvider = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../common/errors");
const tokens_1 = require("../../../../../common/tokens");
const blockchain_name_1 = require("../../../../../core/blockchain/models/blockchain-name");
const blockchain_id_1 = require("../../../../../core/blockchain/utils/blockchains-info/constants/blockchain-id");
const web3_pure_1 = require("../../../../../core/blockchain/web3-pure/web3-pure");
const symbiosis_api_service_1 = require("../../../../common/providers/symbiosis/services/symbiosis-api-service");
const get_from_without_fee_1 = require("../../../../common/utils/get-from-without-fee");
const cross_chain_trade_type_1 = require("../../models/cross-chain-trade-type");
const cross_chain_provider_1 = require("../common/cross-chain-provider");
const proxy_cross_chain_evm_trade_1 = require("../common/proxy-cross-chain-evm-facade/proxy-cross-chain-evm-trade");
const symbiosis_cross_chain_trade_1 = require("./symbiosis-cross-chain-trade");
const on_chain_trade_type_1 = require("../../../../on-chain/calculation-manager/providers/common/models/on-chain-trade-type");
const constants_1 = require("../../../../on-chain/calculation-manager/providers/dexes/common/oneinch-abstract/constants");
const symbiosis_cross_chain_supported_blockchains_1 = require("./models/symbiosis-cross-chain-supported-blockchains");
class SymbiosisCrossChainProvider extends cross_chain_provider_1.CrossChainProvider {
    constructor() {
        super(...arguments);
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.SYMBIOSIS;
    }
    isSupportedBlockchain(blockchain) {
        return symbiosis_cross_chain_supported_blockchains_1.symbiosisCrossChainSupportedBlockchains.some(supportedBlockchain => supportedBlockchain === blockchain);
    }
    areSupportedBlockchains(fromBlockchain, toBlockchain) {
        if (fromBlockchain === blockchain_name_1.BLOCKCHAIN_NAME.BITCOIN) {
            return false;
        }
        return super.areSupportedBlockchains(fromBlockchain, toBlockchain);
    }
    // eslint-disable-next-line complexity
    async calculate(from, toToken, options) {
        const fromBlockchain = from.blockchain;
        const toBlockchain = toToken.blockchain;
        const useProxy = options?.useProxy?.[this.type] ?? true;
        // @TODO remove Tron check
        if (!this.areSupportedBlockchains(fromBlockchain, toBlockchain) ||
            fromBlockchain === blockchain_name_1.BLOCKCHAIN_NAME.TRON ||
            fromBlockchain === blockchain_name_1.BLOCKCHAIN_NAME.BITCOIN) {
            return {
                trade: null,
                error: new errors_1.NotSupportedTokensError(),
                tradeType: this.type
            };
        }
        let disabledTrade = {};
        try {
            const fromAddress = options.fromAddress ||
                this.getWalletAddress(fromBlockchain) ||
                constants_1.oneinchApiParams.nativeAddress;
            const feeInfo = await this.getFeeInfo(fromBlockchain, options.providerAddress, from, useProxy);
            const fromWithoutFee = (0, get_from_without_fee_1.getFromWithoutFee)(from, feeInfo.rubicProxy?.platformFee?.percent);
            let tokenInAddress;
            if (from.isNative && from.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.METIS) {
                tokenInAddress = '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000';
            }
            else if (from.isNative) {
                tokenInAddress = '';
            }
            else {
                tokenInAddress = from.address;
            }
            const tokenIn = {
                chainId: blockchain_id_1.blockchainId[fromBlockchain],
                address: tokenInAddress,
                decimals: from.decimals,
                isNative: from.isNative,
                symbol: from.symbol
            };
            const tokenOut = {
                chainId: toBlockchain !== blockchain_name_1.BLOCKCHAIN_NAME.TRON ? blockchain_id_1.blockchainId[toBlockchain] : 728126428,
                address: toToken.isNative ? '' : toToken.address,
                decimals: toToken.decimals,
                isNative: toToken.isNative,
                symbol: toToken.symbol
            };
            const symbiosisTokenAmountIn = {
                ...tokenIn,
                amount: fromWithoutFee.stringWeiAmount
            };
            const deadline = Math.floor(Date.now() / 1000) + 60 * options.deadline;
            const slippageTolerance = options.slippageTolerance * 10000;
            const swapParams = {
                tokenAmountIn: symbiosisTokenAmountIn,
                tokenOut,
                from: fromAddress,
                to: this.getSwapParamsToAddress(options.receiverAddress, fromAddress, toBlockchain),
                revertableAddress: fromAddress,
                slippage: slippageTolerance,
                deadline
            };
            const mockTo = new tokens_1.PriceTokenAmount({
                ...toToken.asStruct,
                tokenAmount: web3_pure_1.Web3Pure.fromWei(0, toToken.decimals)
            });
            disabledTrade = this.getEmptyTrade(from, mockTo, swapParams, feeInfo);
            const { tokenAmountOut, inTradeType, outTradeType, tx, approveTo, route } = await symbiosis_api_service_1.SymbiosisApiService.getCrossChainSwapTx(swapParams);
            const to = new tokens_1.PriceTokenAmount({
                ...toToken.asStruct,
                tokenAmount: web3_pure_1.Web3Pure.fromWei(tokenAmountOut.amount, tokenAmountOut.decimals)
            });
            const gasData = options.gasCalculation === 'enabled'
                ? await symbiosis_cross_chain_trade_1.SymbiosisCrossChainTrade.getGasData(from, to, swapParams, feeInfo, approveTo, options.providerAddress, options.receiverAddress)
                : null;
            return {
                trade: new symbiosis_cross_chain_trade_1.SymbiosisCrossChainTrade({
                    from,
                    to,
                    gasData,
                    priceImpact: from.calculatePriceImpactPercent(to),
                    slippage: options.slippageTolerance,
                    swapParams,
                    feeInfo,
                    transitAmount: from.tokenAmount,
                    tradeType: { in: inTradeType, out: outTradeType },
                    contractAddresses: {
                        providerRouter: tx.to,
                        providerGateway: approveTo
                    }
                }, options.providerAddress, await this.getRoutePath(from, to, route)),
                tradeType: this.type
            };
        }
        catch (err) {
            let rubicSdkError = cross_chain_provider_1.CrossChainProvider.parseError(err);
            const symbiosisErr = err;
            const symbiosisSdkError = this.handleMinAmountError(symbiosisErr);
            return {
                trade: symbiosisSdkError ? disabledTrade : null,
                error: symbiosisSdkError || rubicSdkError,
                tradeType: this.type
            };
        }
    }
    async getFeeInfo(fromBlockchain, providerAddress, percentFeeToken, useProxy) {
        return proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getFeeInfo(fromBlockchain, providerAddress, percentFeeToken, useProxy);
    }
    getTransferToken(route, from) {
        const fromBlockchainId = blockchain_id_1.blockchainId[from.blockchain];
        const fromRouting = route.filter(token => token.chainId === fromBlockchainId);
        const token = fromRouting.at(-1);
        return fromRouting.length !== 1
            ? {
                address: token.address,
                decimals: token.decimals,
                name: token.name,
                blockchain: from.blockchain,
                symbol: token.symbol
            }
            : undefined;
    }
    async getRoutePath(fromToken, toToken, route) {
        const fromChainId = blockchain_id_1.blockchainId[fromToken.blockchain];
        const toChainId = blockchain_id_1.blockchainId[toToken.blockchain];
        const transitFrom = [...route].reverse().find(el => el.chainId === fromChainId);
        const transitTo = route.find(el => el.chainId === toChainId);
        const fromTokenAmount = transitFrom
            ? await tokens_1.TokenAmount.createToken({
                blockchain: fromToken.blockchain,
                address: transitFrom.address,
                weiAmount: new bignumber_js_1.default(0)
            })
            : fromToken;
        const toTokenAmount = transitTo
            ? await tokens_1.TokenAmount.createToken({
                blockchain: toToken.blockchain,
                address: transitTo.address,
                weiAmount: new bignumber_js_1.default(0)
            })
            : toToken;
        const routePath = [];
        if (transitFrom) {
            routePath.push({
                type: 'on-chain',
                provider: on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.SYMBIOSIS_SWAP,
                path: [fromToken, fromTokenAmount]
            });
        }
        routePath.push({
            type: 'cross-chain',
            provider: cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.SYMBIOSIS,
            path: [fromTokenAmount, toTokenAmount]
        });
        if (transitTo) {
            routePath.push({
                type: 'on-chain',
                provider: on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.SYMBIOSIS_SWAP,
                path: [toTokenAmount, toToken]
            });
        }
        return routePath;
    }
    getSwapParamsToAddress(receiverAddress, fromAddress, toBlockchain) {
        if (toBlockchain === blockchain_name_1.BLOCKCHAIN_NAME.BITCOIN && !receiverAddress) {
            return 'bc1qvyf8ufqpeyfe6vshfxdrr970rkqfphgz28ulhr';
        }
        return receiverAddress || fromAddress;
    }
    handleMinAmountError(err) {
        const msg = err.error.message || '';
        if (msg.includes('too low')) {
            const [, minAmount] = msg.toLowerCase().split('min amount: ');
            const minAmountBN = new bignumber_js_1.default(minAmount);
            const isFeeInUSDC = minAmountBN.gt(0.5);
            const symbol = isFeeInUSDC ? 'USDC' : 'WETH';
            return new errors_1.MinAmountError(minAmountBN, symbol);
        }
        return null;
    }
    getEmptyTrade(from, to, swapParams, feeInfo) {
        return new symbiosis_cross_chain_trade_1.SymbiosisCrossChainTrade({
            from,
            to: to,
            gasData: null,
            priceImpact: null,
            slippage: 0,
            swapParams,
            feeInfo,
            transitAmount: from.tokenAmount,
            tradeType: { in: undefined, out: undefined },
            contractAddresses: {
                providerRouter: '',
                providerGateway: ''
            }
        }, '', [
            {
                type: 'cross-chain',
                provider: cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.SYMBIOSIS,
                path: [from, to]
            }
        ]);
    }
}
exports.SymbiosisCrossChainProvider = SymbiosisCrossChainProvider;
//# sourceMappingURL=symbiosis-cross-chain-provider.js.map