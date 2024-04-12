"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArbitrumRbcBridgeProvider = void 0;
const sdk_1 = require("@arbitrum/sdk");
const errors_1 = require("../../../../../common/errors");
const tokens_1 = require("../../../../../common/tokens");
const blockchain_1 = require("../../../../../common/utils/blockchain");
const cross_chain_trade_type_1 = require("../../models/cross-chain-trade-type");
const arbitrum_rbc_bridge_trade_1 = require("./arbitrum-rbc-bridge-trade");
const arbitrum_rbc_bridge_supported_blockchain_1 = require("./models/arbitrum-rbc-bridge-supported-blockchain");
const cross_chain_provider_1 = require("../common/cross-chain-provider");
class ArbitrumRbcBridgeProvider extends cross_chain_provider_1.CrossChainProvider {
    constructor() {
        super(...arguments);
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.ARBITRUM;
        this.l1TokenAddress = '0x3330BFb7332cA23cd071631837dC289B09C33333';
        this.l2TokenAddress = '0x10aaed289a7b1b0155bf4b86c862f297e84465e0';
    }
    isSupportedBlockchain(blockchain) {
        return arbitrum_rbc_bridge_supported_blockchain_1.arbitrumRbcBridgeSupportedBlockchains.some(supportedBlockchain => supportedBlockchain === blockchain);
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
        if (!(((0, blockchain_1.compareAddresses)(fromToken.address, this.l1TokenAddress) &&
            (0, blockchain_1.compareAddresses)(toToken.address, this.l2TokenAddress)) ||
            ((0, blockchain_1.compareAddresses)(fromToken.address, this.l2TokenAddress) &&
                (0, blockchain_1.compareAddresses)(toToken.address, this.l1TokenAddress)))) {
            return {
                trade: null,
                error: new errors_1.NotSupportedTokensError(),
                tradeType: this.type
            };
        }
        try {
            const to = new tokens_1.PriceTokenAmount({
                ...toToken.asStruct,
                tokenAmount: fromToken.tokenAmount
            });
            const l2network = await (0, sdk_1.getL2Network)(42161);
            const gasData = options.gasCalculation === 'enabled'
                ? await arbitrum_rbc_bridge_trade_1.ArbitrumRbcBridgeTrade.getGasData(fromToken, to, l2network)
                : null;
            return {
                trade: new arbitrum_rbc_bridge_trade_1.ArbitrumRbcBridgeTrade({
                    from: fromToken,
                    to,
                    gasData,
                    l2network
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
exports.ArbitrumRbcBridgeProvider = ArbitrumRbcBridgeProvider;
//# sourceMappingURL=arbitrum-rbc-bridge-provider.js.map