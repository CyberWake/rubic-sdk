"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurveAbstractProvider = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../../common/errors");
const tokens_1 = require("../../../../../../../common/tokens");
const blockchain_1 = require("../../../../../../../common/utils/blockchain");
const options_1 = require("../../../../../../../common/utils/options");
const evm_web3_pure_1 = require("../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const get_gas_fee_info_1 = require("../../../common/utils/get-gas-fee-info");
const get_gas_price_info_1 = require("../../../common/utils/get-gas-price-info");
const address_provider_abi_1 = require("./constants/address-provider-abi");
const registry_abi_1 = require("./constants/registry-abi");
const registry_exchange_abi_1 = require("./constants/registry-exchange-abi");
const evm_provider_default_options_1 = require("../on-chain-provider/evm-on-chain-provider/constants/evm-provider-default-options");
const evm_on_chain_provider_1 = require("../on-chain-provider/evm-on-chain-provider/evm-on-chain-provider");
class CurveAbstractProvider extends evm_on_chain_provider_1.EvmOnChainProvider {
    constructor() {
        super(...arguments);
        this.addressProvider = '0x0000000022D53366457F9d5E68Ec105046FC4383';
        this.defaultOptions = {
            ...evm_provider_default_options_1.evmProviderDefaultOptions,
            deadlineMinutes: 20,
            disableMultihops: false
        };
    }
    get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.CURVE;
    }
    async calculate(fromToken, toToken, options) {
        const fromAddress = fromToken.isNative
            ? CurveAbstractProvider.nativeAddress
            : fromToken.address;
        const toAddress = toToken.isNative ? CurveAbstractProvider.nativeAddress : toToken.address;
        const registryExchangeAddress = await this.fetchRegistryExchangeAddress();
        const registryAddress = await this.fetchRegistryAddress();
        let poolAddress = await this.fetchPoolAddress(fromAddress, toAddress, registryAddress);
        const fullOptions = (0, options_1.combineOptions)(options, this.defaultOptions);
        const { fromWithoutFee, proxyFeeInfo } = await this.handleProxyContract(fromToken, fullOptions);
        const fromAmount = fromWithoutFee.stringWeiAmount;
        if ((0, blockchain_1.compareAddresses)(poolAddress, evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS)) {
            const bestRate = await this.fetchBestRate(fromAddress, toAddress, fromAmount, registryExchangeAddress);
            poolAddress = bestRate[0];
        }
        if ((0, blockchain_1.compareAddresses)(poolAddress, evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS)) {
            throw new errors_1.RubicSdkError('Token is not supported.');
        }
        const amountOut = await this.fetchExchangeAmount(fromAddress, toAddress, fromAmount, poolAddress, registryExchangeAddress);
        const to = new tokens_1.PriceTokenAmount({
            ...toToken.asStruct,
            weiAmount: new bignumber_js_1.default(amountOut)
        });
        const tradeStruct = {
            from: fromToken,
            to,
            slippageTolerance: fullOptions.slippageTolerance,
            gasFeeInfo: null,
            useProxy: fullOptions.useProxy,
            proxyFeeInfo,
            fromWithoutFee,
            withDeflation: fullOptions.withDeflation,
            path: [fromToken, toToken],
            registryExchangeAddress,
            poolAddress,
            usedForCrossChain: fullOptions.usedForCrossChain
        };
        const trade = new this.Trade(tradeStruct, fullOptions.providerAddress);
        let gasFeeInfo = null;
        const spenderAddress = options?.fromAddress || this.walletAddress;
        if (spenderAddress) {
            const params = await trade.encodeDirect({
                fromAddress: spenderAddress,
                supportFee: false
            });
            const gasPrice = await (0, get_gas_price_info_1.getGasPriceInfo)(fromToken.blockchain);
            let gasLimit;
            try {
                gasLimit = await this.web3Public.getEstimatedGasByData(spenderAddress, registryExchangeAddress, {
                    data: params.data
                });
            }
            catch {
                gasLimit = new bignumber_js_1.default(400000); // Default gas limit
            }
            gasFeeInfo = (0, get_gas_fee_info_1.getGasFeeInfo)(gasLimit, gasPrice);
        }
        return new this.Trade({ ...tradeStruct, gasFeeInfo }, fullOptions.providerAddress);
    }
    async fetchRegistryExchangeAddress() {
        return this.web3Public.callContractMethod(this.addressProvider, address_provider_abi_1.addressProviderAbi, 'get_address', ['2']);
    }
    async fetchRegistryAddress() {
        return this.web3Public.callContractMethod(this.addressProvider, address_provider_abi_1.addressProviderAbi, 'get_address', ['0']);
    }
    async fetchPoolAddress(fromAddress, toAddress, registryAddress) {
        return this.web3Public.callContractMethod(registryAddress, registry_abi_1.registryAbi, 'find_pool_for_coins', [fromAddress, toAddress]);
    }
    async fetchBestRate(fromAddress, toAddress, fromAmount, registryExchangeAddress) {
        return this.web3Public.callContractMethod(registryExchangeAddress, registry_exchange_abi_1.registryExchangeAbi, 'get_best_rate', [fromAddress, toAddress, fromAmount]);
    }
    async fetchExchangeAmount(fromAddress, toAddress, fromAmount, poolAddress, registryExchangeAddress) {
        return this.web3Public.callContractMethod(registryExchangeAddress, registry_exchange_abi_1.registryExchangeAbi, 'get_exchange_amount', [poolAddress, fromAddress, toAddress, fromAmount]);
    }
}
exports.CurveAbstractProvider = CurveAbstractProvider;
CurveAbstractProvider.nativeAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
//# sourceMappingURL=curve-abstract-provider.js.map