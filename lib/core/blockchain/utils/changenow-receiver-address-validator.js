"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isChangenowReceiverAddressCorrect = void 0;
const injector_1 = require("../../injector/injector");
const isChangenowReceiverAddressCorrect = async (address, chain, regEx) => {
    try {
        const response = await injector_1.Injector.httpClient.get(`https://api.changenow.io/v2/validate/address?currency=${chain}&address=${address}`);
        return response.result;
    }
    catch (error) {
        return regEx.test(address);
    }
};
exports.isChangenowReceiverAddressCorrect = isChangenowReceiverAddressCorrect;
//# sourceMappingURL=changenow-receiver-address-validator.js.map