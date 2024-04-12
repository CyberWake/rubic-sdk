"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registryExchangeAbi = void 0;
exports.registryExchangeAbi = [
    {
        stateMutability: 'payable',
        type: 'function',
        name: 'exchange',
        inputs: [
            { name: '_pool', type: 'address' },
            { name: '_from', type: 'address' },
            { name: '_to', type: 'address' },
            { name: '_amount', type: 'uint256' },
            { name: '_expected', type: 'uint256' }
        ],
        outputs: [{ name: '', type: 'uint256' }]
    },
    {
        stateMutability: 'payable',
        type: 'function',
        name: 'exchange',
        inputs: [
            { name: '_pool', type: 'address' },
            { name: '_from', type: 'address' },
            { name: '_to', type: 'address' },
            { name: '_amount', type: 'uint256' },
            { name: '_expected', type: 'uint256' },
            { name: '_receiver', type: 'address' }
        ],
        outputs: [{ name: '', type: 'uint256' }]
    },
    {
        stateMutability: 'view',
        type: 'function',
        name: 'get_best_rate',
        inputs: [
            { name: '_from', type: 'address' },
            { name: '_to', type: 'address' },
            { name: '_amount', type: 'uint256' }
        ],
        outputs: [
            { name: '', type: 'address' },
            { name: '', type: 'uint256' }
        ]
    },
    {
        stateMutability: 'view',
        type: 'function',
        name: 'get_exchange_amount',
        inputs: [
            { name: '_pool', type: 'address' },
            { name: '_from', type: 'address' },
            { name: '_to', type: 'address' },
            { name: '_amount', type: 'uint256' }
        ],
        outputs: [{ name: '', type: 'uint256' }]
    }
];
//# sourceMappingURL=registry-exchange-abi.js.map