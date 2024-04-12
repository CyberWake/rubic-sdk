"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultBscTestnetProviderConfiguration = void 0;
const wrapped_native_tokens_1 = require("../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const defaultBscWethAddress = wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN].address;
const defaultBscRoutingProvidersAddresses = [
    defaultBscWethAddress,
    '0x855fC87f7F14Db747ef27603b02bAe579ba947B6',
    '0x7d43AABC515C356145049227CeE54B608342c0ad',
    '0xC826C23327098cd8A37f140114F2173A8F62DD29',
    '0x9a01bf917477dd9f5d715d188618fc8b7350cd22' // BUSD
];
exports.defaultBscTestnetProviderConfiguration = {
    maxTransitTokens: 3,
    routingProvidersAddresses: defaultBscRoutingProvidersAddresses,
    wethAddress: defaultBscWethAddress
};
//# sourceMappingURL=default-constants.js.map