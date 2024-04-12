"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stargateRouterEthAbi = void 0;
exports.stargateRouterEthAbi = [
    {
        inputs: [
            { internalType: 'uint16', name: '_dstChainId', type: 'uint16' },
            { internalType: 'address payable', name: '_refundAddress', type: 'address' },
            { internalType: 'bytes', name: '_toAddress', type: 'bytes' },
            { internalType: 'uint256', name: '_amountLD', type: 'uint256' },
            { internalType: 'uint256', name: '_minAmountLD', type: 'uint256' }
        ],
        name: 'swapETH',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
    }
];
//# sourceMappingURL=stargate-router-eth-abi.js.map