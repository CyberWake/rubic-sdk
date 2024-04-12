"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taikoBridgeContractAddress = void 0;
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
exports.taikoBridgeContractAddress = {
    [blockchain_name_1.BLOCKCHAIN_NAME.HOLESKY]: {
        nativeProvider: '0xf458747c6d6db57970dE80Da6474C0A3dfE94BF1',
        erc20Provider: '0x095DDce4fd8818aD159D778E6a9898A2474933ca'
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.TAIKO]: {
        nativeProvider: '0x1670080000000000000000000000000000000001',
        erc20Provider: '0x1670080000000000000000000000000000000002'
    }
};
//# sourceMappingURL=taiko-bridge-contract-address.js.map