"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.izumiQuoterContractAbi = void 0;
exports.izumiQuoterContractAbi = [
    {
        inputs: [
            { internalType: 'uint128', name: 'amount', type: 'uint128' },
            { internalType: 'bytes', name: 'path', type: 'bytes' }
        ],
        name: 'swapAmount',
        outputs: [
            { internalType: 'uint256', name: 'acquire', type: 'uint256' },
            { internalType: 'int24[]', name: 'pointAfterList', type: 'int24[]' }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
    }
];
//# sourceMappingURL=izumi-quoter-contract-abi.js.map