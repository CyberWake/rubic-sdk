"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseError = void 0;
const errors_1 = require("../errors");
function parseError(err, defaultMessage) {
    if (err instanceof errors_1.RubicSdkError) {
        return err;
    }
    return new errors_1.RubicSdkError(err?.message || defaultMessage || 'Unknown error');
}
exports.parseError = parseError;
//# sourceMappingURL=errors.js.map