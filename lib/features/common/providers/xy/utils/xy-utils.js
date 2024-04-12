"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xyAnalyzeStatusCode = void 0;
const errors_1 = require("../../../../../common/errors");
const xy_error_code_1 = require("../constants/xy-error-code");
function xyAnalyzeStatusCode(errorCode, errorMessage) {
    if (xy_error_code_1.XY_ERROR_CODE[errorCode]) {
        throw new errors_1.RubicSdkError(errorMessage);
    }
    throw new errors_1.RubicSdkError('Unknown Error.');
}
exports.xyAnalyzeStatusCode = xyAnalyzeStatusCode;
//# sourceMappingURL=xy-utils.js.map