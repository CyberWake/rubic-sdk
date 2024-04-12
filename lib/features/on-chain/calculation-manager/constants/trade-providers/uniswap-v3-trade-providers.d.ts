import { UniSwapV3ArbitrumProvider } from "../../providers/dexes/arbitrum/uni-swap-v3-arbitrum/uni-swap-v3-arbitrum-provider";
import { UniSwapV3EthereumProvider } from "../../providers/dexes/ethereum/uni-swap-v3-ethereum/uni-swap-v3-ethereum-provider";
import { UniSwapV3EthereumPowProvider } from "../../providers/dexes/ethereum-pow/uni-swap-v3-ethereum-pow/uni-swap-v3-ethereum-pow-provider";
import { FusionXProvider } from "../../providers/dexes/mantle/fusionx/fusionx-provider";
import { UniSwapV3PolygonProvider } from "../../providers/dexes/polygon/uni-swap-v3-polygon/uni-swap-v3-polygon-provider";
import { UniSwapV3ScrollSepoliaProvider } from "../../providers/dexes/scroll-sepolia/uni-swap-v3-scroll-sepolia/uni-swap-v3-scroll-sepolia-provider";
export declare const UniswapV3TradeProviders: readonly [typeof UniSwapV3EthereumProvider, typeof UniSwapV3PolygonProvider, typeof UniSwapV3ArbitrumProvider, typeof UniSwapV3EthereumPowProvider, typeof FusionXProvider, typeof UniSwapV3ScrollSepoliaProvider];
