import { PancakeRouterProvider } from "../../common/pancake-router/pancake-router-provider";
export declare class PancakeRouterEthereumProvider extends PancakeRouterProvider {
    readonly blockchain: "ETH";
    protected readonly chain: {
        readonly id: 1;
        readonly network: "homestead";
        readonly name: "Ethereum";
        readonly nativeCurrency: {
            readonly name: "Ether";
            readonly symbol: "ETH";
            readonly decimals: 18;
        };
        readonly rpcUrls: {
            readonly alchemy: {
                readonly http: readonly ["https://eth-mainnet.g.alchemy.com/v2"];
                readonly webSocket: readonly ["wss://eth-mainnet.g.alchemy.com/v2"];
            };
            readonly infura: {
                readonly http: readonly ["https://mainnet.infura.io/v3"];
                readonly webSocket: readonly ["wss://mainnet.infura.io/ws/v3"];
            };
            readonly default: {
                readonly http: readonly ["https://cloudflare-eth.com"];
            };
            readonly public: {
                readonly http: readonly ["https://cloudflare-eth.com"];
            };
        };
        readonly blockExplorers: {
            readonly etherscan: {
                readonly name: "Etherscan";
                readonly url: "https://etherscan.io";
            };
            readonly default: {
                readonly name: "Etherscan";
                readonly url: "https://etherscan.io";
            };
        };
        readonly contracts: {
            readonly ensRegistry: {
                readonly address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
            };
            readonly ensUniversalResolver: {
                readonly address: "0xc0497E381f536Be9ce14B0dD3817cBcAe57d2F62";
                readonly blockCreated: 16966585;
            };
            readonly multicall3: {
                readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                readonly blockCreated: 14353601;
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
    protected readonly maxSplits = 3;
}
