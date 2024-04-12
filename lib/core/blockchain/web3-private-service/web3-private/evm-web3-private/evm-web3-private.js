"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvmWeb3Private = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../common/errors");
const errors_2 = require("../../../../../common/utils/errors");
const options_1 = require("../../../../../common/utils/options");
const blockchains_info_1 = require("../../../utils/blockchains-info/blockchains-info");
const web3_private_1 = require("../web3-private");
const erc_20_token_abi_1 = require("../../../web3-public-service/web3-public/evm-web3-public/constants/erc-20-token-abi");
const evm_web3_pure_1 = require("../../../web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const proxy_hash_errors_1 = require("../../../../../features/cross-chain/calculation-manager/providers/common/constants/proxy-hash-errors");
class EvmWeb3Private extends web3_private_1.Web3Private {
    /**
     * Parses web3 error by its code or message.
     * @param err Web3 error to parse.
     */
    static parseError(err) {
        if (err.message.includes('Transaction has been reverted by the EVM')) {
            return new errors_1.TransactionRevertedError();
        }
        if (err.message.includes('execution reverted: UNIV3R: min return')) {
            return new errors_1.LowSlippageError();
        }
        if (err.message.includes('execution reverted: Address: low-level call with value failed') ||
            err.message.includes('Low native value')) {
            return new errors_1.InsufficientFundsGasPriceValueError();
        }
        if (err.message.includes('Failed to check for transaction receipt')) {
            return new errors_1.FailedToCheckForTransactionReceiptError();
        }
        if (err.code === -32603) {
            return new errors_1.LowGasError();
        }
        if (err.code === 4001) {
            return new errors_1.UserRejectError();
        }
        try {
            const error = EvmWeb3Private.tryParseProxyError(err);
            if (error) {
                return error;
            }
            if (err.message.includes('0x6c544f')) {
                return new errors_1.InsufficientFundsGasPriceValueError();
            }
            if (err.message.includes('0xf32bec2f') ||
                err.message.includes('execution reverted: Received amount of tokens are less then expected') ||
                err.message.includes('0x275c273c')) {
                return new errors_1.LowSlippageDeflationaryTokenError();
            }
            const errorMessage = JSON.parse(err.message.slice(24)).message;
            if (errorMessage) {
                return new Error(errorMessage);
            }
        }
        catch { }
        return (0, errors_2.parseError)(err);
    }
    static tryParseProxyError(err) {
        if ('data' in err) {
            const error = proxy_hash_errors_1.proxyHashErrors.find(error => error.hash === err.data);
            if (error) {
                return new errors_1.RubicSdkError(error.text);
            }
        }
        return undefined;
    }
    constructor(walletProviderCore) {
        super(walletProviderCore.address);
        this.Web3Pure = evm_web3_pure_1.EvmWeb3Pure;
        this.web3 = walletProviderCore.core;
        this.checkAddressCorrect();
    }
    async getBlockchainName() {
        const userChainId = await this.web3.eth.getChainId();
        return blockchains_info_1.BlockchainsInfo.getBlockchainNameById(userChainId);
    }
    /**
     * Sends Eth in transaction and resolve the promise when the transaction is included in the block.
     * @param toAddress Eth receiver address.
     * @param [options] Additional options.
     * @returns Transaction receipt.
     */
    async sendTransaction(toAddress, options = {}) {
        return new Promise((resolve, reject) => {
            this.web3.eth
                .sendTransaction({
                from: this.address,
                to: toAddress,
                value: web3_private_1.Web3Private.stringifyAmount(options.value || 0),
                ...(options.gas && { gas: web3_private_1.Web3Private.stringifyAmount(options.gas) }),
                ...(0, options_1.getGasOptions)(options),
                ...(options.data && { data: options.data })
            })
                .on('transactionHash', options.onTransactionHash || (() => { }))
                .on('receipt', receipt => resolve(receipt))
                .on('error', err => {
                console.error(`Send transaction error. ${err}`);
                reject(EvmWeb3Private.parseError(err));
            });
        });
    }
    /**
     * Tries to send Eth in transaction and resolve the promise when the transaction is included in the block or rejects the error.
     * @param toAddress Eth receiver address.
     * @param [options] Additional options.
     * @returns Transaction receipt.
     */
    async trySendTransaction(toAddress, options = {}) {
        try {
            const gaslessParams = {
                from: this.address,
                to: toAddress,
                value: web3_private_1.Web3Private.stringifyAmount(options.value || 0),
                ...(options.data && { data: options.data })
            };
            const gas = await this.web3.eth.estimateGas(gaslessParams);
            const gasfulParams = {
                ...gaslessParams,
                ...(0, options_1.getGasOptions)(options),
                gas: web3_private_1.Web3Private.stringifyAmount(gas, 1.05)
            };
            try {
                await this.web3.eth.estimateGas(gasfulParams);
            }
            catch {
                throw new errors_1.RubicSdkError('Low native value');
            }
            const sendParams = {
                ...options,
                ...gasfulParams
            };
            return this.sendTransaction(toAddress, sendParams);
        }
        catch (err) {
            console.debug('Call tokens transfer error', err);
            const shouldIgnore = this.shouldIgnoreError(err);
            if (shouldIgnore) {
                return this.sendTransaction(toAddress, options);
            }
            throw EvmWeb3Private.parseError(err);
        }
    }
    /**
     * Executes method of smart-contract and resolve the promise when the transaction is included in the block.
     * @param contractAddress Address of smart-contract which method is to be executed.
     * @param contractAbi Abi of smart-contract which method is to be executed.
     * @param methodName Method name to execute.
     * @param methodArguments Method arguments.
     * @param [options] Additional options.
     * @returns Smart-contract method returned value.
     */
    async executeContractMethod(contractAddress, contractAbi, methodName, methodArguments, options = {}) {
        const contract = new this.web3.eth.Contract(contractAbi, contractAddress);
        return new Promise((resolve, reject) => {
            contract.methods[methodName](...methodArguments)
                .send({
                from: this.address,
                ...(options.value && {
                    value: web3_private_1.Web3Private.stringifyAmount(options.value)
                }),
                ...(options.gas && {
                    gas: web3_private_1.Web3Private.stringifyAmount(options.gas)
                }),
                ...(0, options_1.getGasOptions)(options)
            })
                .on('transactionHash', options.onTransactionHash || (() => { }))
                .on('receipt', resolve)
                .on('error', (err) => {
                console.error(`Method execution error. ${err}`);
                reject(EvmWeb3Private.parseError(err));
            });
        });
    }
    /**
     * Tries to execute method of smart-contract and resolve the promise when the transaction is included in the block or rejects the error.
     * @param contractAddress Address of smart-contract which method is to be executed.
     * @param contractAbi Abi of smart-contract which method is to be executed.
     * @param methodName Method name to execute.
     * @param methodArguments Method arguments.
     * @param [options] Additional options.
     * @param allowError Check error and decides to execute contact if error is allowed.
     */
    async tryExecuteContractMethod(contractAddress, contractAbi, methodName, methodArguments, options = {}, allowError) {
        const contract = new this.web3.eth.Contract(contractAbi, contractAddress);
        try {
            const gaslessParams = {
                from: this.address,
                ...(options.value && { value: web3_private_1.Web3Private.stringifyAmount(options.value) })
            };
            const gas = await contract.methods[methodName](...methodArguments).estimateGas(gaslessParams);
            const gasfulParams = {
                ...gaslessParams,
                ...(0, options_1.getGasOptions)(options),
                gas: web3_private_1.Web3Private.stringifyAmount(gas, 1.05)
            };
            try {
                await contract.methods[methodName](...methodArguments).estimateGas(gasfulParams);
            }
            catch {
                throw new errors_1.RubicSdkError('Low native value');
            }
            const sendParams = {
                ...options,
                ...gasfulParams
            };
            return this.executeContractMethod(contractAddress, contractAbi, methodName, methodArguments, sendParams);
        }
        catch (err) {
            if ((allowError && allowError(err)) || this.shouldIgnoreError(err)) {
                return this.executeContractMethod(contractAddress, contractAbi, methodName, methodArguments, options);
            }
            console.error('Method execution error: ', err);
            throw EvmWeb3Private.parseError(err);
        }
    }
    shouldIgnoreError(error) {
        const ignoreCallErrors = [
            'STF',
            'execution reverted: ERC20: transfer amount exceeds allowance',
            'Anyswaperc20: request exceed allowance',
            'gas required exceeds allowance',
            'execution reverted: SafeERC20: low-level call failed'
        ];
        const test = ignoreCallErrors.some(err => error?.message?.toLowerCase().includes(err.toLowerCase()));
        console.debug(test);
        return test;
    }
    /**
     * Executes approve method in ERC-20 token contract.
     * @param tokenAddress Address of the smart-contract corresponding to the token.
     * @param spenderAddress Wallet or contract address to approve.
     * @param amount Token amount to approve in wei.
     * @param [options] Additional options.
     * @returns Approval transaction receipt.
     */
    async approveTokens(tokenAddress, spenderAddress, amount = 'infinity', options = {}) {
        const contract = new this.web3.eth.Contract(erc_20_token_abi_1.ERC20_TOKEN_ABI, tokenAddress);
        const rawValue = amount === 'infinity' ? new bignumber_js_1.default(2).pow(256).minus(1) : amount;
        const gaslessParams = { from: this.address };
        const gas = await contract.methods
            .approve(spenderAddress, rawValue.toFixed(0))
            .estimateGas(gaslessParams);
        const gasfullParams = {
            ...gaslessParams,
            ...(0, options_1.getGasOptions)(options),
            gas: web3_private_1.Web3Private.stringifyAmount(gas, 1)
        };
        await contract.methods
            .approve(spenderAddress, rawValue.toFixed(0))
            .estimateGas(gasfullParams);
        return new Promise((resolve, reject) => {
            contract.methods
                .approve(spenderAddress, rawValue.toFixed(0))
                .send(gasfullParams)
                .on('transactionHash', options.onTransactionHash || (() => { }))
                .on('receipt', resolve)
                .on('error', (err) => {
                console.error(`Tokens approve error. ${err}`);
                reject(EvmWeb3Private.parseError(err));
            });
        });
    }
    /**
     * Build encoded approve transaction config.
     * @param tokenAddress Address of the smart-contract corresponding to the token.
     * @param spenderAddress Wallet or contract address to approve.
     * @param value Amount of tokens in approval window in spending cap field
     * @param [options] Additional options.
     * @returns Encoded approve transaction config.
     */
    async encodeApprove(tokenAddress, spenderAddress, value, options = {}) {
        const rawValue = value === 'infinity' ? new bignumber_js_1.default(2).pow(256).minus(1) : value;
        const contract = new this.web3.eth.Contract(erc_20_token_abi_1.ERC20_TOKEN_ABI, tokenAddress);
        const gaslessParams = { from: this.address };
        const gas = await contract.methods
            .approve(spenderAddress, rawValue.toFixed(0))
            .estimateGas(gaslessParams);
        const gasfullParams = {
            ...gaslessParams,
            ...(0, options_1.getGasOptions)(options),
            gas: web3_private_1.Web3Private.stringifyAmount(gas)
        };
        await contract.methods
            .approve(spenderAddress, rawValue.toFixed(0))
            .estimateGas(gasfullParams);
        return evm_web3_pure_1.EvmWeb3Pure.encodeMethodCall(tokenAddress, erc_20_token_abi_1.ERC20_TOKEN_ABI, 'approve', [spenderAddress, rawValue.toFixed(0)], undefined, gasfullParams);
    }
}
exports.EvmWeb3Private = EvmWeb3Private;
//# sourceMappingURL=evm-web3-private.js.map