"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertGasDataToBN = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
function convertGasDataToBN(gasData) {
    return Object.entries(gasData).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: new bignumber_js_1.default(value)
    }), {});
}
exports.convertGasDataToBN = convertGasDataToBN;
//# sourceMappingURL=convert-gas-price.js.map