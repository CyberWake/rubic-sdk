"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IzumiBlastProvider = void 0;
const wrapped_native_tokens_1 = require("../../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const izumi_provider_1 = require("../../common/izumi-abstract/izumi-provider");
class IzumiBlastProvider extends izumi_provider_1.IzumiProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.BLAST;
        this.dexAddress = '0xA3F50FeBA40dd3E884688C0AF72C4054D07a1c50';
        this.config = {
            maxTransitTokens: 2,
            quoterAddress: '0xd413b415Bf8449D6DB8238826579647bfDb60a9f',
            liquidityManagerAddress: '0x5e7902aDf0Ea0ff827683Cc1d431F740CAD0731b',
            routingTokenAddresses: [
                wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.BLAST].address,
                '0x4300000000000000000000000000000000000003',
                '0x0A3BB08b3a15A19b4De82F8AcFc862606FB69A2D' // iUSD
            ],
            multicallAddress: '0x1DADF066518E2b7064D85cED45625BFeC52ca07d',
            supportedFees: [500, 3000, 10000]
        };
    }
}
exports.IzumiBlastProvider = IzumiBlastProvider;
//# sourceMappingURL=izumi-blast-provider.js.map