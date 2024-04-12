import { PancakeRouterProvider } from "../../common/pancake-router/pancake-router-provider";
export declare class PancakeRouterBscProvider extends PancakeRouterProvider {
    readonly blockchain: "BSC";
    protected readonly chain: {
        readonly id: 56;
        readonly name: "BNB Smart Chain";
        readonly network: "bsc";
        readonly nativeCurrency: {
            readonly decimals: 18;
            readonly name: "BNB";
            readonly symbol: "BNB";
        };
        readonly rpcUrls: {
            readonly default: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
            readonly public: {
                readonly http: readonly ["https://rpc.ankr.com/bsc"];
            };
        };
        readonly blockExplorers: {
            readonly etherscan: {
                readonly name: "BscScan";
                readonly url: "https://bscscan.com";
            };
            readonly default: {
                readonly name: "BscScan";
                readonly url: "https://bscscan.com";
            };
        };
        readonly contracts: {
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 15921452;
            };
        };
    } & {
        formatters: import("viem").Formatters | undefined;
        serializers: import("viem").Serializers<import("viem").Formatters> | undefined;
    };
    protected readonly dexAddress = "0x13f4EA83D0bd40E75C8222255bc855a974568Dd4";
    protected readonly v3subgraphAddress = "https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-bsc";
    protected readonly v2subgraphAddress = "https://proxy-worker-api.pancakeswap.com/bsc-exchange";
    protected readonly maxHops = 2;
    protected readonly maxSplits = 4;
}
