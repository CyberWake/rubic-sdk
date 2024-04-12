"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyCrossChainEvmTrade = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const unapproved_contract_error_1 = require("../../../../../../common/errors/proxy/unapproved-contract-error");
const unapproved_method_error_1 = require("../../../../../../common/errors/proxy/unapproved-method-error");
const tokens_1 = require("../../../../../../common/tokens");
const native_tokens_1 = require("../../../../../../common/tokens/constants/native-tokens");
const wrapped_native_tokens_1 = require("../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_1 = require("../../../../../../common/utils/blockchain");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const blockchains_info_1 = require("../../../../../../core/blockchain/utils/blockchains-info/blockchains-info");
const blockchain_id_1 = require("../../../../../../core/blockchain/utils/blockchains-info/constants/blockchain-id");
const evm_web3_pure_1 = require("../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const web3_pure_1 = require("../../../../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../../../../core/injector/injector");
const rubic_proxy_contract_address_1 = require("../constants/rubic-proxy-contract-address");
const evm_common_cross_chain_abi_1 = require("../emv-cross-chain-trade/constants/evm-common-cross-chain-abi");
const typed_trade_providers_1 = require("../../../../../on-chain/calculation-manager/constants/trade-providers/typed-trade-providers");
const on_chain_manager_1 = require("../../../../../on-chain/calculation-manager/on-chain-manager");
const constants_1 = require("../../../../../on-chain/calculation-manager/providers/dexes/common/oneinch-abstract/constants");
const web3_utils_1 = require("web3-utils");
class ProxyCrossChainEvmTrade {
    static async getFeeInfo(fromBlockchain, providerAddress, percentFeeToken, useProxy) {
        const fixedFeeAmount = useProxy
            ? await ProxyCrossChainEvmTrade.getFixedFee(fromBlockchain, providerAddress, rubic_proxy_contract_address_1.rubicProxyContractAddress[fromBlockchain].router, evm_common_cross_chain_abi_1.evmCommonCrossChainAbi)
            : new bignumber_js_1.default(0);
        const feePercent = useProxy
            ? await ProxyCrossChainEvmTrade.getFeePercent(fromBlockchain, providerAddress, rubic_proxy_contract_address_1.rubicProxyContractAddress[fromBlockchain].router, evm_common_cross_chain_abi_1.evmCommonCrossChainAbi)
            : 0;
        const nativeToken = await tokens_1.PriceToken.createFromToken(native_tokens_1.nativeTokensList[fromBlockchain]);
        return {
            rubicProxy: {
                fixedFee: {
                    amount: fixedFeeAmount,
                    token: nativeToken
                },
                platformFee: {
                    percent: feePercent,
                    token: percentFeeToken
                }
            }
        };
    }
    /**
     * Gets fixed fee information.
     * @param fromBlockchain Source network blockchain.
     * @param providerAddress Integrator address.
     * @param contractAddress Contract address.
     * @param contractAbi Contract ABI.
     * @protected
     * @internal
     */
    static async getFixedFee(fromBlockchain, providerAddress, contractAddress, contractAbi) {
        const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
        const fromChainType = blockchains_info_1.BlockchainsInfo.getChainType(fromBlockchain);
        const nativeToken = native_tokens_1.nativeTokensList[fromBlockchain];
        if (!web3_pure_1.Web3Pure[fromChainType].isEmptyAddress(providerAddress)) {
            const integratorInfo = await web3Public.callContractMethod(contractAddress, contractAbi, 'integratorToFeeInfo', [providerAddress]);
            if (integratorInfo.isIntegrator) {
                return web3_pure_1.Web3Pure.fromWei(integratorInfo.fixedFeeAmount, nativeToken.decimals);
            }
        }
        return web3_pure_1.Web3Pure.fromWei(await web3Public.callContractMethod(contractAddress, contractAbi, 'fixedNativeFee'), nativeToken.decimals);
    }
    /**
     * Gets percent fee.
     * @param fromBlockchain Source network blockchain.
     * @param providerAddress Integrator address.
     * @param contractAddress Contract address.
     * @param contractAbi Contract ABI.
     * @protected
     * @internal
     */
    static async getFeePercent(fromBlockchain, providerAddress, contractAddress, contractAbi) {
        const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
        const fromChainType = blockchains_info_1.BlockchainsInfo.getChainType(fromBlockchain);
        if (!web3_pure_1.Web3Pure[fromChainType].isEmptyAddress(providerAddress)) {
            const integratorInfo = await web3Public.callContractMethod(contractAddress, contractAbi, 'integratorToFeeInfo', [providerAddress]);
            if (integratorInfo.isIntegrator) {
                return new bignumber_js_1.default(integratorInfo.tokenFee).toNumber() / 10000;
            }
        }
        return (new bignumber_js_1.default(await web3Public.callContractMethod(contractAddress, contractAbi, 'RubicPlatformFee')).toNumber() / 10000);
    }
    static async getOnChainTrade(from, transitToken, slippageTolerance, isCustomWeth = false) {
        const to = await tokens_1.PriceToken.createToken(transitToken);
        if ((0, blockchain_1.compareAddresses)(from.address, transitToken.address) && !from.isNative) {
            return null;
        }
        const fromBlockchain = from.blockchain;
        if (from.isNative) {
            try {
                const wrapToken = isCustomWeth
                    ? to.asStruct
                    : wrapped_native_tokens_1.wrappedNativeTokensList[fromBlockchain];
                const toWrap = new tokens_1.PriceToken({
                    ...wrapToken,
                    price: from.price
                });
                const trade = on_chain_manager_1.OnChainManager.getWrapTrade(from, toWrap, {
                    slippageTolerance
                });
                if (trade) {
                    return trade;
                }
            }
            catch { }
        }
        const availableDexes = await ProxyCrossChainEvmTrade.getWhitelistedDexes(fromBlockchain);
        const dexes = Object.values(typed_trade_providers_1.typedTradeProviders[fromBlockchain]);
        const allOnChainTrades = await Promise.allSettled(dexes.map(dex => dex.calculate(from, to, {
            slippageTolerance,
            gasCalculation: 'disabled',
            useProxy: false,
            usedForCrossChain: true
        })));
        const successSortedTrades = allOnChainTrades
            .filter(value => value.status === 'fulfilled')
            .map(value => value.value)
            .filter(onChainTrade => availableDexes.some(availableDex => (0, blockchain_1.compareAddresses)(availableDex, onChainTrade.dexContractAddress)))
            .sort((a, b) => b.to.tokenAmount.comparedTo(a.to.tokenAmount));
        if (!successSortedTrades.length) {
            return null;
        }
        return successSortedTrades[0];
    }
    static async getWhitelistedDexes(fromBlockchain) {
        const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
        return web3Public.callContractMethod(rubic_proxy_contract_address_1.rubicProxyContractAddress[fromBlockchain].router, evm_common_cross_chain_abi_1.evmCommonCrossChainAbi, 'approvedDexs');
    }
    static getBridgeData(swapOptions, tradeParams) {
        const toChainId = blockchain_id_1.blockchainId[tradeParams.toTokenAmount.blockchain] || 9999;
        const fromToken = tradeParams.srcChainTrade
            ? tradeParams.srcChainTrade.toTokenAmountMin
            : tradeParams.fromTokenAmount;
        const hasSwapBeforeBridge = tradeParams.srcChainTrade !== null;
        const toAddress = tradeParams.toAddress || tradeParams.toTokenAmount.address;
        const receiverAddress = ProxyCrossChainEvmTrade.getReceiverAddress(swapOptions?.receiverAddress, tradeParams.walletAddress, toChainId);
        return [
            evm_web3_pure_1.EvmWeb3Pure.randomHex(32),
            tradeParams.type.toLowerCase(),
            tradeParams.providerAddress,
            ProxyCrossChainEvmTrade.getReferrerAddress(swapOptions?.referrer),
            fromToken.isNative && fromToken.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.METIS
                ? toAddress
                : fromToken.address,
            toAddress,
            receiverAddress,
            tradeParams.fromAddress,
            fromToken.stringWeiAmount,
            toChainId,
            hasSwapBeforeBridge,
            Boolean(tradeParams?.dstChainTrade)
        ];
    }
    static getReferrerAddress(referrer) {
        if (referrer) {
            return '0x' + (0, web3_utils_1.utf8ToHex)(referrer).slice(2, 42).padStart(40, '0');
        }
        return '0x0000000000000000000000000000000000000000';
    }
    static async getSwapData(swapOptions, tradeParams) {
        const fromAddress = swapOptions.fromAddress || tradeParams.walletAddress || constants_1.oneinchApiParams.nativeAddress;
        const swapData = await tradeParams.onChainEncodeFn({
            fromAddress,
            receiverAddress: tradeParams.contractAddress,
            supportFee: false
        });
        const routerAddress = swapData.to;
        const signature = swapData.data.slice(0, 10);
        await ProxyCrossChainEvmTrade.checkDexWhiteList(tradeParams.fromTokenAmount.blockchain, routerAddress, signature);
        return [
            [
                routerAddress,
                routerAddress,
                tradeParams.fromTokenAmount.address,
                tradeParams.toTokenAmount.address,
                tradeParams.fromTokenAmount.stringWeiAmount,
                swapData.data,
                true
            ]
        ];
    }
    static async getGenericProviderData(providerAddress, providerData, fromBlockchain, gatewayAddress, extraNative) {
        await ProxyCrossChainEvmTrade.checkCrossChainWhiteList(fromBlockchain, providerAddress, providerData.slice(0, 10));
        return [providerAddress, gatewayAddress, extraNative, providerData];
    }
    static async checkCrossChainWhiteList(fromBlockchain, routerAddress, offset) {
        const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
        const result = await web3Public.callContractMethod(rubic_proxy_contract_address_1.rubicProxyContractAddress[fromBlockchain].router, evm_common_cross_chain_abi_1.evmCommonCrossChainAbi, 'getSelectorInfo', [routerAddress, offset]);
        if (!result.isAvailable) {
            throw new unapproved_contract_error_1.UnapprovedContractError(offset, routerAddress);
        }
    }
    static async checkDexWhiteList(fromBlockchain, routerAddress, method) {
        const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
        let isRouterApproved = false;
        try {
            isRouterApproved = await web3Public.callContractMethod(rubic_proxy_contract_address_1.rubicProxyContractAddress[fromBlockchain].router, evm_common_cross_chain_abi_1.evmCommonCrossChainAbi, 'isContractApproved', [routerAddress]);
        }
        catch { }
        if (!isRouterApproved) {
            throw new unapproved_contract_error_1.UnapprovedContractError(method, routerAddress);
        }
        let isMethodApproved = false;
        try {
            isMethodApproved = await web3Public.callContractMethod(rubic_proxy_contract_address_1.rubicProxyContractAddress[fromBlockchain].router, evm_common_cross_chain_abi_1.evmCommonCrossChainAbi, 'isFunctionApproved', [method]);
        }
        catch { }
        if (!isMethodApproved) {
            throw new unapproved_method_error_1.UnapprovedMethodError(method, routerAddress);
        }
    }
    static getReceiverAddress(receiverAddress, walletAddress, toChainId) {
        if (toChainId === blockchain_id_1.blockchainId[blockchain_name_1.BLOCKCHAIN_NAME.BITCOIN] ||
            toChainId === blockchain_id_1.blockchainId[blockchain_name_1.BLOCKCHAIN_NAME.SOLANA]) {
            return walletAddress;
        }
        return receiverAddress || walletAddress;
    }
}
exports.ProxyCrossChainEvmTrade = ProxyCrossChainEvmTrade;
//# sourceMappingURL=proxy-cross-chain-evm-trade.js.map