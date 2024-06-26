"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feeManagerAbi = void 0;
exports.feeManagerAbi = [
    {
        inputs: [],
        name: 'FOREIGN_TO_HOME_FEE',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'HOME_TO_FOREIGN_FEE',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '_feeType',
                type: 'bytes32'
            },
            {
                internalType: 'address',
                name: '_token',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: '_value',
                type: 'uint256'
            }
        ],
        name: 'calculateFee',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
//# sourceMappingURL=fee-manager-abi.js.map