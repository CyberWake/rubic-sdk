"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.layerZeroProxyOFT = void 0;
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const algb_token_addresses_1 = require("./algb-token-addresses");
exports.layerZeroProxyOFT = {
    [blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]: algb_token_addresses_1.ALGB_TOKEN.ARBITRUM,
    [blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: algb_token_addresses_1.ALGB_TOKEN.BSC,
    [blockchain_name_1.BLOCKCHAIN_NAME.POLYGON]: '0xDef87c507ef911Fd99c118c53171510Eb7967738'
};
//# sourceMappingURL=layerzero-bridge-address.js.map