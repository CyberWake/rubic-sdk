"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultAvalancheProviderConfiguration = void 0;
const wrapped_native_tokens_1 = require("../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const defaultAvalancheRoutingProvidersAddresses = [
    wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE].address,
    '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
    '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
    '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
    '0x60781C2586D68229fde47564546784ab3fACA982',
    '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
    '0xd1c3f94DE7e5B45fa4eDBBA472491a9f4B166FC4' // XAVA
];
const defaultAvalancheWethAddress = wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE].address;
exports.defaultAvalancheProviderConfiguration = {
    maxTransitTokens: 3,
    routingProvidersAddresses: defaultAvalancheRoutingProvidersAddresses,
    wethAddress: defaultAvalancheWethAddress
};
//# sourceMappingURL=default-constants.js.map