"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.l2Erc20ScrollGatewayAbi = void 0;
exports.l2Erc20ScrollGatewayAbi = [
    {
        type: 'function',
        stateMutability: 'view',
        outputs: [{ type: 'address', name: '', internalType: 'address' }],
        name: 'getL1ERC20Address',
        inputs: [{ type: 'address', name: '_l2Address', internalType: 'address' }]
    },
    {
        type: 'function',
        stateMutability: 'payable',
        outputs: [],
        name: 'withdrawERC20',
        inputs: [
            { type: 'address', name: '_token', internalType: 'address' },
            { type: 'uint256', name: '_amount', internalType: 'uint256' },
            { type: 'uint256', name: '_gasLimit', internalType: 'uint256' }
        ]
    },
    {
        type: 'function',
        stateMutability: 'payable',
        outputs: [],
        name: 'withdrawERC20',
        inputs: [
            { type: 'address', name: '_token', internalType: 'address' },
            { type: 'address', name: '_to', internalType: 'address' },
            { type: 'uint256', name: '_amount', internalType: 'uint256' },
            { type: 'uint256', name: '_gasLimit', internalType: 'uint256' }
        ]
    },
    {
        type: 'function',
        stateMutability: 'payable',
        outputs: [],
        name: 'withdrawETH',
        inputs: [
            { type: 'address', name: '_to', internalType: 'address' },
            { type: 'uint256', name: '_amount', internalType: 'uint256' },
            { type: 'uint256', name: '_gasLimit', internalType: 'uint256' }
        ]
    },
    {
        type: 'function',
        stateMutability: 'payable',
        outputs: [],
        name: 'withdrawETH',
        inputs: [
            { type: 'uint256', name: '_amount', internalType: 'uint256' },
            { type: 'uint256', name: '_gasLimit', internalType: 'uint256' }
        ]
    }
];
//# sourceMappingURL=l2-erc20-scroll-gateway-abi.js.map