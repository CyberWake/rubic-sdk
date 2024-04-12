"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultZetachainProviderConfiguration = void 0;
const wrapped_native_tokens_1 = require("../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const defaultZetachainRoutingProvidersAddresses = [
    wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.ZETACHAIN].address,
    '0x05BA149A7bd6dC1F937fA9046A9e05C05f3b18b0',
    '0x0cbe0dF132a6c6B4a2974Fa1b7Fb953CF0Cc798a',
    '0x7c8dDa80bbBE1254a7aACf3219EBe1481c6E01d7',
    '0x91d4F0D54090Df2D81e834c3c8CE71C6c865e79F',
    '0x48f80608B672DC30DC7e3dbBd0343c5F02C738Eb',
    '0xd97B1de3619ed2c6BEb3860147E30cA8A7dC9891',
    '0x13A0c5930C028511Dc02665E7285134B6d11A5f4' // BTC.BTC
];
const defaultZetachainWethAddress = wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.ZETACHAIN].address;
exports.defaultZetachainProviderConfiguration = {
    maxTransitTokens: 1,
    routingProvidersAddresses: defaultZetachainRoutingProvidersAddresses,
    wethAddress: defaultZetachainWethAddress
};
//# sourceMappingURL=default-constants.js.map