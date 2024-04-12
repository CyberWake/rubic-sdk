"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BitcoinWeb3Pure_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitcoinWeb3Pure = void 0;
const bitcoin_address_validation_1 = require("bitcoin-address-validation");
const blockchain_1 = require("../../../../common/utils/blockchain");
const decorators_1 = require("../../../../common/utils/decorators");
let BitcoinWeb3Pure = exports.BitcoinWeb3Pure = BitcoinWeb3Pure_1 = class BitcoinWeb3Pure {
    static get nativeTokenAddress() {
        return BitcoinWeb3Pure_1.EMPTY_ADDRESS;
    }
    static isNativeAddress(address) {
        return (0, blockchain_1.compareAddresses)(address, BitcoinWeb3Pure_1.nativeTokenAddress);
    }
    static isEmptyAddress(address) {
        return address === BitcoinWeb3Pure_1.EMPTY_ADDRESS;
    }
    static async isAddressCorrect(address) {
        return (0, bitcoin_address_validation_1.validate)(address, bitcoin_address_validation_1.Network.mainnet);
    }
};
BitcoinWeb3Pure.EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';
exports.BitcoinWeb3Pure = BitcoinWeb3Pure = BitcoinWeb3Pure_1 = __decorate([
    (0, decorators_1.staticImplements)()
], BitcoinWeb3Pure);
//# sourceMappingURL=bitcoin-web3-pure.js.map