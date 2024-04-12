"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omniBridgeNativeRouter = exports.pulseChainContractAddress = void 0;
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
exports.pulseChainContractAddress = {
    [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: {
        omniBridge: '0x1715a3E4A142d8b698131108995174F37aEBA10D',
        omniBridgeWrapped: '0xe20E337DB2a00b1C37139c873B92a0AAd3F468bF'
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.PULSECHAIN]: {
        omniBridge: '0x4fD0aaa7506f3d9cB8274bdB946Ec42A1b8751Ef',
        omniBridgeWrapped: '0x0e18d0d556b652794EF12Bf68B2dC857EF5f3996'
    }
};
exports.omniBridgeNativeRouter = '0x8AC4ae65b3656e26dC4e0e69108B392283350f55';
//# sourceMappingURL=pulse-chain-contract-address.js.map