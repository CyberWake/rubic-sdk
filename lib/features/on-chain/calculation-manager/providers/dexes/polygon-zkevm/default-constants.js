"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultPolygonZKEVMProviderConfiguration = void 0;
const wrapped_native_tokens_1 = require("../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const defaultPolygonZKEVMRoutingProvidersAddresses = [
    wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.POLYGON_ZKEVM].address,
    '0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4',
    '0x1E4a5963aBFD975d8c9021ce480b42188849D41d',
    '0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035',
    '0x68286607A1d43602d880D349187c3c48c0fD05E6',
    '0xEA034fb02eB1808C2cc3adbC15f447B93CbE08e1' // wBTC
];
const defaultPolygonZKEVMWethAddress = wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.POLYGON_ZKEVM].address;
exports.defaultPolygonZKEVMProviderConfiguration = {
    maxTransitTokens: 3,
    routingProvidersAddresses: defaultPolygonZKEVMRoutingProvidersAddresses,
    wethAddress: defaultPolygonZKEVMWethAddress
};
//# sourceMappingURL=default-constants.js.map