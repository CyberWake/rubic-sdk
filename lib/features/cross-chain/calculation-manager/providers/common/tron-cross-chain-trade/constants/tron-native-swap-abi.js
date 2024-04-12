"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tronNativeSwapAbi = void 0;
exports.tronNativeSwapAbi = [
    {
        inputs: [
            { internalType: 'address', name: 'fromToken', type: 'address' },
            { internalType: 'string', name: 'toToken', type: 'string' },
            { internalType: 'string', name: 'destination', type: 'string' },
            { internalType: 'uint256', name: 'fromAmount', type: 'uint256' },
            { internalType: 'uint256', name: 'minReturnAmount', type: 'uint256' }
        ],
        name: 'swap',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'string', name: 'toToken', type: 'string' },
            { internalType: 'string', name: 'destination', type: 'string' },
            { internalType: 'uint256', name: 'minReturnAmount', type: 'uint256' }
        ],
        name: 'swapEth',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
    }
];
//# sourceMappingURL=tron-native-swap-abi.js.map