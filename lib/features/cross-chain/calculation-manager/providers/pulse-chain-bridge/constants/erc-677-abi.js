"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.erc677Abi = void 0;
exports.erc677Abi = [
    {
        inputs: [
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
            { internalType: 'bytes', name: '', type: 'bytes' }
        ],
        name: 'transferAndCall',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function'
    }
];
//# sourceMappingURL=erc-677-abi.js.map