"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultLineaProviderConfiguration = void 0;
const wrapped_native_tokens_1 = require("../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const defaultLineaRoutingProvidersAddresses = [
    wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.LINEA].address,
    '0xf5C6825015280CdfD0b56903F9F8B5A2233476F5',
    '0x7d43AABC515C356145049227CeE54B608342c0ad',
    '0x265b25e22bcd7f10a5bd6e6410f10537cc7567e8',
    '0x0B1A02A7309dFbfAD1Cd4adC096582C87e8A3Ac1',
    '0x2140Ea50bc3B6Ac3971F9e9Ea93A1442665670e4' // NFTE
];
const defaultLineaWethAddress = wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.LINEA].address;
exports.defaultLineaProviderConfiguration = {
    maxTransitTokens: 2,
    routingProvidersAddresses: defaultLineaRoutingProvidersAddresses,
    wethAddress: defaultLineaWethAddress
};
//# sourceMappingURL=default-constants.js.map