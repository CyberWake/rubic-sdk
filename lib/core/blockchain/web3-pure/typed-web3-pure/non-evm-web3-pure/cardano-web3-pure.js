"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CardanoWeb3Pure_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardanoWeb3Pure = void 0;
const blockchain_1 = require("../../../../../common/utils/blockchain");
const decorators_1 = require("../../../../../common/utils/decorators");
const changenow_receiver_address_validator_1 = require("../../../utils/changenow-receiver-address-validator");
const changenow_api_blockchain_1 = require("../../../../../features/cross-chain/calculation-manager/providers/changenow-provider/constants/changenow-api-blockchain");
let CardanoWeb3Pure = exports.CardanoWeb3Pure = CardanoWeb3Pure_1 = class CardanoWeb3Pure {
    static get nativeTokenAddress() {
        return CardanoWeb3Pure_1.EMPTY_ADDRESS;
    }
    static isNativeAddress(address) {
        return (0, blockchain_1.compareAddresses)(address, CardanoWeb3Pure_1.nativeTokenAddress);
    }
    static isEmptyAddress(address) {
        return address === CardanoWeb3Pure_1.EMPTY_ADDRESS;
    }
    static async isAddressCorrect(address) {
        return (0, changenow_receiver_address_validator_1.isChangenowReceiverAddressCorrect)(address, changenow_api_blockchain_1.changenowApiBlockchain.CARDANO, /^([1-9A-HJ-NP-Za-km-z]{59,104})|([0-9A-Za-z]{58,104})$/);
    }
};
CardanoWeb3Pure.EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';
exports.CardanoWeb3Pure = CardanoWeb3Pure = CardanoWeb3Pure_1 = __decorate([
    (0, decorators_1.staticImplements)()
], CardanoWeb3Pure);
//# sourceMappingURL=cardano-web3-pure.js.map