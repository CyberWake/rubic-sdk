import { UniswapV3RouterConfiguration } from "../../../common/uniswap-v3-abstract/models/uniswap-v3-router-configuration";
import { AbiItem } from 'web3-utils';
/**
 * Most popular tokens in uni v3 to use in a route.
 */
declare const tokensSymbols: readonly ["WETH", "BNB", "BUSD", "MATIC", "HZN", "NFTE"];
type TokenSymbol = (typeof tokensSymbols)[number];
export declare const HORIZONDEX_ROUTER_CONFIGURATION: UniswapV3RouterConfiguration<TokenSymbol>;
export declare const HORIZONDEX_UNISWAP_V3_SWAP_ROUTER_CONTRACT_ADDRESS = "0x272e156df8da513c69cb41cc7a99185d53f926bb";
export declare const HORIZONDEX_UNISWAP_V3_SWAP_ROUTER_CONTRACT_ABI: AbiItem[];
export {};
