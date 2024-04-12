"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultFujiProviderConfiguration = void 0;
const wrapped_native_tokens_1 = require("../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const wethAddress = wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE].address;
const routingProvidersAddresses = [
    wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE].address,
    '0x231401dc8b53338d78c08f83cc4ebc74148196d0',
    '0x5425890298aed601595a70ab815c96711a31bc65',
    '0x0b9d5d9136855f6fec3c0993fee6e9ce8a297846',
    '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
    '0xd1c3f94DE7e5B45fa4eDBBA472491a9f4B166FC4' // XAVA
];
exports.defaultFujiProviderConfiguration = {
    maxTransitTokens: 3,
    routingProvidersAddresses,
    wethAddress
};
//# sourceMappingURL=default-constants.js.map