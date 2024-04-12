"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3Public = void 0;
const errors_1 = require("../../../../common/errors");
const decorators_1 = require("../../../../common/utils/decorators");
const blockchains_info_1 = require("../../utils/blockchains-info/blockchains-info");
const multicall_addresses_1 = require("./constants/multicall-addresses");
const web3_pure_1 = require("../../web3-pure/web3-pure");
/**
 * Class containing methods for calling contracts in order to obtain information from the blockchain.
 * To send transaction or execute contract method use {@link Web3Private}.
 */
class Web3Public {
    constructor(blockchainName) {
        this.blockchainName = blockchainName;
        this.multicallAddress = multicall_addresses_1.MULTICALL_ADDRESSES[this.blockchainName];
        this.Web3Pure = web3_pure_1.Web3Pure[blockchains_info_1.BlockchainsInfo.getChainType(this.blockchainName)];
    }
    /**
     * Checks that user has enough balance.
     * @param userAddress Wallet address, which contains tokens.
     * @param token Token to check balance of.
     * @param requiredAmount Required user balance in Eth units.
     */
    async checkBalance(token, requiredAmount, userAddress) {
        const balanceWei = await this.getBalance(userAddress, token.address);
        const balance = web3_pure_1.Web3Pure.fromWei(balanceWei, token.decimals);
        if (balance.lt(requiredAmount)) {
            throw new errors_1.InsufficientFundsError(token, balance, requiredAmount);
        }
    }
    /**
     * Gets token info by address.
     * @param tokenAddress Address of token.
     * @param tokenFields Token's fields to get.
     */
    async callForTokenInfo(tokenAddress, tokenFields = ['decimals', 'symbol', 'name']) {
        return (await this.callForTokensInfo([tokenAddress], tokenFields))[0];
    }
    /**
     * Uses multicall to make several calls of one method in one contract.
     * @param contractAddress Target contract address.
     * @param contractAbi Target contract abi.
     * @param methodName Method name.
     * @param methodCallsArguments Method parameters array, for each method call.
     */
    async multicallContractMethod(contractAddress, contractAbi, methodName, methodCallsArguments) {
        return this.multicallContractMethods(contractAddress, contractAbi, methodCallsArguments.map(methodArguments => ({
            methodName,
            methodArguments
        })));
    }
    /**
     * Uses multicall to make several methods calls in one contract.
     * @param contractAddress Target contract address.
     * @param contractAbi Target contract abi.
     * @param methodsData Methods data, containing methods' names and arguments.
     */
    async multicallContractMethods(contractAddress, contractAbi, methodsData) {
        const results = await this.multicallContractsMethods(contractAbi, [
            {
                contractAddress,
                methodsData
            }
        ]);
        if (!results?.[0]) {
            throw new errors_1.RubicSdkError('Cant perform multicall or request data is empty');
        }
        return results[0];
    }
}
exports.Web3Public = Web3Public;
__decorate([
    decorators_1.Cache
], Web3Public.prototype, "callForTokenInfo", null);
//# sourceMappingURL=web3-public.js.map