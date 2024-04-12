"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultMumbaiProviderConfiguration = void 0;
const wrapped_native_tokens_1 = require("../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const wethAddress = wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.MUMBAI].address;
const routingProvidersAddresses = [
    wethAddress,
    '0x6De33698e9e9b787e09d3Bd7771ef63557E148bb',
    '0xD9d1034ef3d21221F008C7e96346CA999966752C',
    '0x19d66abd20fb2a0fc046c139d5af1e97f09a695e',
    '0x2a655231e814e71015ff991d90c5790b5de82b94',
    '0x6d8873f56a56f0af376091bedddd149f3592e854' // DAI
];
exports.defaultMumbaiProviderConfiguration = {
    maxTransitTokens: 3,
    routingProvidersAddresses,
    wethAddress
};
//# sourceMappingURL=default-constants.js.map