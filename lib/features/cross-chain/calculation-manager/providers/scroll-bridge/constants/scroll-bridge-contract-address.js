"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrollBridgeContractAddress = void 0;
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
exports.scrollBridgeContractAddress = {
    [blockchain_name_1.BLOCKCHAIN_NAME.SCROLL_SEPOLIA]: {
        providerGateway: '0x91e8ADDFe1358aCa5314c644312d38237fC1101C',
        providerRouter: '0x91e8ADDFe1358aCa5314c644312d38237fC1101C',
        rubicRouter: '0x33798753ec66aEc00ed7E337B41F444f53A63333'
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.GOERLI]: {
        providerGateway: '0xe5E30E7c24e4dFcb281A682562E53154C15D3332',
        providerRouter: '0xe5E30E7c24e4dFcb281A682562E53154C15D3332',
        rubicRouter: '0x33798753ec66aEc00ed7E337B41F444f53A63333'
    }
};
//# sourceMappingURL=scroll-bridge-contract-address.js.map