"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IzumiMantleProvider = void 0;
const wrapped_native_tokens_1 = require("../../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const izumi_provider_1 = require("../../common/izumi-abstract/izumi-provider");
class IzumiMantleProvider extends izumi_provider_1.IzumiProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.MANTLE;
        this.dexAddress = '0x25C030116Feb2E7BbA054b9de0915E5F51b03e31';
        this.config = {
            maxTransitTokens: 2,
            quoterAddress: '0xe6805638db944eA605e774e72c6F0D15Fb6a1347',
            liquidityManagerAddress: '0x611575eE1fbd4F7915D0eABCC518eD396fF78F0c',
            routingTokenAddresses: [
                '0x201eba5cc46d216ce6dc03f6a759e8e766e956ae',
                wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.MANTLE].address,
                '0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111',
                '0x09bc4e0d864854c6afb6eb9a9cdf58ac190d0df9',
                '0x60d01ec2d5e98ac51c8b4cf84dfcce98d527c747',
                '0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d' // iUSD
            ],
            multicallAddress: '0x1DADF066518E2b7064D85cED45625BFeC52ca07d',
            supportedFees: [10000, 3000, 500]
        };
    }
}
exports.IzumiMantleProvider = IzumiMantleProvider;
//# sourceMappingURL=izumi-mantle-provider.js.map