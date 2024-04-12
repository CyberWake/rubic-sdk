"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronosProviderConfiguration = exports.defaultCronosProviderConfiguration = void 0;
const wrapped_native_tokens_1 = require("../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const defaultCronosRoutingProvidersAddresses = [
    wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.CRONOS].address,
    '0x66e428c3f67a68878562e79a0234c1f83c208770',
    '0xc21223249CA28397B4B6541dfFaEcC539BfF0c59',
    '0xfa9343c3897324496a05fc75abed6bac29f8a40f',
    '0x0e517979c2c1c1522ddb0c73905e0d39b3f990c0',
    '0x1a8e39ae59e5556b56b76fcba98d22c9ae557396',
    '0xf78a326ACd53651F8dF5D8b137295e434B7c8ba5',
    '0x062e66477faf219f25d27dced647bf57c3107d52',
    '0xf2001b145b43032aaf5ee2884e456ccd805f677d' // DAI
];
exports.defaultCronosProviderConfiguration = {
    maxTransitTokens: 2,
    routingProvidersAddresses: defaultCronosRoutingProvidersAddresses,
    wethAddress: wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.CRONOS].address
};
exports.cronosProviderConfiguration = {
    ...exports.defaultCronosProviderConfiguration,
    routingProvidersAddresses: defaultCronosRoutingProvidersAddresses
};
//# sourceMappingURL=default-constants.js.map