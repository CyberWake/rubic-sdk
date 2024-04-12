"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapAbi = void 0;
exports.wrapAbi = [
    {
        constant: false,
        inputs: [{ name: 'wad', type: 'uint256' }],
        name: 'withdraw',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        constant: false,
        inputs: [],
        name: 'deposit',
        outputs: [],
        payable: true,
        stateMutability: 'payable',
        type: 'function'
    }
];
//# sourceMappingURL=wrap-abi.js.map