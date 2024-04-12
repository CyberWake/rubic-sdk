"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNISWAP_V2_SCROLL_SEPOLIA_CONFIGURATION = exports.UNISWAP_V2_SCROLL_SEPOLIA_CONTRACT_ADDRESS = void 0;
const wrapped_native_tokens_1 = require("../../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const defaultScrollWethAddress = wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.SCROLL_SEPOLIA].address;
const defaultScrollRoutingProvidersAddresses = [
    defaultScrollWethAddress,
    '0x15Fe86961428E095B064bb52FcF5964bAb834E34' // USDC
];
exports.UNISWAP_V2_SCROLL_SEPOLIA_CONTRACT_ADDRESS = '';
exports.UNISWAP_V2_SCROLL_SEPOLIA_CONFIGURATION = {
    maxTransitTokens: 2,
    routingProvidersAddresses: defaultScrollRoutingProvidersAddresses,
    wethAddress: defaultScrollWethAddress
};
//# sourceMappingURL=constants.js.map