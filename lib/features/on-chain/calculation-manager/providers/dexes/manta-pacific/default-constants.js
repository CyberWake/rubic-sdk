"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultMantaPacificProviderConfiguration = void 0;
const wrapped_native_tokens_1 = require("../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const defaultMantaPacificRoutingProvidersAddresses = [
    wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.MANTA_PACIFIC].address,
    '0xf417F5A458eC102B90352F697D6e2Ac3A3d2851f',
    '0xb73603C5d87fA094B7314C74ACE2e64D165016fb',
    '0x1c466b9371f8aBA0D7c458bE10a62192Fcb8Aa71',
    '0x305E88d809c9DC03179554BFbf85Ac05Ce8F18d6' // WBTC
];
const defaultMantaPacificWethAddress = wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.MANTA_PACIFIC].address;
exports.defaultMantaPacificProviderConfiguration = {
    maxTransitTokens: 2,
    routingProvidersAddresses: defaultMantaPacificRoutingProvidersAddresses,
    wethAddress: defaultMantaPacificWethAddress
};
//# sourceMappingURL=default-constants.js.map