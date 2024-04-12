"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenOceanTrade = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../common/errors");
const native_tokens_1 = require("../../../../../../common/tokens/constants/native-tokens");
const price_token_amount_1 = require("../../../../../../common/tokens/price-token-amount");
const errors_2 = require("../../../../../../common/utils/errors");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const chain_type_1 = require("../../../../../../core/blockchain/models/chain-type");
const evm_web3_pure_1 = require("../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const web3_pure_1 = require("../../../../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../../../../core/injector/injector");
const check_unsupported_receiver_address_1 = require("../../../../../common/utils/check-unsupported-receiver-address");
const rubic_proxy_contract_address_1 = require("../../../../../cross-chain/calculation-manager/providers/common/constants/rubic-proxy-contract-address");
const proxy_cross_chain_evm_trade_1 = require("../../../../../cross-chain/calculation-manager/providers/common/proxy-cross-chain-evm-facade/proxy-cross-chain-evm-trade");
const get_open_ocean_api_url_1 = require("./constants/get-open-ocean-api-url");
const open_ocean_blockchain_1 = require("./constants/open-ocean-blockchain");
const on_chain_trade_type_1 = require("../../common/models/on-chain-trade-type");
const aggregator_evm_on_chain_trade_abstract_1 = require("../../common/on-chain-aggregator/aggregator-evm-on-chain-trade-abstract");
const arbitrum_gas_price_1 = require("./constants/arbitrum-gas-price");
class OpenOceanTrade extends aggregator_evm_on_chain_trade_abstract_1.AggregatorEvmOnChainTrade {
    /** @internal */
    static async getGasLimit(openOceanTradeStruct) {
        const fromBlockchain = openOceanTradeStruct.from.blockchain;
        const walletAddress = injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(fromBlockchain).address;
        if (!walletAddress) {
            return null;
        }
        const openOceanTrade = new OpenOceanTrade(openOceanTradeStruct, evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS);
        try {
            const transactionConfig = await openOceanTrade.encode({ fromAddress: walletAddress });
            const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
            const gasLimit = (await web3Public.batchEstimatedGas(walletAddress, [transactionConfig]))[0];
            if (gasLimit?.isFinite()) {
                return gasLimit;
            }
        }
        catch { }
        try {
            const transactionData = await openOceanTrade.getTxConfigAndCheckAmount();
            if (transactionData.gas) {
                return new bignumber_js_1.default(transactionData.gas);
            }
        }
        catch { }
        return null;
    }
    get spenderAddress() {
        const openOceanContractAddress = this.from.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.OKE_X_CHAIN
            ? '0xc0006Be82337585481044a7d11941c0828FFD2D4'
            : '0x6352a56caadC4F1E25CD6c75970Fa768A3304e64';
        return this.useProxy
            ? rubic_proxy_contract_address_1.rubicProxyContractAddress[this.from.blockchain].gateway
            : openOceanContractAddress;
    }
    get dexContractAddress() {
        throw new errors_1.RubicSdkError('Dex address is unknown before swap is started');
    }
    get toTokenAmountMin() {
        return this._toTokenAmountMin;
    }
    constructor(tradeStruct, providerAddress) {
        super(tradeStruct, providerAddress);
        this.type = on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.OPEN_OCEAN;
        this._toTokenAmountMin = new price_token_amount_1.PriceTokenAmount({
            ...this.to.asStruct,
            weiAmount: tradeStruct.toTokenWeiAmountMin
        });
    }
    async encodeDirect(options) {
        await this.checkFromAddress(options.fromAddress, true);
        (0, check_unsupported_receiver_address_1.checkUnsupportedReceiverAddress)(options?.receiverAddress, options?.fromAddress || this.walletAddress);
        try {
            const transactionData = await this.getTxConfigAndCheckAmount(options?.receiverAddress, options?.fromAddress, options?.directTransaction);
            const { gas, gasPrice } = this.getGasParams(options, {
                gasLimit: transactionData.gas,
                gasPrice: transactionData.gasPrice
            });
            return {
                to: transactionData.to,
                data: transactionData.data,
                value: this.fromWithoutFee.isNative ? this.fromWithoutFee.stringWeiAmount : '0',
                gas,
                gasPrice
            };
        }
        catch (err) {
            if ([400, 500, 503].includes(err.code)) {
                throw new errors_1.SwapRequestError();
            }
            if (this.isDeflationError()) {
                throw new errors_1.LowSlippageDeflationaryTokenError();
            }
            throw (0, errors_2.parseError)(err);
        }
    }
    async getToAmountAndTxData(receiverAddress) {
        const gasPrice = await injector_1.Injector.web3PublicService
            .getWeb3Public(this.from.blockchain)
            .getGasPrice();
        const walletAddress = injector_1.Injector.web3PrivateService.getWeb3Private(chain_type_1.CHAIN_TYPE.EVM).address;
        const apiUrl = get_open_ocean_api_url_1.openOceanApiUrl.swapQuote(open_ocean_blockchain_1.openOceanBlockchainName[this.from.blockchain]);
        const isArbitrum = this.from.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM;
        const swapQuoteResponse = await injector_1.Injector.httpClient.get(apiUrl, {
            headers: { apikey: 'sndfje3u4b3fnNSDNFUSDNVSunw345842hrnfd3b4nt4' },
            params: {
                chain: open_ocean_blockchain_1.openOceanBlockchainName[this.from.blockchain],
                inTokenAddress: this.getTokenAddress(this.from),
                outTokenAddress: this.getTokenAddress(this.to),
                amount: this.fromWithoutFee.tokenAmount.toString(),
                gasPrice: isArbitrum
                    ? arbitrum_gas_price_1.ARBITRUM_GAS_PRICE
                    : web3_pure_1.Web3Pure.fromWei(gasPrice, native_tokens_1.nativeTokensList[this.from.blockchain].decimals)
                        .multipliedBy(10 ** 9)
                        .toString(),
                slippage: this.slippageTolerance * 100,
                account: receiverAddress || walletAddress,
                referrer: '0x429A3A1a2623DFb520f1D93F64F38c0738418F1f'
            }
        });
        const { data, to, value, outAmount: toAmount } = swapQuoteResponse.data;
        return {
            tx: {
                data,
                to,
                value
            },
            toAmount
        };
    }
    getTokenAddress(token) {
        if (token.isNative) {
            if (token.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.METIS) {
                return '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000';
            }
            return OpenOceanTrade.nativeAddress;
        }
        return token.address;
    }
    async getSwapData(options) {
        const directTransactionConfig = await this.encodeDirect({
            ...options,
            fromAddress: rubic_proxy_contract_address_1.rubicProxyContractAddress[this.from.blockchain].router,
            supportFee: false,
            receiverAddress: rubic_proxy_contract_address_1.rubicProxyContractAddress[this.from.blockchain].router
        });
        const availableDexs = (await proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getWhitelistedDexes(this.from.blockchain)).map(address => address.toLowerCase());
        const routerAddress = directTransactionConfig.to;
        const method = directTransactionConfig.data.slice(0, 10);
        if (!availableDexs.includes(routerAddress.toLowerCase())) {
            throw new errors_1.NotWhitelistedProviderError(routerAddress, undefined, 'dex');
        }
        await proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.checkDexWhiteList(this.from.blockchain, routerAddress, method);
        return [
            [
                routerAddress,
                routerAddress,
                this.from.isNative && this.from.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.METIS
                    ? '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000'
                    : this.from.address,
                this.to.address,
                this.from.stringWeiAmount,
                directTransactionConfig.data,
                true
            ]
        ];
    }
}
exports.OpenOceanTrade = OpenOceanTrade;
OpenOceanTrade.nativeAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
//# sourceMappingURL=open-ocean-trade.js.map