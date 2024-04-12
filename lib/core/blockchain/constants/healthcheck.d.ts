import { BlockchainName } from "../models/blockchain-name";
export declare const HEALTHCHECK: {
    ETH: {
        contractAddress: string;
        contractAbi: import("web3-utils").AbiItem[];
        method: string;
        expected: string;
    };
    BSC: {
        contractAddress: string;
        contractAbi: import("web3-utils").AbiItem[];
        method: string;
        expected: string;
    };
    POLYGON: {
        contractAddress: string;
        contractAbi: import("web3-utils").AbiItem[];
        method: string;
        expected: string;
    };
    AVALANCHE: {
        contractAddress: string;
        contractAbi: import("web3-utils").AbiItem[];
        method: string;
        expected: string;
    };
    MOONRIVER: {
        contractAddress: string;
        contractAbi: import("web3-utils").AbiItem[];
        method: string;
        expected: string;
    };
    FANTOM: {
        contractAddress: string;
        contractAbi: import("web3-utils").AbiItem[];
        method: string;
        expected: string;
    };
    HARMONY: {
        contractAddress: string;
        contractAbi: import("web3-utils").AbiItem[];
        method: string;
        expected: string;
    };
    ARBITRUM: {
        contractAddress: string;
        contractAbi: import("web3-utils").AbiItem[];
        method: string;
        expected: string;
    };
    AURORA: {
        contractAddress: string;
        contractAbi: import("web3-utils").AbiItem[];
        method: string;
        expected: string;
    };
    TELOS: {
        contractAddress: string;
        contractAbi: import("web3-utils").AbiItem[];
        method: string;
        expected: string;
    };
    TRON: {
        contractAddress: string;
        contractAbi: import("web3-utils").AbiItem[];
        method: string;
        expected: string;
    };
};
export type HealthcheckAvailableBlockchain = keyof typeof HEALTHCHECK;
export declare const healthcheckAvailableBlockchains: string[];
export declare function isBlockchainHealthcheckAvailable(blockchainName: BlockchainName): blockchainName is HealthcheckAvailableBlockchain;
