"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OdosOnChainParser = void 0;
const blockchain_id_1 = require("../../../../../../../core/blockchain/utils/blockchains-info/constants/blockchain-id");
const web3_pure_1 = require("../../../../../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../../../../../core/injector/injector");
const fake_wallet_address_1 = require("../../../../../../common/constants/fake-wallet-address");
const odos_api_consts_1 = require("../constants/odos-api-consts");
class OdosOnChainParser {
    static getBestRouteBody({ from, toToken, options, swappersBlacklist = [], swappersWhitelist = [] }) {
        const chainId = blockchain_id_1.blockchainId[from.blockchain];
        const userAddr = options.fromAddress ??
            injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(from.blockchain).address ??
            fake_wallet_address_1.FAKE_WALLET_ADDRESS;
        const inputTokens = [
            { tokenAddress: from.address, amount: web3_pure_1.Web3Pure.toWei(from.tokenAmount, from.decimals) }
        ];
        const outputTokens = [
            { proportion: 1, tokenAddress: toToken.address }
        ];
        return {
            inputTokens,
            outputTokens,
            chainId,
            userAddr,
            slippageLimitPercent: options.slippageTolerance * 100,
            sourceBlacklist: swappersBlacklist,
            sourceWhitelist: swappersWhitelist,
            likeAsset: true,
            referralCode: odos_api_consts_1.ODOS_REFERRAL_CODE
        };
    }
}
exports.OdosOnChainParser = OdosOnChainParser;
//# sourceMappingURL=odos-on-chain-parser.js.map