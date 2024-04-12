"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNI_SWAP_V3_ARBITRUM_PROVIDER_CONFIGURATION = void 0;
const wrapped_native_tokens_1 = require("../../../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../../../core/blockchain/models/blockchain-name");
exports.UNI_SWAP_V3_ARBITRUM_PROVIDER_CONFIGURATION = {
    wethAddress: wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM].address,
    maxTransitTokens: 1
};
//# sourceMappingURL=provider-configuration.js.map