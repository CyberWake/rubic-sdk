"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var EvmWeb3Pure_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvmWeb3Pure = void 0;
const ethers_1 = require("ethers");
const errors_1 = require("../../../../../common/errors");
const blockchain_1 = require("../../../../../common/utils/blockchain");
const decorators_1 = require("../../../../../common/utils/decorators");
const web3_1 = __importDefault(require("web3"));
const web3_utils_1 = require("web3-utils");
let EvmWeb3Pure = exports.EvmWeb3Pure = EvmWeb3Pure_1 = class EvmWeb3Pure {
    static get nativeTokenAddress() {
        return '0x0000000000000000000000000000000000000000';
    }
    static isNativeAddress(address) {
        return (0, blockchain_1.compareAddresses)(address, EvmWeb3Pure_1.nativeTokenAddress);
    }
    static isEmptyAddress(address) {
        return address === EvmWeb3Pure_1.EMPTY_ADDRESS;
    }
    static async isAddressCorrect(address) {
        return (0, web3_utils_1.isAddress)(address);
    }
    static encodeParameters(types, params) {
        return EvmWeb3Pure_1.web3Eth.abi.encodeParameters(types, params);
    }
    /**
     * Converts address to bytes32 format.
     * @param address Address to convert.
     */
    static addressToBytes32(address) {
        if (address.slice(0, 2) !== '0x' || address.length !== 42) {
            console.error('Wrong address format');
            throw new errors_1.RubicSdkError('Wrong address format');
        }
        return `0x${address.slice(2).padStart(64, '0')}`;
    }
    /**
     * Converts ascii address to bytes32 format.
     * @param address Address to convert.
     */
    static asciiToBytes32(address) {
        const bytes = (0, web3_utils_1.fromAscii)(address);
        return `0x${bytes.slice(2).padStart(64, '0')}`;
    }
    /**
     * Generate random HEX strings from a given byte size.
     * @param size byte size.
     */
    static randomHex(size) {
        return (0, web3_utils_1.randomHex)(size);
    }
    /**
     * Returns transaction config with encoded data.
     */
    static encodeMethodCall(contractAddress, contractAbi, method, parameters = [], value, options = {}) {
        const contract = new this.web3Eth.Contract(contractAbi);
        const data = contract.methods[method](...parameters).encodeABI();
        return {
            to: contractAddress,
            data,
            value: value || '0',
            gas: options.gas,
            gasPrice: options.gasPrice,
            maxFeePerGas: options.maxFeePerGas,
            maxPriorityFeePerGas: options.maxPriorityFeePerGas
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
        return this.web3Eth.abi.encodeFunctionCall(methodSignature, methodArguments);
    }
    /**
     * Converts address to checksum format.
     * @param address Address to convert.
     */
    static toChecksumAddress(address) {
        return (0, web3_utils_1.toChecksumAddress)(address);
    }
    /**
     * Decodes data by ABI.
     * @param functionName Function name in ABI.
     * @param functionArguments Array of function's inputs.
     * @param data Data (hex string).
     * @returns Decoded data.
     */
    static decodeData(functionName, functionArguments, data) {
        const argumentsString = functionArguments.map(arg => arg.join(' ')).join(', ');
        const abiString = `function ${functionName}(${argumentsString})`;
        const abi = new ethers_1.ethers.utils.Interface([abiString]);
        const abiFunctionKey = Object.keys(abi.functions)[0];
        return abi.decodeFunctionData(abi.functions[abiFunctionKey], data);
    }
};
EvmWeb3Pure.EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';
EvmWeb3Pure.web3Eth = new web3_1.default().eth;
exports.EvmWeb3Pure = EvmWeb3Pure = EvmWeb3Pure_1 = __decorate([
    (0, decorators_1.staticImplements)()
], EvmWeb3Pure);
//# sourceMappingURL=evm-web3-pure.js.map