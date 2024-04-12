"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OsmosisWeb3Pure_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OsmosisWeb3Pure = void 0;
const blockchain_1 = require("../../../../../common/utils/blockchain");
const decorators_1 = require("../../../../../common/utils/decorators");
const changenow_receiver_address_validator_1 = require("../../../utils/changenow-receiver-address-validator");
const changenow_api_blockchain_1 = require("../../../../../features/cross-chain/calculation-manager/providers/changenow-provider/constants/changenow-api-blockchain");
let OsmosisWeb3Pure = exports.OsmosisWeb3Pure = OsmosisWeb3Pure_1 = class OsmosisWeb3Pure {
    static get nativeTokenAddress() {
        return OsmosisWeb3Pure_1.EMPTY_ADDRESS;
    }
    static isNativeAddress(address) {
        return (0, blockchain_1.compareAddresses)(address, OsmosisWeb3Pure_1.nativeTokenAddress);
    }
    static isEmptyAddress(address) {
        return address === OsmosisWeb3Pure_1.EMPTY_ADDRESS;
    }
    static async isAddressCorrect(address) {
        return (0, changenow_receiver_address_validator_1.isChangenowReceiverAddressCorrect)(address, changenow_api_blockchain_1.changenowApiBlockchain.OSMOSIS, /^(osmo1)[0-9a-z]{38}$/);
    }
};
OsmosisWeb3Pure.EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';
exports.OsmosisWeb3Pure = OsmosisWeb3Pure = OsmosisWeb3Pure_1 = __decorate([
    (0, decorators_1.staticImplements)()
], OsmosisWeb3Pure);
//# sourceMappingURL=osmosis-web3-pure.js.map