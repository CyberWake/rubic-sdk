"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultAuroraProviderConfiguration = void 0;
const wrapped_native_tokens_1 = require("../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const defaultAuroraRoutingProvidersAddresses = [
    wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.AURORA].address,
    '0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d',
    '0xFa94348467f64D5A457F75F8bc40495D33c65aBB',
    '0x7faA64Faf54750a2E3eE621166635fEAF406Ab22',
    '0xB12BFcA5A55806AaF64E99521918A4bf0fC40802',
    '0x4988a896b1227218e4A686fdE5EabdcAbd91571f',
    '0x8BEc47865aDe3B172A928df8f990Bc7f2A3b9f79',
    '0xe3520349F477A5F6EB06107066048508498A291b' // DAI
];
const defaultAuroraWethAddress = wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.AURORA].address;
exports.defaultAuroraProviderConfiguration = {
    maxTransitTokens: 1,
    routingProvidersAddresses: defaultAuroraRoutingProvidersAddresses,
    wethAddress: defaultAuroraWethAddress
};
//# sourceMappingURL=default-constants.js.map