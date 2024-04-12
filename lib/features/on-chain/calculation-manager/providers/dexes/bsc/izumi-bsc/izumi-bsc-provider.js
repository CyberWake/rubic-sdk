"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IzumiBscProvider = void 0;
const wrapped_native_tokens_1 = require("../../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const izumi_provider_1 = require("../../common/izumi-abstract/izumi-provider");
class IzumiBscProvider extends izumi_provider_1.IzumiProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN;
        this.dexAddress = '0xedf2021f41AbCfE2dEA4427E1B61f4d0AA5aA4b8';
        this.config = {
            maxTransitTokens: 2,
            quoterAddress: '0xDCe9a4ACC59E69ECcC0cdA2E82fe601fdB726542',
            liquidityManagerAddress: '0xBF55ef05412f1528DbD96ED9E7181f87d8C9F453',
            routingTokenAddresses: [
                '0x55d398326f99059ff775485246999027b3197955',
                wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN].address,
                '0xe9e7cea3dedca5984780bafc599bd69add087d56' // BUSD
            ],
            multicallAddress: '0xA1189a420662105bef5Be444B8b1E0a7D8279672',
            supportedFees: [2000, 400]
        };
    }
}
exports.IzumiBscProvider = IzumiBscProvider;
//# sourceMappingURL=izumi-bsc-provider.js.map