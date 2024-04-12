"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RippleWeb3Pure_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RippleWeb3Pure = void 0;
const blockchain_1 = require("../../../../../common/utils/blockchain");
const decorators_1 = require("../../../../../common/utils/decorators");
const changenow_receiver_address_validator_1 = require("../../../utils/changenow-receiver-address-validator");
const changenow_api_blockchain_1 = require("../../../../../features/cross-chain/calculation-manager/providers/changenow-provider/constants/changenow-api-blockchain");
let RippleWeb3Pure = exports.RippleWeb3Pure = RippleWeb3Pure_1 = class RippleWeb3Pure {
    static get nativeTokenAddress() {
        return RippleWeb3Pure_1.EMPTY_ADDRESS;
    }
    static isNativeAddress(address) {
        return (0, blockchain_1.compareAddresses)(address, RippleWeb3Pure_1.nativeTokenAddress);
    }
    static isEmptyAddress(address) {
        return address === RippleWeb3Pure_1.EMPTY_ADDRESS;
    }
    static async isAddressCorrect(address) {
        return (0, changenow_receiver_address_validator_1.isChangenowReceiverAddressCorrect)(address, changenow_api_blockchain_1.changenowApiBlockchain.RIPPLE, /^r[1-9A-HJ-NP-Za-km-z]{25,34}$/);
    }
};
RippleWeb3Pure.EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';
exports.RippleWeb3Pure = RippleWeb3Pure = RippleWeb3Pure_1 = __decorate([
    (0, decorators_1.staticImplements)()
], RippleWeb3Pure);
//# sourceMappingURL=ripple-web3-pure.js.map