"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TronWeb3Pure_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TronWeb3Pure = void 0;
const ethers_1 = require("ethers");
const blockchain_1 = require("../../../../../common/utils/blockchain");
const decorators_1 = require("../../../../../common/utils/decorators");
const tron_web_1 = require("../../../constants/tron/tron-web");
let TronWeb3Pure = exports.TronWeb3Pure = TronWeb3Pure_1 = class TronWeb3Pure {
    static get nativeTokenAddress() {
        return '0x0000000000000000000000000000000000000000';
    }
    static isNativeAddress(address) {
        return (0, blockchain_1.compareAddresses)(address, TronWeb3Pure_1.nativeTokenAddress);
    }
    static isEmptyAddress(address) {
        return address === TronWeb3Pure_1.EMPTY_ADDRESS;
    }
    static async isAddressCorrect(address) {
        return tron_web_1.TronWeb.isAddress(address);
    }
    static addressToHex(address) {
        return tron_web_1.TronWeb.address.toHex(address).replace(/^41/, '0x');
    }
    /**
     * Returns transaction config with encoded data.
     */
    static encodeMethodCall(contractAddress, contractAbi, methodName, methodArguments = [], callValue, feeLimit) {
        const data = this.encodeFunctionCall(contractAbi, methodName, methodArguments);
        return {
            to: contractAddress,
            data,
            callValue,
            feeLimit
        };
    }
    /**
     * Encodes a function call using its JSON interface object and given parameters.
     * @param contractAbi The JSON interface object of a function.
     * @param methodName Method name to encode.
     * @param methodArguments Parameters to encode.
     * @returns An ABI encoded function call. Means function signature + parameters.
     */
    static encodeFunctionCall(contractAbi, methodName, methodArguments) {
        const methodSignature = contractAbi.find(abiItem => abiItem.name === methodName);
        if (methodSignature === undefined) {
            throw Error('No such method in abi');
        }
        const encodedMethodSignature = tron_web_1.TronWeb.sha3(`${methodSignature.name}(${this.flattenTypesToString(methodSignature.inputs).join(',')})`).slice(0, 10);
        const encodedParameters = tron_web_1.TronWeb.utils.abi.encodeParams(this.flattenTypesToArray(methodSignature.inputs), methodArguments);
        return encodedMethodSignature + encodedParameters.slice(2);
    }
    static encodeMethodSignature(methodSignature, parameters) {
        const encodedMethodSignature = tron_web_1.TronWeb.sha3(methodSignature).slice(0, 10);
        const flattenedParameters = this.flattenParameters(parameters);
        const encodedParameters = tron_web_1.TronWeb.utils.abi.encodeParams(flattenedParameters[0], flattenedParameters[1]);
        return encodedMethodSignature + encodedParameters.slice(2);
    }
    /**
     * Decodes method result using its JSON interface object and given parameters.
     * @param outputAbi The JSON interface object of an output of function.
     * @param response Bytes code returned after method call.
     * @returns Parsed method output.
     */
    static decodeMethodOutput(outputAbi, response) {
        const decodedParam = tron_web_1.TronWeb.utils.abi.decodeParams([], this.flattenTypesToArray(outputAbi), response)[0];
        return this.flattenParameterToPrimitive(decodedParam);
    }
    static flattenTypesToString(abiInputs) {
        return (abiInputs?.map(abiInput => {
            if (abiInput.type === 'tuple') {
                const flattenedComponents = this.flattenTypesToString(abiInput.components);
                return `(${flattenedComponents.join(',')})`;
            }
            return abiInput.type;
        }) || []);
    }
    static flattenTypesToArray(abiInputs) {
        return (abiInputs?.map(abiInput => {
            if (abiInput.type === 'tuple') {
                return this.flattenTypesToArray(abiInput.components);
            }
            return abiInput.type;
        }) || []);
    }
    static flattenParameters(parameters) {
        const types = [];
        const values = [];
        parameters.forEach(parameter => {
            if (parameter.type === 'tuple') {
                const flattenedParameters = this.flattenParameters(parameter.value);
                types.push(flattenedParameters[0]);
                values.push(flattenedParameters[1]);
            }
            else {
                types.push(parameter.type);
                values.push(parameter.value);
            }
        });
        return [types, values];
    }
    static flattenParameterToPrimitive(parameter) {
        if (typeof parameter === 'number' || parameter instanceof ethers_1.BigNumber) {
            return parameter.toString();
        }
        if (typeof parameter === 'string' || typeof parameter === 'boolean') {
            return parameter;
        }
        return Object.keys(parameter).reduce((acc, paramKey) => {
            const parameterField = parameter[paramKey];
            return {
                ...acc,
                [paramKey]: this.flattenParameterToPrimitive(parameterField)
            };
        }, {});
    }
};
TronWeb3Pure.EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';
exports.TronWeb3Pure = TronWeb3Pure = TronWeb3Pure_1 = __decorate([
    (0, decorators_1.staticImplements)()
], TronWeb3Pure);
//# sourceMappingURL=tron-web3-pure.js.map