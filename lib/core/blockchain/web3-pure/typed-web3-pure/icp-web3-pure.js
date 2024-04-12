"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var IcpWeb3Pure_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IcpWeb3Pure = void 0;
const blockchain_1 = require("../../../../common/utils/blockchain");
const decorators_1 = require("../../../../common/utils/decorators");
const CRC32 = require('crc-32');
let IcpWeb3Pure = exports.IcpWeb3Pure = IcpWeb3Pure_1 = class IcpWeb3Pure {
    static get nativeTokenAddress() {
        return IcpWeb3Pure_1.EMPTY_ADDRESS;
    }
    static isNativeAddress(address) {
        return (0, blockchain_1.compareAddresses)(address, IcpWeb3Pure_1.nativeTokenAddress);
    }
    static isEmptyAddress(address) {
        return address === IcpWeb3Pure_1.EMPTY_ADDRESS;
    }
    static async isAddressCorrect(address) {
        if (address?.length !== 64) {
            return false;
        }
        const buffer = this.base16Decode(address);
        const hash = CRC32.buf(buffer.slice(4));
        return hash === ((buffer[0] << 24) | (buffer[1] << 16) | (buffer[2] << 8) | buffer[3]);
    }
    static base16Decode(str) {
        const buffer = [];
        for (let i = 0; i < str.length / 2; ++i) {
            const hi = parseInt(str.substring(i * 2, i * 2 + 1), 16);
            const lo = parseInt(str.substring(i * 2 + 1, i * 2 + 2), 16);
            buffer.push((hi << 4) | lo);
        }
        return buffer;
    }
};
IcpWeb3Pure.EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';
exports.IcpWeb3Pure = IcpWeb3Pure = IcpWeb3Pure_1 = __decorate([
    (0, decorators_1.staticImplements)()
], IcpWeb3Pure);
//# sourceMappingURL=icp-web3-pure.js.map