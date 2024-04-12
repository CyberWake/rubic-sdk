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
exports.TronWeb3Public = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../common/errors");
const native_tokens_1 = require("../../../../../common/tokens/constants/native-tokens");
const decorators_1 = require("../../../../../common/utils/decorators");
const p_timeout_1 = __importDefault(require("../../../../../common/utils/p-timeout"));
const healthcheck_1 = require("../../../constants/healthcheck");
const blockchain_name_1 = require("../../../models/blockchain-name");
const tx_status_1 = require("../models/tx-status");
const trc_20_contract_abi_1 = require("./constants/trc-20-contract-abi");
const tron_multicall_abi_1 = require("./constants/tron-multicall-abi");
const web3_public_1 = require("../web3-public");
const tron_web3_pure_1 = require("../../../web3-pure/typed-web3-pure/tron-web3-pure/tron-web3-pure");
class TronWeb3Public extends web3_public_1.Web3Public {
    constructor(tronWeb) {
        super(blockchain_name_1.BLOCKCHAIN_NAME.TRON);
        this.tronWeb = tronWeb;
        this.tokenContractAbi = trc_20_contract_abi_1.TRC20_CONTRACT_ABI;
    }
    setProvider(provider) {
        this.tronWeb.setProvider(provider);
    }
    async convertTronAddressToHex(address) {
        return this.tronWeb.address.toHex(address);
    }
    async healthCheck(timeoutMs = 4000) {
        if (!(0, healthcheck_1.isBlockchainHealthcheckAvailable)(this.blockchainName)) {
            return true;
        }
        const healthcheckData = healthcheck_1.HEALTHCHECK[this.blockchainName];
        this.tronWeb.setAddress(healthcheckData.contractAddress);
        const contract = await this.tronWeb.contract(healthcheckData.contractAbi, healthcheckData.contractAddress);
        try {
            const result = await (0, p_timeout_1.default)(contract[healthcheckData.method]().call(), timeoutMs);
            return result === healthcheckData.expected;
        }
        catch (e) {
            if (e instanceof errors_1.TimeoutError) {
                console.debug(`${this.blockchainName} node healthcheck timeout (${timeoutMs}ms) has occurred.`);
            }
            else {
                console.debug(`${this.blockchainName} node healthcheck fail: ${e}`);
            }
            return false;
        }
    }
    async getBalance(userAddress, tokenAddress) {
        let balance;
        if (tokenAddress && !tron_web3_pure_1.TronWeb3Pure.isNativeAddress(tokenAddress)) {
            balance = await this.getTokenBalance(userAddress, tokenAddress);
        }
        else {
            this.tronWeb.setAddress(userAddress);
            balance = await this.tronWeb.trx.getBalance(userAddress);
        }
        return new bignumber_js_1.default(balance);
    }
    async getTokenBalance(userAddress, tokenAddress) {
        this.tronWeb.setAddress(userAddress);
        const contract = await this.tronWeb.contract(this.tokenContractAbi, tokenAddress);
        const balance = await contract.balanceOf(userAddress).call();
        return new bignumber_js_1.default(balance?.toString());
    }
    async getAllowance(tokenAddress, ownerAddress, spenderAddress) {
        const contract = await this.tronWeb.contract(this.tokenContractAbi, tokenAddress);
        const allowance = await contract
            .allowance(ownerAddress, spenderAddress)
            .call();
        return new bignumber_js_1.default(allowance?.toString());
    }
    async multicallContractsMethods(contractAbi, contractsData) {
        const calls = contractsData.map(({ contractAddress, methodsData }) => {
            return methodsData.map(({ methodName, methodArguments }) => [
                contractAddress,
                tron_web3_pure_1.TronWeb3Pure.encodeFunctionCall(contractAbi, methodName, methodArguments)
            ]);
        });
        try {
            const outputs = await this.multicall(calls.flat());
            let outputIndex = 0;
            return contractsData.map(contractData => contractData.methodsData.map(methodData => {
                const success = outputs.results[outputIndex];
                const returnData = outputs.returnData[outputIndex];
                outputIndex++;
                const methodOutputAbi = contractAbi.find(funcSignature => funcSignature.name === methodData.methodName).outputs;
                return {
                    success,
                    output: success
                        ? tron_web3_pure_1.TronWeb3Pure.decodeMethodOutput(methodOutputAbi, returnData)
                        : null
                };
            }));
        }
        catch {
            return this.multicallContractsMethodsByOne(contractAbi, contractsData);
        }
    }
    /**
     * Executes multiple calls in the single contract call.
     * @param calls Multicall calls data list.
     * @returns Result of calls execution.
     */
    async multicall(calls) {
        this.tronWeb.setAddress(this.multicallAddress);
        const contract = await this.tronWeb.contract(tron_multicall_abi_1.TRON_MULTICALL_ABI, this.multicallAddress);
        return contract.aggregateViewCalls(calls).call();
    }
    async callContractMethod(contractAddress, contractAbi, methodName, methodArguments = []) {
        this.tronWeb.setAddress(contractAddress);
        const contract = await this.tronWeb.contract(contractAbi, contractAddress);
        const response = await contract[methodName](...methodArguments).call();
        return tron_web3_pure_1.TronWeb3Pure.flattenParameterToPrimitive(response);
    }
    /**
     * Gets mined transaction info.
     * @param hash Transaction hash.
     */
    async getTransactionInfo(hash) {
        return this.tronWeb.trx.getTransactionInfo(hash);
    }
    async getTransactionStatus(hash) {
        const txReceipt = await this.getTransactionInfo(hash);
        if (txReceipt?.receipt) {
            if (txReceipt.result === 'FAILED') {
                return tx_status_1.TX_STATUS.FAIL;
            }
            return tx_status_1.TX_STATUS.SUCCESS;
        }
        return tx_status_1.TX_STATUS.PENDING;
    }
    async getBlock() {
        return this.tronWeb.trx.getCurrentBlock();
    }
    async getBlockNumber() {
        return (await this.getBlock()).block_header.raw_data.number;
    }
    multicallContractsMethodsByOne(contractAbi, contractsData) {
        return Promise.all(contractsData.map(contractData => {
            return Promise.all(contractData.methodsData.map(async (methodData) => {
                try {
                    const output = (await this.callContractMethod(contractData.contractAddress, contractAbi, methodData.methodName, methodData.methodArguments));
                    return {
                        success: true,
                        output
                    };
                }
                catch {
                    return {
                        success: false,
                        output: null
                    };
                }
            }));
        }));
    }
    // @TODO Refactoring
    async getTokensBalances(userAddress, tokensAddresses) {
        const indexOfNativeCoin = tokensAddresses.findIndex(tron_web3_pure_1.TronWeb3Pure.isNativeAddress);
        const promises = [];
        if (indexOfNativeCoin !== -1) {
            tokensAddresses.splice(indexOfNativeCoin, 1);
            promises[1] = this.getBalance(userAddress);
        }
        promises[0] = this.multicallContractsMethods(this.tokenContractAbi, tokensAddresses.map(tokenAddress => ({
            contractAddress: tokenAddress,
            methodsData: [
                {
                    methodName: 'balanceOf',
                    methodArguments: [userAddress]
                }
            ]
        })));
        const results = await Promise.all(promises);
        const tokensBalances = results[0].map(tokenResults => {
            const { success, output } = tokenResults[0];
            return success ? new bignumber_js_1.default(output) : new bignumber_js_1.default(0);
        });
        if (indexOfNativeCoin !== -1) {
            tokensBalances.splice(indexOfNativeCoin, 0, results[1]);
        }
        return tokensBalances;
    }
    async callForTokensInfo(tokenAddresses, tokenFields = ['decimals', 'symbol', 'name']) {
        const nativeTokenIndex = tokenAddresses.findIndex(address => this.Web3Pure.isNativeAddress(address));
        const filteredTokenAddresses = tokenAddresses.filter((_, index) => index !== nativeTokenIndex);
        const contractsData = filteredTokenAddresses.map(contractAddress => ({
            contractAddress,
            methodsData: tokenFields.map(methodName => ({
                methodName,
                methodArguments: []
            }))
        }));
        const results = contractsData.length
            ? await this.multicallContractsMethods(this.tokenContractAbi, contractsData)
            : [];
        const tokens = results.map((tokenFieldsResults, tokenIndex) => {
            const tokenAddress = tokenAddresses[tokenIndex];
            return tokenFieldsResults.reduce((acc, field, fieldIndex) => {
                if (!field.success) {
                    throw new errors_1.RubicSdkError(`Cannot retrieve information about ${tokenAddress}`);
                }
                return {
                    ...acc,
                    [tokenFields[fieldIndex]]: field.success ? field.output : undefined
                };
            }, {});
        });
        if (nativeTokenIndex === -1) {
            return tokens;
        }
        const blockchainNativeToken = native_tokens_1.nativeTokensList[this.blockchainName];
        const nativeToken = {
            ...blockchainNativeToken,
            decimals: blockchainNativeToken.decimals.toString()
        };
        tokens.splice(nativeTokenIndex, 0, nativeToken);
        return tokens;
    }
}
exports.TronWeb3Public = TronWeb3Public;
__decorate([
    decorators_1.Cache
], TronWeb3Public.prototype, "callForTokensInfo", null);
//# sourceMappingURL=tron-web3-public.js.map