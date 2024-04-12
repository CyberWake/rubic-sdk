"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IzumiBaseProvider = void 0;
const wrapped_native_tokens_1 = require("../../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const izumi_provider_1 = require("../../common/izumi-abstract/izumi-provider");
class IzumiBaseProvider extends izumi_provider_1.IzumiProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.BASE;
        this.dexAddress = '0x02F55D53DcE23B4AA962CC68b0f685f26143Bdb2';
        this.config = {
            maxTransitTokens: 2,
            quoterAddress: '0x3EF68D3f7664b2805D4E88381b64868a56f88bC4',
            liquidityManagerAddress: '0x110dE362cc436D7f54210f96b8C7652C2617887D',
            routingTokenAddresses: [
                '0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d',
                wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.BASE].address,
                '0x60d01ec2d5e98ac51c8b4cf84dfcce98d527c747' // IZI
            ],
            multicallAddress: '0x7a524c7e82874226F0b51aade60A1BE4D430Cf0F',
            supportedFees: [10000, 3000, 500]
        };
    }
}
exports.IzumiBaseProvider = IzumiBaseProvider;
//# sourceMappingURL=izumi-base-provider.js.map