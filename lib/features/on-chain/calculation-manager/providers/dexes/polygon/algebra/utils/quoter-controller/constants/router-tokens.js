"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTER_TOKENS = void 0;
const wrapped_native_tokens_1 = require("../../../../../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../../../../../core/blockchain/models/blockchain-name");
/**
 * Most popular tokens in uni v3 to use in a route.
 */
exports.ROUTER_TOKENS = [
    wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.POLYGON].address,
    '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
    '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    '0x831753DD7087CaC61aB5644b308642cc1c33Dc13' // QUICK'
];
//# sourceMappingURL=router-tokens.js.map