"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBlockchainHealthcheckAvailable = exports.healthcheckAvailableBlockchains = exports.HEALTHCHECK = void 0;
const blockchain_name_1 = require("../models/blockchain-name");
const erc_20_token_abi_1 = require("../web3-public-service/web3-public/evm-web3-public/constants/erc-20-token-abi");
const trc_20_contract_abi_1 = require("../web3-public-service/web3-public/tron-web3-public/constants/trc-20-contract-abi");
exports.HEALTHCHECK = {
    [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: {
        contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        contractAbi: erc_20_token_abi_1.ERC20_TOKEN_ABI,
        method: 'symbol',
        expected: 'USDT'
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: {
        contractAddress: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        contractAbi: erc_20_token_abi_1.ERC20_TOKEN_ABI,
        method: 'symbol',
        expected: 'BUSD'
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.POLYGON]: {
        contractAddress: '0x7FFB3d637014488b63fb9858E279385685AFc1e2',
        contractAbi: erc_20_token_abi_1.ERC20_TOKEN_ABI,
        method: 'symbol',
        expected: 'USDT'
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE]: {
        contractAddress: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
        contractAbi: erc_20_token_abi_1.ERC20_TOKEN_ABI,
        method: 'symbol',
        expected: 'USDT.e'
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.MOONRIVER]: {
        contractAddress: '0xB44a9B6905aF7c801311e8F4E76932ee959c663C',
        contractAbi: erc_20_token_abi_1.ERC20_TOKEN_ABI,
        method: 'symbol',
        expected: 'USDT'
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.FANTOM]: {
        contractAddress: '0x049d68029688eabf473097a2fc38ef61633a3c7a',
        contractAbi: erc_20_token_abi_1.ERC20_TOKEN_ABI,
        method: 'symbol',
        expected: 'fUSDT'
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.HARMONY]: {
        contractAddress: '0x3c2b8be99c50593081eaa2a724f0b8285f5aba8f',
        contractAbi: erc_20_token_abi_1.ERC20_TOKEN_ABI,
        method: 'symbol',
        expected: '1USDT'
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]: {
        contractAddress: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
        contractAbi: erc_20_token_abi_1.ERC20_TOKEN_ABI,
        method: 'symbol',
        expected: 'USDT'
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.AURORA]: {
        contractAddress: '0x4988a896b1227218e4A686fdE5EabdcAbd91571f',
        contractAbi: erc_20_token_abi_1.ERC20_TOKEN_ABI,
        method: 'symbol',
        expected: 'USDT'
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.TELOS]: {
        contractAddress: '0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73',
        contractAbi: erc_20_token_abi_1.ERC20_TOKEN_ABI,
        method: 'symbol',
        expected: 'USDT'
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.TRON]: {
        contractAddress: 'TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8',
        contractAbi: trc_20_contract_abi_1.TRC20_CONTRACT_ABI,
        method: 'symbol',
        expected: 'USDC'
    }
};
exports.healthcheckAvailableBlockchains = Object.keys(exports.HEALTHCHECK);
function isBlockchainHealthcheckAvailable(blockchainName) {
    return exports.healthcheckAvailableBlockchains.includes(blockchainName);
}
exports.isBlockchainHealthcheckAvailable = isBlockchainHealthcheckAvailable;
//# sourceMappingURL=healthcheck.js.map