"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnChainProxyService = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const tokens_1 = require("../../../../../../common/tokens");
const native_tokens_1 = require("../../../../../../common/tokens/constants/native-tokens");
const decorators_1 = require("../../../../../../common/utils/decorators");
const evm_web3_pure_1 = require("../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const injector_1 = require("../../../../../../core/injector/injector");
const proxy_supported_blockchain_1 = require("../../../../../common/constants/proxy-supported-blockchain");
const rubic_proxy_contract_address_1 = require("../../../../../cross-chain/calculation-manager/providers/common/constants/rubic-proxy-contract-address");
const evm_common_cross_chain_abi_1 = require("../../../../../cross-chain/calculation-manager/providers/common/emv-cross-chain-trade/constants/evm-common-cross-chain-abi");
class OnChainProxyService {
    static isSupportedBlockchain(blockchain) {
        return proxy_supported_blockchain_1.proxySupportedBlockchains.some(supportedBlockchain => supportedBlockchain === blockchain);
    }
    async getFeeInfo(from, providerAddress) {
        const fromBlockchain = from.blockchain;
        const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
        const contractAddress = rubic_proxy_contract_address_1.rubicProxyContractAddress[fromBlockchain].router;
        let fixedCryptoFeeWei;
        let platformFeePercent;
        let isIntegrator = true;
        if (providerAddress !== evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS) {
            const fee = await OnChainProxyService.handleIntegratorFee(web3Public, contractAddress, providerAddress);
            isIntegrator = fee.isIntegrator;
            fixedCryptoFeeWei = fee.fixedCryptoFeeWei;
            platformFeePercent = fee.platformFeePercent;
        }
        if (fixedCryptoFeeWei === undefined || !isIntegrator) {
            const fee = await OnChainProxyService.handleRubicFee(web3Public, contractAddress);
            fixedCryptoFeeWei = fee.fixedCryptoFeeWei;
            platformFeePercent = fee.platformFeePercent;
        }
        const fixedFeeToken = await tokens_1.PriceTokenAmount.createFromToken({
            ...native_tokens_1.nativeTokensList[fromBlockchain],
            weiAmount: new bignumber_js_1.default(fixedCryptoFeeWei)
        });
        const platformFee = {
            percent: platformFeePercent,
            token: await tokens_1.PriceTokenAmount.createFromToken({
                ...from,
                tokenAmount: from.tokenAmount.multipliedBy(platformFeePercent / 100)
            })
        };
        return {
            fixedFeeToken,
            platformFee
        };
    }
    static async handleIntegratorFee(web3Public, contractAddress, providerAddress) {
        const integratorToFeeInfo = await web3Public.callContractMethod(contractAddress, evm_common_cross_chain_abi_1.evmCommonCrossChainAbi, 'integratorToFeeInfo', [providerAddress]);
        return {
            fixedCryptoFeeWei: integratorToFeeInfo.fixedFeeAmount,
            platformFeePercent: parseInt(integratorToFeeInfo.tokenFee) / 10000,
            isIntegrator: integratorToFeeInfo.isIntegrator
        };
    }
    static async handleRubicFee(web3Public, contractAddress) {
        const feeInfo = await Promise.all([
            web3Public.callContractMethod(contractAddress, evm_common_cross_chain_abi_1.evmCommonCrossChainAbi, 'fixedNativeFee', []),
            web3Public.callContractMethod(contractAddress, evm_common_cross_chain_abi_1.evmCommonCrossChainAbi, 'RubicPlatformFee', [])
        ]);
        return {
            fixedCryptoFeeWei: feeInfo[0],
            platformFeePercent: parseInt(feeInfo[1]) / 10000
        };
    }
}
exports.OnChainProxyService = OnChainProxyService;
__decorate([
    (0, decorators_1.Cache)({
        maxAge: 15000
    })
], OnChainProxyService.prototype, "getFeeInfo", null);
//# sourceMappingURL=on-chain-proxy-service.js.map