"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollBridgeProvider = void 0;
const errors_1 = require("../../../../../common/errors");
const tokens_1 = require("../../../../../common/tokens");
const blockchain_1 = require("../../../../../common/utils/blockchain");
const blockchain_name_1 = require("../../../../../core/blockchain/models/blockchain-name");
const injector_1 = require("../../../../../core/injector/injector");
const cross_chain_trade_type_1 = require("../../models/cross-chain-trade-type");
const cross_chain_provider_1 = require("../common/cross-chain-provider");
const l1_erc20_scroll_gateway_abi_1 = require("./constants/l1-erc20-scroll-gateway-abi");
const l2_erc20_scroll_gateway_abi_1 = require("./constants/l2-erc20-scroll-gateway-abi");
const scroll_bridge_supported_blockchain_1 = require("./models/scroll-bridge-supported-blockchain");
const scroll_bridge_trade_1 = require("./scroll-bridge-trade");
const scroll_bridge_contract_address_1 = require("./constants/scroll-bridge-contract-address");
class ScrollBridgeProvider extends cross_chain_provider_1.CrossChainProvider {
    constructor() {
        super(...arguments);
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.SCROLL_BRIDGE;
    }
    isSupportedBlockchain(blockchain) {
        return scroll_bridge_supported_blockchain_1.scrollBridgeSupportedBlockchains.some(supportedBlockchain => supportedBlockchain === blockchain);
    }
    async calculate(fromToken, toToken, options) {
        const fromBlockchain = fromToken.blockchain;
        const toBlockchain = toToken.blockchain;
        if (!this.areSupportedBlockchains(fromBlockchain, toBlockchain)) {
            return {
                trade: null,
                error: new errors_1.NotSupportedTokensError(),
                tradeType: this.type
            };
        }
        try {
            const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
            if (!fromToken.isNative) {
                if (fromBlockchain === blockchain_name_1.BLOCKCHAIN_NAME.GOERLI) {
                    const l2Address = await web3Public.callContractMethod(scroll_bridge_contract_address_1.scrollBridgeContractAddress[fromBlockchain].providerGateway, l1_erc20_scroll_gateway_abi_1.l1Erc20ScrollGatewayAbi, 'getL2ERC20Address', [fromToken.address]);
                    if (!(0, blockchain_1.compareAddresses)(toToken.address, l2Address)) {
                        throw new errors_1.RubicSdkError('Swap is not allowed.');
                    }
                }
                else {
                    const l1Address = await web3Public.callContractMethod(scroll_bridge_contract_address_1.scrollBridgeContractAddress[fromBlockchain].providerGateway, l2_erc20_scroll_gateway_abi_1.l2Erc20ScrollGatewayAbi, 'getL1ERC20Address', [fromToken.address]);
                    if (!(0, blockchain_1.compareAddresses)(toToken.address, l1Address)) {
                        throw new errors_1.RubicSdkError('Swap is not allowed.');
                    }
                }
            }
            else {
                if (!toToken.isNative) {
                    throw new errors_1.RubicSdkError('Swap is not allowed.');
                }
            }
            const to = new tokens_1.PriceTokenAmount({
                ...toToken.asStruct,
                tokenAmount: fromToken.tokenAmount
            });
            const gasData = options.gasCalculation === 'enabled'
                ? await scroll_bridge_trade_1.ScrollBridgeTrade.getGasData(fromToken, to)
                : null;
            return {
                trade: new scroll_bridge_trade_1.ScrollBridgeTrade({
                    from: fromToken,
                    to,
                    gasData
                }, options.providerAddress, await this.getRoutePath(fromToken, to)),
                tradeType: this.type
            };
        }
        catch (err) {
            const rubicSdkError = cross_chain_provider_1.CrossChainProvider.parseError(err);
            return {
                trade: null,
                error: rubicSdkError,
                tradeType: this.type
            };
        }
    }
    async getFeeInfo(_fromBlockchain, _providerAddress, _percentFeeToken, _useProxy) {
        return {};
    }
    async getRoutePath(fromToken, toToken) {
        return [{ type: 'cross-chain', provider: this.type, path: [fromToken, toToken] }];
    }
}
exports.ScrollBridgeProvider = ScrollBridgeProvider;
//# sourceMappingURL=scroll-bridge-provider.js.map