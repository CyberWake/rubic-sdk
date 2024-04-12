import { UniswapV3RouterConfiguration } from "../../../common/uniswap-v3-abstract/models/uniswap-v3-router-configuration";
/**
 * Most popular tokens in uni v3 to use in a route.
 */
declare const tokensSymbols: readonly ["WETH", "GMX", "USDC", "WBTC", "DAI"];
type TokenSymbol = (typeof tokensSymbols)[number];
export declare const UNI_SWAP_V3_ARBITRUM_ROUTER_CONFIGURATION: UniswapV3RouterConfiguration<TokenSymbol>;
export {};
