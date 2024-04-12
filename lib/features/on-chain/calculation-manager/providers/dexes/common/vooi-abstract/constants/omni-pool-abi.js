"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omniPoolAbi = void 0;
exports.omniPoolAbi = [
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_fromAsset',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: '_toAsset',
                type: 'uint256'
            },
            {
                internalType: 'int256',
                name: '_fromAmount',
                type: 'int256'
            }
        ],
        name: 'quoteFrom',
        outputs: [
            {
                internalType: 'uint256',
                name: 'actualToAmount',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'lpFeeAmount',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];
//# sourceMappingURL=omni-pool-abi.js.map