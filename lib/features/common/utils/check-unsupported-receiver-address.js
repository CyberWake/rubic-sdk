"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUnsupportedReceiverAddress = void 0;
const errors_1 = require("../../../common/errors");
const blockchain_1 = require("../../../common/utils/blockchain");
function checkUnsupportedReceiverAddress(receiverAddress, fromAddress) {
    if (receiverAddress && (!fromAddress || !(0, blockchain_1.compareAddresses)(receiverAddress, fromAddress))) {
        throw new errors_1.UnsupportedReceiverAddressError();
    }
}
exports.checkUnsupportedReceiverAddress = checkUnsupportedReceiverAddress;
//# sourceMappingURL=check-unsupported-receiver-address.js.map