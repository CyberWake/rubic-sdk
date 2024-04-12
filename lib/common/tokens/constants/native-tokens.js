"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nativeTokensList = void 0;
const token_1 = require("../token");
const blockchain_name_1 = require("../../../core/blockchain/models/blockchain-name");
const bitcoin_web3_pure_1 = require("../../../core/blockchain/web3-pure/typed-web3-pure/bitcoin-web3-pure");
const evm_web3_pure_1 = require("../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const icp_web3_pure_1 = require("../../../core/blockchain/web3-pure/typed-web3-pure/icp-web3-pure");
const kava_cosmos_web3_pure_1 = require("../../../core/blockchain/web3-pure/typed-web3-pure/non-evm-web3-pure/kava-cosmos-web3-pure");
const solana_web3_pure_1 = require("../../../core/blockchain/web3-pure/typed-web3-pure/non-evm-web3-pure/solana-web3-pure");
const tron_web3_pure_1 = require("../../../core/blockchain/web3-pure/typed-web3-pure/tron-web3-pure/tron-web3-pure");
const testnetNativeTokens = {
    [blockchain_name_1.BLOCKCHAIN_NAME.FUJI]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.FUJI,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'AVAX',
        symbol: 'AVAX',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.MUMBAI]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.MUMBAI,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'Matic Network',
        symbol: 'MATIC',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.GOERLI]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.GOERLI,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN_TESTNET]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN_TESTNET,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'Test Binance Coin',
        symbol: 'tBNB',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.SCROLL_SEPOLIA]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.SCROLL_SEPOLIA,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.ARTHERA]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.ARTHERA,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'Arthera',
        symbol: 'AA',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.TAIKO]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.TAIKO,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.SEPOLIA]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.SEPOLIA,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.BERACHAIN]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.BERACHAIN,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'BERA',
        symbol: 'BERA',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.BLAST_TESTNET]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.BLAST_TESTNET,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.HOLESKY]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.HOLESKY,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18
    })
};
exports.nativeTokensList = {
    ...Object.values(blockchain_name_1.BLOCKCHAIN_NAME).reduce((acc, blockchain) => ({ ...acc, [blockchain]: blockchain }), {}),
    ...testnetNativeTokens,
    [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'Binance Coin',
        symbol: 'BNB',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.POLYGON]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.POLYGON,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'Matic Network',
        symbol: 'MATIC',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.POLYGON_ZKEVM]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.POLYGON_ZKEVM,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'AVAX',
        symbol: 'AVAX',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.MOONRIVER]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.MOONRIVER,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'MOVR',
        symbol: 'MOVR',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.FANTOM]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.FANTOM,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'FTM',
        symbol: 'FTM',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.HARMONY]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.HARMONY,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'ONE',
        symbol: 'ONE',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'AETH',
        symbol: 'AETH',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.AURORA]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.AURORA,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'aETH',
        symbol: 'aETH',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.TELOS]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.TELOS,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'TLOS',
        symbol: 'TLOS',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.CRONOS]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.CRONOS,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'CRO',
        symbol: 'CRO',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.OKE_X_CHAIN]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.OKE_X_CHAIN,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'OKT',
        symbol: 'OKT',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.GNOSIS]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.GNOSIS,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'xDAI',
        symbol: 'xDAI',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.FUSE]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.FUSE,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'FUSE',
        symbol: 'FUSE',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.MOONBEAM]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.MOONBEAM,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'GLMR',
        symbol: 'GLMR',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.CELO]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.CELO,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'CELO',
        symbol: 'CELO',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.BOBA]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.BOBA,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'BOBA',
        symbol: 'BOBA',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.BOBA_BSC]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.BOBA_BSC,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'BOBA',
        symbol: 'BOBA',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.ASTAR_EVM]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.ASTAR_EVM,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'ASTR',
        symbol: 'ASTR',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM_POW]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM_POW,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'Ethereum PoW',
        symbol: 'ETHW',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.KAVA]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.KAVA,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'KAVA',
        symbol: 'KAVA',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.BITCOIN]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.BITCOIN,
        address: bitcoin_web3_pure_1.BitcoinWeb3Pure.nativeTokenAddress,
        name: 'Bitcoin',
        symbol: 'BTC',
        decimals: 8
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.TRON]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.TRON,
        address: tron_web3_pure_1.TronWeb3Pure.nativeTokenAddress,
        name: 'TRX',
        symbol: 'TRX',
        decimals: 6
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.BITGERT]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.BITGERT,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'Brise',
        symbol: 'BRISE',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.OASIS]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.OASIS,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'ROSE',
        symbol: 'ROSE',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.METIS]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.METIS,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'Metis token',
        symbol: 'METIS',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.DFK]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.DFK,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'JEWEL',
        symbol: 'JEWEL',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.KLAYTN]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.KLAYTN,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'Klaytn',
        symbol: 'KLAY',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.VELAS]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.VELAS,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'Velas',
        symbol: 'VLX',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.SYSCOIN]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.SYSCOIN,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'Syscoin',
        symbol: 'SYS',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.ICP]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.ICP,
        address: icp_web3_pure_1.IcpWeb3Pure.nativeTokenAddress,
        name: 'Internet Computer',
        symbol: 'ICP',
        decimals: 8
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.KAVA_COSMOS]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.KAVA_COSMOS,
        address: kava_cosmos_web3_pure_1.KavaCosmosWeb3Pure.nativeTokenAddress,
        name: 'Kava',
        symbol: 'KAVA',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.ZK_SYNC]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.ZK_SYNC,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.PULSECHAIN]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.PULSECHAIN,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'PLS',
        symbol: 'PLS',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.LINEA]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.LINEA,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.BASE]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.BASE,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.MANTLE]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.MANTLE,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'Mantle',
        symbol: 'MNT',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.MANTA_PACIFIC]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.MANTA_PACIFIC,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.SCROLL]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.SCROLL,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.ZETACHAIN]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.ZETACHAIN,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'Zeta',
        symbol: 'ZETA',
        decimals: 18
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.SOLANA]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.SOLANA,
        address: solana_web3_pure_1.SolanaWeb3Pure.nativeTokenAddress,
        name: 'Solana',
        symbol: 'SOL',
        decimals: 9
    }),
    [blockchain_name_1.BLOCKCHAIN_NAME.BLAST]: new token_1.Token({
        blockchain: blockchain_name_1.BLOCKCHAIN_NAME.BLAST,
        address: evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress,
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18
    })
};
//# sourceMappingURL=native-tokens.js.map