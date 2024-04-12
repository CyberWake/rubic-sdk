"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PANGOLIN_PROVIDER_CONFIGURATION = exports.PANGOLIN_CONTRACT_ADDRESS = void 0;
const wrapped_native_tokens_1 = require("../../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const default_constants_1 = require("../default-constants");
exports.PANGOLIN_CONTRACT_ADDRESS = '0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106';
const routingProvidersAddresses = [
    wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE].address,
    '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
    '0x60781C2586D68229fde47564546784ab3fACA982',
    '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
    '0xd1c3f94DE7e5B45fa4eDBBA472491a9f4B166FC4',
    '0x8729438EB15e2C8B576fCc6AeCdA6A148776C0F5' // QI
];
exports.PANGOLIN_PROVIDER_CONFIGURATION = {
    ...default_constants_1.defaultAvalancheProviderConfiguration,
    routingProvidersAddresses
};
//# sourceMappingURL=constants.js.map