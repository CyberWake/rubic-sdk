import { AlgebraProvider } from "../../providers/dexes/polygon/algebra/algebra-provider";
import { QuickSwapV3Provider } from "../../providers/dexes/polygon/quick-swap-v3/quick-swap-v3-provider";
import { QuickSwapV3PolygonZKEVMProvider } from "../../providers/dexes/polygon-zkevm/quick-swap-v3/quick-swap-v3-provider";
import { AlgebraIntegralProvider } from '../../providers/dexes/arthera-testnet/algebra-integral/algebra-integral-provider';
export declare const AlgebraTradeProviders: readonly [typeof AlgebraProvider, typeof AlgebraIntegralProvider, typeof QuickSwapV3Provider, typeof QuickSwapV3PolygonZKEVMProvider];
