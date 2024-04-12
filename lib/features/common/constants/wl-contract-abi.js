"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wlContractAbi = void 0;
exports.wlContractAbi = [
    {
        inputs: [],
        name: 'getAvailableAnyRouters',
        outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getAvailableCrossChains',
        outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getAvailableDEXs',
        outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: '_anyRouter', type: 'address' }],
        name: 'isWhitelistedAnyRouter',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: '_crossChain', type: 'address' }],
        name: 'isWhitelistedCrossChain',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: '_dex', type: 'address' }],
        name: 'isWhitelistedDEX',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function'
    }
];
//# sourceMappingURL=wl-contract-abi.js.map