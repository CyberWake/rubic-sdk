import { UniswapV3RouterConfiguration } from "../../../common/uniswap-v3-abstract/models/uniswap-v3-router-configuration";
import { AbiItem } from 'web3-utils';
/**
 * Most popular tokens in uni v3 to use in a route.
 */
declare const tokensSymbols: readonly ["WETH", "WMNT", "USDT", "USDC", "WBTC", "MINU"];
type TokenSymbol = (typeof tokensSymbols)[number];
export declare const FUSIONX_ROUTER_CONFIGURATION: UniswapV3RouterConfiguration<TokenSymbol>;
export declare const FUSIONX_UNISWAP_V3_SWAP_ROUTER_CONTRACT_ADDRESS = "0x5989FB161568b9F133eDf5Cf6787f5597762797F";
export declare const FUSIONX_UNISWAP_V3_FACTORY_CONTRACT_ADDRESS = "0x530d2766D1988CC1c000C8b7d00334c14B69AD71";
export declare const FUSIONX_UNISWAP_V3_SWAP_ROUTER_CONTRACT_ABI: AbiItem[];
export {};
