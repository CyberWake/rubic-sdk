"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlgebraTradeProviders = void 0;
const algebra_provider_1 = require("../../providers/dexes/polygon/algebra/algebra-provider");
const quick_swap_v3_provider_1 = require("../../providers/dexes/polygon/quick-swap-v3/quick-swap-v3-provider");
const quick_swap_v3_provider_2 = require("../../providers/dexes/polygon-zkevm/quick-swap-v3/quick-swap-v3-provider");
const algebra_integral_provider_1 = require("../../providers/dexes/arthera-testnet/algebra-integral/algebra-integral-provider");
exports.AlgebraTradeProviders = [
    algebra_provider_1.AlgebraProvider,
    algebra_integral_provider_1.AlgebraIntegralProvider,
    quick_swap_v3_provider_1.QuickSwapV3Provider,
    quick_swap_v3_provider_2.QuickSwapV3PolygonZKEVMProvider
];
//# sourceMappingURL=algebra-trade-providers.js.map