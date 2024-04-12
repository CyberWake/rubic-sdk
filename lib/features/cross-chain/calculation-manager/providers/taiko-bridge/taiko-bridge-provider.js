"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaikoBridgeProvider = void 0;
const errors_1 = require("../../../../../common/errors");
const tokens_1 = require("../../../../../common/tokens");
const cross_chain_trade_type_1 = require("../../models/cross-chain-trade-type");
const cross_chain_provider_1 = require("../common/cross-chain-provider");
const taiko_bridge_supported_blockchains_1 = require("./models/taiko-bridge-supported-blockchains");
const taiko_bridge_trade_1 = require("./taiko-bridge-trade");
class TaikoBridgeProvider extends cross_chain_provider_1.CrossChainProvider {
    constructor() {
        super(...arguments);
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.TAIKO_BRIDGE;
    }
    isSupportedBlockchain(blockchain) {
        return taiko_bridge_supported_blockchains_1.taikoBridgeSupportedBlockchains.some(supportedBlockchain => supportedBlockchain === blockchain);
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
            const to = new tokens_1.PriceTokenAmount({
                ...toToken.asStruct,
                tokenAmount: fromToken.tokenAmount
            });
            const gasData = options.gasCalculation === 'enabled'
                ? await taiko_bridge_trade_1.TaikoBridgeTrade.getGasData(fromToken, to)
                : null;
            return {
                trade: new taiko_bridge_trade_1.TaikoBridgeTrade({
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
exports.TaikoBridgeProvider = TaikoBridgeProvider;
//# sourceMappingURL=taiko-bridge-provider.js.map