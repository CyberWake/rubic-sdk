"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodDecoder = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const web3_1 = __importDefault(require("web3"));
class MethodDecoder {
    static decodeMethod(abiItem, data) {
        const abiCoder = new web3_1.default().eth.abi;
        const inputs = abiItem.inputs;
        const decoded = abiCoder.decodeParameters(inputs, data.slice(10));
        const decodedData = {
            name: abiItem.name,
            params: []
        };
        for (let i = 0; i < decoded.__length__; i++) {
            const param = decoded[i];
            let parsedParam = param;
            const isUint = inputs[i].type.indexOf('uint') === 0;
            const isInt = inputs[i].type.indexOf('int') === 0;
            const isAddress = inputs[i].type.indexOf('address') === 0;
            if (isUint || isInt) {
                const isArray = Array.isArray(param);
                if (isArray) {
                    parsedParam = param.map(val => new bignumber_js_1.default(val).toFixed());
                }
                else {
                    parsedParam = new bignumber_js_1.default(param).toFixed();
                }
            }
            // Addresses returned by web3 are randomly cased so we need to standardize and lowercase all
            if (isAddress) {
                const isArray = Array.isArray(param);
                if (isArray) {
                    parsedParam = param.map(_ => _.toLowerCase());
                }
                else {
                    parsedParam = param.toLowerCase();
                }
            }
            decodedData.params.push({
                name: inputs[i].name,
                value: parsedParam,
                type: inputs[i].type
            });
        }
        return decodedData;
    }
}
exports.MethodDecoder = MethodDecoder;
//# sourceMappingURL=decode-method.js.map