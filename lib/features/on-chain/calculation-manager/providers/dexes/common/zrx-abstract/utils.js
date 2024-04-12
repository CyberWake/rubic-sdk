"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getZrxApiBaseUrl = void 0;
const errors_1 = require("../../../../../../../common/errors");
const constants_1 = require("./constants");
function getZrxApiBaseUrl(blockchain) {
    const { apiBaseUrl } = constants_1.zrxApiParams;
    if (!Object.keys(apiBaseUrl).includes(blockchain)) {
        throw new errors_1.RubicSdkError(`Zrx doesn't support ${blockchain} blockchain`);
    }
    return apiBaseUrl[blockchain];
}
exports.getZrxApiBaseUrl = getZrxApiBaseUrl;
//# sourceMappingURL=utils.js.map