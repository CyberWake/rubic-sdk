"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MinaWeb3Pure_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinaWeb3Pure = void 0;
const blockchain_1 = require("../../../../../common/utils/blockchain");
const decorators_1 = require("../../../../../common/utils/decorators");
const changenow_receiver_address_validator_1 = require("../../../utils/changenow-receiver-address-validator");
const changenow_api_blockchain_1 = require("../../../../../features/cross-chain/calculation-manager/providers/changenow-provider/constants/changenow-api-blockchain");
let MinaWeb3Pure = exports.MinaWeb3Pure = MinaWeb3Pure_1 = class MinaWeb3Pure {
    static get nativeTokenAddress() {
        return MinaWeb3Pure_1.EMPTY_ADDRESS;
    }
    static isNativeAddress(address) {
        return (0, blockchain_1.compareAddresses)(address, MinaWeb3Pure_1.nativeTokenAddress);
    }
    static isEmptyAddress(address) {
        return address === MinaWeb3Pure_1.EMPTY_ADDRESS;
    }
    static async isAddressCorrect(address) {
        return (0, changenow_receiver_address_validator_1.isChangenowReceiverAddressCorrect)(address, changenow_api_blockchain_1.changenowApiBlockchain.MINA_PROTOCOL, /^(B62)[A-Za-z0-9]{52}$/);
    }
};
MinaWeb3Pure.EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';
exports.MinaWeb3Pure = MinaWeb3Pure = MinaWeb3Pure_1 = __decorate([
    (0, decorators_1.staticImplements)()
], MinaWeb3Pure);
//# sourceMappingURL=mina-web3-pure.js.map