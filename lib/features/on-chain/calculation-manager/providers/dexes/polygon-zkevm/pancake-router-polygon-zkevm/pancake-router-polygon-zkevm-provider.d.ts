import { PancakeRouterProvider } from "../../common/pancake-router/pancake-router-provider";
export declare class PancakeRouterPolygonZkEvmProvider extends PancakeRouterProvider {
    readonly blockchain: "POLYGON_ZKEVM";
    protected readonly chain: {
        readonly id: 1101;
        readonly name: "Polygon zkEVM";
        readonly network: "polygon-zkevm";
        readonly nativeCurrency: {
            readonly name: "Ether";
            readonly symbol: "ETH";
            readonly decimals: 18;
        };
        readonly rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://zkevm-rpc.com"];
            };
            readonly public: {
                readonly http: readonly ["https://zkevm-rpc.com"];
            };
        };
        readonly blockExplorers: {
            readonly default: {
                readonly name: "PolygonScan";
                readonly url: "https://zkevm.polygonscan.com";
            };
        };
        readonly contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 57746;
            };
        };
    } & {
        formatters: import("viem").Formatters | undefined;
        serializers: import("viem").Serializers<import("viem").Formatters> | undefined;
    };
    protected readonly dexAddress = "0x678Aa4bF4E210cf2166753e054d5b7c31cc7fa86";
    protected readonly v3subgraphAddress = "https://api.studio.thegraph.com/query/45376/exchange-v3-polygon-zkevm/v0.0.0";
    protected readonly v2subgraphAddress = "https://api.studio.thegraph.com/query/45376/exchange-v2-polygon-zkevm/version/latest";
    protected readonly maxHops = 2;
    protected readonly maxSplits = 2;
}
