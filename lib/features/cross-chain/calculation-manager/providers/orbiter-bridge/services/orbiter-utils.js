"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrbiterUtils = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../common/errors");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const blockchain_id_1 = require("../../../../../../core/blockchain/utils/blockchains-info/constants/blockchain-id");
const web3_pure_1 = require("../../../../../../core/blockchain/web3-pure/web3-pure");
const web3_1 = __importDefault(require("web3"));
const orbiter_api_1 = require("../constants/orbiter-api");
class OrbiterUtils {
    static compareChainId(orbiterChainId, blockchainName) {
        if (blockchainName === blockchain_name_1.BLOCKCHAIN_NAME.STARKNET) {
            return orbiterChainId === 'SN_MAIN';
        }
        return orbiterChainId === blockchain_id_1.blockchainId[blockchainName].toString();
    }
    static getQuoteConfig({ configs, from, to }) {
        const config = configs.find(conf => {
            return (this.compareChainId(conf.srcChain, from.blockchain) &&
                this.compareChainId(conf.tgtChain, to.blockchain) &&
                conf.srcToken.toLowerCase() === from.address.toLowerCase() &&
                conf.tgtToken.toLowerCase() === to.address.toLowerCase());
        });
        if (!config) {
            throw new errors_1.RubicSdkError('[ORBITER] Unsupported pair of tokens!');
        }
        return config;
    }
    static isAmountCorrect(fromAmount, config) {
        return fromAmount.lt(config.maxAmt) && fromAmount.gt(config.minAmt);
    }
    /**
     *
     * @param code Orbiter identification code of chain(9001, 9002 etc), equals quoteConfig.vc
     * @param receiverAddress
     * @returns data argument for orbiter-abi methods as hex string
     */
    static getHexDataArg(code, receiverAddress) {
        const value = `c=${code}&t=${receiverAddress}`;
        const hexString = web3_1.default.utils.toHex(value);
        return hexString;
    }
    static getTradingFee(from, config) {
        const digit = from.decimals === 18 ? 8 : 5;
        const extraRatio = 50;
        const tradingFee = from.tokenAmount
            .multipliedBy(config.tradeFee)
            .plus(extraRatio)
            .dividedBy(orbiter_api_1.ORBITER_FEE_DIVIDER)
            .decimalPlaces(digit, bignumber_js_1.default.ROUND_UP);
        return tradingFee;
    }
    static getTransferAmount(from, config) {
        const tradingFee = this.getTradingFee(from, config);
        const amountMinusTradingFee = from.tokenAmount.minus(tradingFee);
        const weiAmount = web3_pure_1.Web3Pure.toWei(amountMinusTradingFee, from.decimals);
        const pureVC = config.vc.replace(/^0+/g, '');
        const total = weiAmount.replace(/\d{4}$/g, pureVC);
        return total;
    }
}
exports.OrbiterUtils = OrbiterUtils;
//# sourceMappingURL=orbiter-utils.js.map