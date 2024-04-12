"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zrxApiParams = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
exports.zrxApiParams = {
    apiBaseUrl: {
        [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: 'https://api.0x.org/'
    },
    nativeTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
};
//# sourceMappingURL=constants.js.map