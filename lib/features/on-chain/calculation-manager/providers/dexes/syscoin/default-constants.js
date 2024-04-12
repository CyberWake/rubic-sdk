"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultSyscoinProviderConfiguration = void 0;
const wrapped_native_tokens_1 = require("../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const defaultSyscoinRoutingProvidersAddresses = [
    wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.SYSCOIN].address,
    '0x2bF9b864cdc97b08B6D79ad4663e71B8aB65c45c',
    '0x922D641a426DcFFaeF11680e5358F34d97d112E1' // USDT
];
const defaultSyscoinWethAddress = wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.SYSCOIN].address;
exports.defaultSyscoinProviderConfiguration = {
    maxTransitTokens: 2,
    routingProvidersAddresses: defaultSyscoinRoutingProvidersAddresses,
    wethAddress: defaultSyscoinWethAddress
};
//# sourceMappingURL=default-constants.js.map