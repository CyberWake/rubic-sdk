"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IzumiMantaPacificProvider = void 0;
const wrapped_native_tokens_1 = require("../../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const izumi_provider_1 = require("../../common/izumi-abstract/izumi-provider");
class IzumiMantaPacificProvider extends izumi_provider_1.IzumiProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.MANTA_PACIFIC;
        this.dexAddress = '0x3EF68D3f7664b2805D4E88381b64868a56f88bC4';
        this.config = {
            maxTransitTokens: 2,
            quoterAddress: '0x34bc1b87f60e0a30c0e24FD7Abada70436c71406',
            liquidityManagerAddress: '0x19b683A2F45012318d9B2aE1280d68d3eC54D663',
            routingTokenAddresses: [
                '0xb73603C5d87fA094B7314C74ACE2e64D165016fb',
                wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.MANTA_PACIFIC].address,
                '0xf417F5A458eC102B90352F697D6e2Ac3A3d2851f' // USDT
            ],
            multicallAddress: '0x7a524c7e82874226F0b51aade60A1BE4D430Cf0F',
            supportedFees: [10000, 3000, 500]
        };
    }
}
exports.IzumiMantaPacificProvider = IzumiMantaPacificProvider;
//# sourceMappingURL=izumi-manta-pacific-provider.js.map