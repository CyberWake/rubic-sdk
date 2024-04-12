"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulatorContractAbi = void 0;
exports.simulatorContractAbi = [
    {
        inputs: [
            { internalType: 'address', name: '_dex', type: 'address' },
            { internalType: 'address', name: '_checkToken', type: 'address' },
            { internalType: 'bytes', name: '_data', type: 'bytes' }
        ],
        name: 'simulateTransferWithSwap',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
    }
];
//# sourceMappingURL=simulator-contract-abi.js.map