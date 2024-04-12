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
exports.EvmWeb3Public = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../common/errors");
const native_tokens_1 = require("../../../../../common/tokens/constants/native-tokens");
const decorators_1 = require("../../../../../common/utils/decorators");
const p_timeout_1 = __importDefault(require("../../../../../common/utils/p-timeout"));
const healthcheck_1 = require("../../../constants/healthcheck");
const blockchain_name_1 = require("../../../models/blockchain-name");
const web3_private_1 = require("../../../web3-private-service/web3-private/web3-private");
const erc_20_token_abi_1 = require("./constants/erc-20-token-abi");
const evm_multicall_abi_1 = require("./constants/evm-multicall-abi");
const tx_status_1 = require("../models/tx-status");
const web3_public_1 = require("../web3-public");
const evm_web3_pure_1 = require("../../../web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const default_http_client_1 = require("../../../../http-client/default-http-client");
/**
 * Class containing methods for calling contracts in order to obtain information from the blockchain.
 * To send transaction or execute contract method use {@link Web3Private}.
 */
class EvmWeb3Public extends web3_public_1.Web3Public {
    get web3Provider() {
        return this.web3;
    }
    constructor(web3, blockchainName, httpClient) {
        super(blockchainName);
        this.web3 = web3;
        this.httpClient = httpClient;
        this.tokenContractAbi = erc_20_token_abi_1.ERC20_TOKEN_ABI;
    }
    setProvider(provider) {
        this.web3.setProvider(provider);
    }
    async healthCheck(timeoutMs = 4000) {
        if (!(0, healthcheck_1.isBlockchainHealthcheckAvailable)(this.blockchainName)) {
            return true;
        }
        const healthcheckData = healthcheck_1.HEALTHCHECK[this.blockchainName];
        const contract = new this.web3.eth.Contract(healthcheckData.contractAbi, healthcheckData.contractAddress);
        try {
            const result = await (0, p_timeout_1.default)(contract.methods[healthcheckData.method]().call(), timeoutMs);
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
        const isToken = tokenAddress && !evm_web3_pure_1.EvmWeb3Pure.isNativeAddress(tokenAddress);
        const balance = isToken
            ? await this.getTokenBalance(userAddress, tokenAddress)
            : await this.web3.eth.getBalance(userAddress);
        return new bignumber_js_1.default(balance);
    }
    async getTokenBalance(userAddress, tokenAddress) {
        const contract = new this.web3.eth.Contract(this.tokenContractAbi, tokenAddress);
        const balance = await contract.methods.balanceOf(userAddress).call();
        return new bignumber_js_1.default(balance);
    }
    async getAllowance(tokenAddress, ownerAddress, spenderAddress) {
        try {
            const contract = new this.web3.eth.Contract(this.tokenContractAbi, tokenAddress);
            const allowance = await contract.methods.allowance(ownerAddress, spenderAddress).call();
            return new bignumber_js_1.default(allowance);
        }
        catch (err) {
            console.error(err);
            return new bignumber_js_1.default(0);
        }
    }
    async multicallContractsMethods(contractAbi, contractsData) {
        if (this.multicallAddress) {
            try {
                const calls = contractsData.map(({ contractAddress, methodsData }) => {
                    const contract = new this.web3.eth.Contract(contractAbi, contractAddress);
                    return methodsData.map(({ methodName, methodArguments }) => ({
                        callData: contract.methods[methodName](...methodArguments).encodeABI(),
                        target: contractAddress
                    }));
                });
                const outputs = await this.multicall(calls.flat());
                let outputIndex = 0;
                return contractsData.map(contractData => contractData.methodsData.map(methodData => {
                    const methodOutputAbi = contractAbi.find(funcSignature => funcSignature.name === methodData.methodName).outputs;
                    const output = outputs[outputIndex];
                    if (!output) {
                        throw new errors_1.RubicSdkError('Output has to be defined');
                    }
                    outputIndex++;
                    return {
                        success: output.success,
                        output: output.success && output.returnData.length > 2
                            ? this.web3.eth.abi.decodeParameters(methodOutputAbi, output.returnData)[0]
                            : null
                    };
                }));
            }
            catch (err) {
                if (this.allowMultipleRequests(err)) {
                    return this.multicallContractsMethodsByOne(contractAbi, contractsData);
                }
                throw err;
            }
        }
        return this.multicallContractsMethodsByOne(contractAbi, contractsData);
    }
    allowMultipleRequests(err) {
        return ((err instanceof Error && err.message.includes('unsigned transaction')) ||
            this.blockchainName === blockchain_name_1.BLOCKCHAIN_NAME.ZETACHAIN);
    }
    /**
     * Executes multiple calls in the single contract call.
     * @param calls Multicall calls data list.
     * @returns Result of calls execution.
     */
    async multicall(calls) {
        const contract = new this.web3.eth.Contract(evm_multicall_abi_1.EVM_MULTICALL_ABI, this.multicallAddress);
        return contract.methods.tryAggregate(false, calls).call();
    }
    multicallContractsMethodsByOne(contractAbi, contractsData) {
        return Promise.all(contractsData.map(contractData => {
            const contract = new this.web3.eth.Contract(contractAbi, contractData.contractAddress);
            return Promise.all(contractData.methodsData.map(async (methodData) => {
                try {
                    const output = (await contract.methods[methodData.methodName](...methodData.methodArguments).call());
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
    async callContractMethod(contractAddress, contractAbi, methodName, methodArguments = [], options = {}) {
        const contract = new this.web3.eth.Contract(contractAbi, contractAddress);
        const callableContract = contract.methods[methodName](...methodArguments);
        return callableContract.call({
            ...(options.from && { from: options.from }),
            ...(options.value && { value: options.value }),
            ...(options.gasPrice && { value: options.gasPrice }),
            ...(options.gas && { value: options.gas })
        });
    }
    /**
     * Predicts the volume of gas required to execute the contract method.
     * @param contractAbi Abi of smart-contract.
     * @param contractAddress Address of smart-contract.
     * @param methodName Method which execution gas limit is to be calculated.
     * @param methodArguments Arguments of the contract method.
     * @param fromAddress The address for which the gas calculation will be called.
     * @param value The value transferred for the call “transaction” in wei.
     * @returns Estimated gas limit.
     */
    async getEstimatedGas(contractAbi, contractAddress, methodName, methodArguments, fromAddress, value) {
        const contract = new this.web3.eth.Contract(contractAbi, contractAddress);
        try {
            const gasLimit = await contract.methods[methodName](...methodArguments).estimateGas({
                from: fromAddress,
                ...(value && { value })
            });
            return new bignumber_js_1.default(gasLimit);
        }
        catch (err) {
            console.debug(err);
            return null;
        }
    }
    async getEstimatedGasByData(fromAddress, toAddress, options) {
        try {
            const gasLimit = await this.web3.eth.estimateGas({
                from: fromAddress,
                to: toAddress,
                value: web3_private_1.Web3Private.stringifyAmount(options.value || 0),
                ...(options.gas && { gas: web3_private_1.Web3Private.stringifyAmount(options.gas) }),
                ...(options.data && { data: options.data })
            });
            return new bignumber_js_1.default(gasLimit);
        }
        catch (err) {
            console.debug(err);
            return null;
        }
    }
    /**
     * Get estimated gas of several contract method executions via rpc batch request.
     * @param fromAddress Sender address.
     * @param callsData Transactions parameters.
     * @returns List of contract execution estimated gases.
     * If the execution of the method in the real blockchain would not be reverted,
     * then the list item would be equal to the predicted gas limit.
     * Else (if you have not enough balance, allowance ...) then the list item would be equal to null.
     */
    async batchEstimatedGas(fromAddress, callsData) {
        try {
            const rpcCallsData = callsData.map(callData => ({
                rpcMethod: 'eth_estimateGas',
                params: {
                    from: fromAddress,
                    to: callData.to,
                    data: callData.data,
                    ...(callData.value && {
                        value: `0x${parseInt(callData.value).toString(16)}`
                    })
                }
            }));
            const result = await this.rpcBatchRequest(rpcCallsData);
            return result.map(value => (value ? new bignumber_js_1.default(value) : null));
        }
        catch (e) {
            console.error(e);
            return callsData.map(() => null);
        }
    }
    /**
     * Sends batch request to rpc provider directly.
     * @see {@link https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/ethereum/eth1.0-apis/assembled-spec/openrpc.json&uiSchema%5BappBar%5D%5Bui:splitView%5D=false&uiSchema%5BappBar%5D%5Bui:input%5D=false&uiSchema%5BappBar%5D%5Bui:examplesDropdown%5D=false|EthereumJSON-RPC}
     * @param rpcCallsData Rpc methods and parameters list.
     * @returns Rpc batch request call result sorted in order of input parameters.
     */
    async rpcBatchRequest(rpcCallsData) {
        const seed = Date.now();
        const batch = rpcCallsData.map((callData, index) => ({
            id: seed + index,
            jsonrpc: '2.0',
            method: callData.rpcMethod,
            params: [{ ...callData.params }]
        }));
        const httpClient = await this.getHttpClient();
        const response = await httpClient.post(this.web3.currentProvider.host, batch);
        return response.sort((a, b) => a.id - b.id).map(item => (item.error ? null : item.result));
    }
    /**
     * Returns httpClient if it exists or imports the axios client.
     */
    async getHttpClient() {
        if (!this.httpClient) {
            this.httpClient = await default_http_client_1.DefaultHttpClient.getInstance();
        }
        return this.httpClient;
    }
    /**
     * Gets mined transaction receipt.
     * @param hash Transaction hash
     */
    async getTransactionReceipt(hash) {
        return this.web3.eth.getTransactionReceipt(hash);
    }
    async getTransactionStatus(hash) {
        const txReceipt = await this.getTransactionReceipt(hash);
        if (txReceipt === null) {
            return tx_status_1.TX_STATUS.PENDING;
        }
        if (txReceipt.status) {
            return tx_status_1.TX_STATUS.SUCCESS;
        }
        return tx_status_1.TX_STATUS.FAIL;
    }
    /**
     * Calculates the average price per unit of gas according to web3.
     * @returns Average gas price in wei.
     */
    async getGasPrice() {
        return this.web3.eth.getGasPrice();
    }
    /**
     * Estimates average maxPriorityFeePerGas for EIP-1559 transactions based on last 20 blocks.
     * @see {@link https://docs.alchemy.com/docs/how-to-build-a-gas-fee-estimator-using-eip-1559}
     * @returns Average maxPriorityFeePerGas in wei
     */
    async getMaxPriorityFeePerGas() {
        const HISTORICAL_BLOCKS = 20;
        const feeHistory = await this.web3.eth.getFeeHistory(HISTORICAL_BLOCKS, 'pending', [50]);
        const blocks = feeHistory.reward.map(x => x.map(reward => Number(reward)));
        const rewardSum = blocks
            .map(x => x[0])
            .reduce((acc, v) => acc + (v || 0), 0);
        return Math.round(rewardSum / blocks.length);
    }
    /**
     * Calculates EIP-1559 specific gas details.
     * @see {@link https://github.com/ethers-io/ethers.js/blob/master/packages/abstract-provider/src.ts/index.ts#L235}
     * @returns block baseFee, average maxPriorityFeePerGas, and maxFeePerGas.
     */
    async getPriorityFeeGas() {
        const block = await this.getBlock('latest');
        let lastBaseFeePerGas = null;
        let maxFeePerGas = null;
        let maxPriorityFeePerGas = null;
        if (block && block.baseFeePerGas) {
            try {
                lastBaseFeePerGas = this.getBaseFee(block);
                maxPriorityFeePerGas = await this.getMaxPriorityFeePerGas();
                maxFeePerGas = block.baseFeePerGas * 2 + maxPriorityFeePerGas;
            }
            catch (err) {
                console.debug(err);
            }
        }
        return {
            baseFee: lastBaseFeePerGas?.toFixed(),
            maxFeePerGas: maxFeePerGas?.toFixed(),
            maxPriorityFeePerGas: maxPriorityFeePerGas?.toFixed()
        };
    }
    /**
     * Calculates base fee for a given block, based on EIP-1559 base fee formula
     * @see {@link https://eips.ethereum.org/EIPS/eip-1559}
     * @param block Block details
     * @returns Base fee for a given block
     */
    getBaseFee(block) {
        if (!block.baseFeePerGas)
            return null;
        const BASE_FEE_MAX_CHANGE_DENOMINATOR = 8;
        const parentGasUsed = block.gasUsed;
        const parentGasTarget = block.gasLimit;
        const parentBaseFeePerGas = block.baseFeePerGas;
        let lastBaseFeePerGas = null;
        if (parentGasUsed === parentGasTarget) {
            lastBaseFeePerGas = block.baseFeePerGas;
        }
        else if (parentGasUsed > parentGasTarget) {
            const gasUsedDelta = parentGasUsed - parentGasTarget;
            const baseFeePerGasDelta = Math.max((parentBaseFeePerGas * gasUsedDelta) /
                parentGasTarget /
                BASE_FEE_MAX_CHANGE_DENOMINATOR, 1);
            lastBaseFeePerGas = parentBaseFeePerGas + baseFeePerGasDelta;
        }
        else {
            const gasUsedDelta = parentGasTarget - parentGasUsed;
            const baseFeePerGasDelta = (parentBaseFeePerGas * gasUsedDelta) /
                parentGasTarget /
                BASE_FEE_MAX_CHANGE_DENOMINATOR;
            lastBaseFeePerGas = parentBaseFeePerGas - baseFeePerGasDelta;
        }
        return lastBaseFeePerGas;
    }
    /**
     * Gets block by block id.
     * @param [blockId] Block id: hash, number ... Default is 'latest'.
     * @returns Block by blockId parameter.
     */
    getBlock(blockId = 'latest') {
        return this.web3.eth.getBlock(blockId);
    }
    async getBlockNumber() {
        return this.web3.eth.getBlockNumber();
    }
    async getPastEvents(contractAddress, contractAbi, eventName, options) {
        const contract = new this.web3.eth.Contract(contractAbi, contractAddress);
        const blockNumber = options.toBlock === 'latest' ? await this.getBlockNumber() : options.toBlock;
        return contract.getPastEvents(eventName, {
            fromBlock: blockNumber - options.blocksAmount,
            toBlock: blockNumber
        });
    }
    /**
     * Will call smart contract method in the EVM without sending any transaction.
     * @param contractAddress Contract address.
     * @param contractAbi Contract ABI.
     * @param methodName Method name.
     * @param methodArguments Method arguments.
     * @param options Sender address and value.
     * @returns Transaction receipt.
     */
    async staticCallContractMethod(contractAddress, contractAbi, methodName, methodArguments, options) {
        const contract = new this.web3.eth.Contract(contractAbi, contractAddress);
        return new Promise((resolve, reject) => {
            contract.methods[methodName](...methodArguments).call({
                from: options?.from,
                ...(options?.value && { value: options.value })
            }, (error, result) => {
                if (result) {
                    resolve(result);
                }
                if (error) {
                    reject(error);
                }
            });
        });
    }
    async getTokensBalances(userAddress, tokensAddresses) {
        const indexOfNativeCoin = tokensAddresses.findIndex(evm_web3_pure_1.EvmWeb3Pure.isNativeAddress);
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
exports.EvmWeb3Public = EvmWeb3Public;
__decorate([
    decorators_1.Cache
], EvmWeb3Public.prototype, "callForTokensInfo", null);
//# sourceMappingURL=evm-web3-public.js.map