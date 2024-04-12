"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EVM_MULTICALL_ABI = void 0;
exports.EVM_MULTICALL_ABI = [
    {
        inputs: [
            { internalType: 'bool', name: 'requireSuccess', type: 'bool' },
            {
                components: [
                    { internalType: 'address', name: 'target', type: 'address' },
                    { internalType: 'bytes', name: 'callData', type: 'bytes' }
                ],
                internalType: 'struct Multicall2.Call[]',
                name: 'calls',
                type: 'tuple[]'
            }
        ],
        name: 'tryAggregate',
        outputs: [
            {
                components: [
                    { internalType: 'bool', name: 'success', type: 'bool' },
                    { internalType: 'bytes', name: 'returnData', type: 'bytes' }
                ],
                internalType: 'struct Multicall2.Result[]',
                name: 'returnData',
                type: 'tuple[]'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
    }
];
//# sourceMappingURL=evm-multicall-abi.js.map