"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typedTradeProviders = void 0;
const blockchain_name_1 = require("../../../../../core/blockchain/models/blockchain-name");
const algebra_trade_providers_1 = require("./algebra-trade-providers");
const bridgers_trade_providers_1 = require("./bridgers-trade-providers");
const izumi_trade_providers_1 = require("./izumi-trade-providers");
const oneinch_trade_providers_1 = require("./oneinch-trade-providers");
const pancake_router_providers_1 = require("./pancake-router-providers");
const sync_swap_trade_providers_1 = require("./sync-swap-trade-providers");
const uniswap_v2_trade_providers_1 = require("./uniswap-v2-trade-providers");
const uniswap_v3_trade_providers_1 = require("./uniswap-v3-trade-providers");
const xy_dex_trade_providers_1 = require("./xy-dex-trade-providers");
const vooi_trade_providers_1 = require("./vooi-trade-providers");
exports.typedTradeProviders = [
    ...uniswap_v2_trade_providers_1.UniswapV2TradeProviders,
    ...uniswap_v3_trade_providers_1.UniswapV3TradeProviders,
    ...oneinch_trade_providers_1.OneinchTradeProviders,
    ...algebra_trade_providers_1.AlgebraTradeProviders,
    ...bridgers_trade_providers_1.BridgersTradeProviders,
    // ...CurveTradeProviders, Removed because hack
    ...pancake_router_providers_1.pancakeRouterProviders,
    ...izumi_trade_providers_1.izumiTradeProviders,
    ...xy_dex_trade_providers_1.xyDexTradeProviders,
    ...vooi_trade_providers_1.vooiTradeProviders,
    ...sync_swap_trade_providers_1.syncSwapTradeProviders
].reduce((acc, ProviderClass) => {
    const provider = new ProviderClass();
    acc[provider.blockchain][provider.type] = provider;
    return acc;
}, Object.values(blockchain_name_1.BLOCKCHAIN_NAME).reduce((acc, blockchain) => ({
    ...acc,
    [blockchain]: {}
}), {}));
//# sourceMappingURL=typed-trade-providers.js.map