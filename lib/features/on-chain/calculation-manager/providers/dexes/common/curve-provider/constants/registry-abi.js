"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registryAbi = void 0;
exports.registryAbi = [
    {
        stateMutability: 'view',
        type: 'function',
        name: 'find_pool_for_coins',
        inputs: [
            { name: '_from', type: 'address' },
            { name: '_to', type: 'address' }
        ],
        outputs: [{ name: '', type: 'address' }]
    }
];
//# sourceMappingURL=registry-abi.js.map