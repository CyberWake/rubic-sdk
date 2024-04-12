"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JOE_PROVIDER_CONFIGURATION = exports.JOE_CONTRACT_ADDRESS = void 0;
const wrapped_native_tokens_1 = require("../../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const default_constants_1 = require("../default-constants");
exports.JOE_CONTRACT_ADDRESS = '0x60aE616a2155Ee3d9A68541Ba4544862310933d4';
const routingProvidersAddresses = [
    wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE].address,
    '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
    '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd',
    '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
    '0xd1c3f94DE7e5B45fa4eDBBA472491a9f4B166FC4',
    '0x8729438EB15e2C8B576fCc6AeCdA6A148776C0F5' // QI
];
exports.JOE_PROVIDER_CONFIGURATION = {
    ...default_constants_1.defaultAvalancheProviderConfiguration,
    routingProvidersAddresses
};
//# sourceMappingURL=constants.js.map