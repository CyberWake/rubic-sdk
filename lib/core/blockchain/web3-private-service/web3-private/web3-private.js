"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3Private = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../common/errors");
/**
 * Class containing methods for executing the functions of contracts
 * and sending transactions in order to change the state of the blockchain.
 * To get information from the blockchain use {@link Web3Public}.
 */
class Web3Private {
    /**
     * Converts number, string or BigNumber value to integer string.
     * @param amount Value to convert.
     * @param multiplier Amount multiplier.
     */
    static stringifyAmount(amount, multiplier = 1) {
        const bnAmount = new bignumber_js_1.default(amount);
        if (!bnAmount.isInteger()) {
            throw new errors_1.RubicSdkError(`Value ${amount} is not integer`);
        }
        return bnAmount.multipliedBy(multiplier).toFixed(0);
    }
    /**
     * @param address Current wallet provider address.
     */
    constructor(address) {
        this.address = address;
    }
    setAddress(address) {
        this.address = address;
        this.checkAddressCorrect();
    }
    checkAddressCorrect() {
        if (!this.Web3Pure.isAddressCorrect(this.address)) {
            throw new errors_1.InvalidAddressError(this.address);
        }
    }
    /**
     * Checks, that selected blockchain in wallet is equal to passed blockchain.
     */
    async checkBlockchainCorrect(blockchainName) {
        const userBlockchainName = await this.getBlockchainName();
        if (userBlockchainName !== blockchainName) {
            throw new errors_1.WrongNetworkError(blockchainName);
        }
    }
}
exports.Web3Private = Web3Private;
//# sourceMappingURL=web3-private.js.map