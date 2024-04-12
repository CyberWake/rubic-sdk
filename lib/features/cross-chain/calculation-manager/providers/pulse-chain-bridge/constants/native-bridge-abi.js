"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nativeBridgeAbi = void 0;
exports.nativeBridgeAbi = [
    {
        inputs: [{ internalType: 'address', name: '_receiver', type: 'address' }],
        name: 'wrapAndRelayTokens',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
    },
    { stateMutability: 'payable', type: 'receive' }
];
//# sourceMappingURL=native-bridge-abi.js.map