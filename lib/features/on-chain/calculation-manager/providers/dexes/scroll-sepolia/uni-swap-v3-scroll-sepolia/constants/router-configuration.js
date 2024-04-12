"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNI_SWAP_V3_SCROLL_SEPOLIA_ROUTER_CONFIGURATION = void 0;
const wrapped_native_tokens_1 = require("../../../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../../../core/blockchain/models/blockchain-name");
/**
 * Most popular tokens in uni v3 to use in a route.
 */
const tokensSymbols = ['WETH', 'USDC', 'GHO'];
const routerTokens = {
    WETH: wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.SCROLL_SEPOLIA].address,
    USDC: '0x15Fe86961428E095B064bb52FcF5964bAb834E34',
    GHO: '0xD9692f1748aFEe00FACE2da35242417dd05a8615'
};
const routerLiquidityPools = [
    {
        poolAddress: '0x60ba72f15c2b133e8ef826602bab511f4c7bca78',
        tokenSymbolA: 'USDC',
        tokenSymbolB: 'WETH',
        fee: 3000
    },
    {
        poolAddress: '0xd8ac608580a56fdea4f1d9ef2ce5e4fa09591325',
        tokenSymbolA: 'WETH',
        tokenSymbolB: 'GHO',
        fee: 3000
    }
];
exports.UNI_SWAP_V3_SCROLL_SEPOLIA_ROUTER_CONFIGURATION = {
    tokens: routerTokens,
    liquidityPools: routerLiquidityPools
};
//# sourceMappingURL=router-configuration.js.map