import { UniswapV3RouterConfiguration } from "../../../common/uniswap-v3-abstract/models/uniswap-v3-router-configuration";
/**
 * Most popular tokens in uni v3 to use in a route.
 */
declare const tokensSymbols: readonly ["WMATIC", "WETH", "DAI", "USDT", "USDC"];
type TokenSymbol = (typeof tokensSymbols)[number];
export declare const UNI_SWAP_V3_POLYGON_ROUTER_CONFIGURATION: UniswapV3RouterConfiguration<TokenSymbol>;
export {};
