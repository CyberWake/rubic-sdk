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
exports.SolanaWeb3Public = void 0;
const web3_js_1 = require("@solana/web3.js");
const utl_sdk_1 = require("@solflare-wallet/utl-sdk");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const rxjs_1 = require("rxjs");
const native_tokens_1 = require("../../../../../common/tokens/constants/native-tokens");
const decorators_1 = require("../../../../../common/utils/decorators");
const native_solana_mint_address_1 = require("../../../constants/solana/native-solana-mint-address");
const blockchain_name_1 = require("../../../models/blockchain-name");
const tx_status_1 = require("../models/tx-status");
const web3_public_1 = require("../web3-public");
const solana_web3_pure_1 = require("../../../web3-pure/typed-web3-pure/non-evm-web3-pure/solana-web3-pure");
/**
 * Class containing methods for calling contracts in order to obtain information from the blockchain.
 * To send transaction or execute contract method use {@link Web3Private}.
 */
class SolanaWeb3Public extends web3_public_1.Web3Public {
    constructor(connection) {
        super(blockchain_name_1.BLOCKCHAIN_NAME.SOLANA);
        this.connection = connection;
    }
    getBlockNumber() {
        return this.connection.getBlockHeight('finalized');
    }
    multicallContractsMethods(_contractAbi, _contractsData) {
        throw new Error('Method multicall is not supported');
    }
    async getTransactionStatus(hash) {
        try {
            const transaction = await this.connection.getTransaction(hash, {
                maxSupportedTransactionVersion: 1
            });
            if (transaction?.meta?.err) {
                return tx_status_1.TX_STATUS.FAIL;
            }
            if (transaction?.blockTime) {
                return tx_status_1.TX_STATUS.SUCCESS;
            }
            return tx_status_1.TX_STATUS.PENDING;
        }
        catch {
            return tx_status_1.TX_STATUS.PENDING;
        }
    }
    async callForTokensInfo(tokenAddresses, tokenFields = ['decimals', 'symbol', 'name']) {
        const nativeTokenIndex = tokenAddresses.findIndex(address => this.Web3Pure.isNativeAddress(address));
        const filteredTokenAddresses = tokenAddresses.filter((_, index) => index !== nativeTokenIndex);
        const mints = filteredTokenAddresses.map(address => new web3_js_1.PublicKey(address));
        const tokenSdk = new utl_sdk_1.Client();
        const tokensMint = await tokenSdk.fetchMints(mints);
        const tokens = tokensMint.map(token => {
            const entries = tokenFields.map(field => [field, token?.[field]]);
            return Object.fromEntries(entries);
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
    async getBalance(userAddress, tokenAddress) {
        const isToken = tokenAddress && !solana_web3_pure_1.SolanaWeb3Pure.isNativeAddress(tokenAddress);
        if (isToken) {
            const balance = await this.getTokensBalances(userAddress, [tokenAddress]);
            return balance?.[0] || new bignumber_js_1.default(0);
        }
        const balance = await this.connection.getBalanceAndContext(new web3_js_1.PublicKey(userAddress), 'confirmed');
        return new bignumber_js_1.default(balance.value.toString());
    }
    async getTokenBalance(address, tokenAddress) {
        const balance = await this.getTokensBalances(address, [tokenAddress]);
        return balance?.[0] || new bignumber_js_1.default(0);
    }
    async callContractMethod(_contractAddress, _contractAbi, _methodName, _methodArguments = [], _options = {}) {
        throw new Error('Method call is not supported');
    }
    healthCheck(timeoutMs = 4000) {
        const request = this.connection.getBalanceAndContext(new web3_js_1.PublicKey('DVLwQbEaw5txuduQwvfbNP3sXvjawHqaoMuGMKZx15bQ'), 'confirmed');
        return (0, rxjs_1.firstValueFrom)((0, rxjs_1.from)(request).pipe((0, rxjs_1.timeout)(timeoutMs), (0, rxjs_1.map)(result => Boolean(result)), (0, rxjs_1.catchError)((err) => {
            if (err?.name === 'TimeoutError') {
                console.debug(`Solana node healthcheck timeout (${timeoutMs}ms) has occurred.`);
            }
            else {
                console.debug(`Solana node healthcheck fail: ${err}`);
            }
            return (0, rxjs_1.of)(false);
        })));
    }
    /**
     * Gets balance of multiple tokens.
     * @param address Wallet address.
     * @param tokensAddresses Tokens addresses.
     */
    async getTokensBalances(address, tokensAddresses) {
        const resp = await this.connection._rpcRequest('getTokenAccountsByOwner', [
            address,
            { programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' },
            { encoding: 'jsonParsed' }
        ]);
        const tokenInfo = new Map(resp.result.value.map(el => {
            const { mint, tokenAmount } = el.account.data.parsed.info;
            return [mint, tokenAmount.amount];
        }));
        const nativeSolBalance = await this.connection.getBalanceAndContext(new web3_js_1.PublicKey(address), 'confirmed');
        return tokensAddresses.map(tokenAddress => {
            if (tokenAddress === native_solana_mint_address_1.NATIVE_SOLANA_MINT_ADDRESS) {
                return new bignumber_js_1.default(nativeSolBalance.value.toString());
            }
            const tokenWithBalance = tokenInfo.get(tokenAddress);
            return new bignumber_js_1.default(tokenWithBalance || NaN);
        });
    }
    async getAllowance() {
        return new bignumber_js_1.default(Infinity);
    }
    setProvider(_provider) {
        return;
    }
    async getRecentBlockhash() {
        return this.connection.getLatestBlockhash();
    }
}
exports.SolanaWeb3Public = SolanaWeb3Public;
__decorate([
    decorators_1.Cache
], SolanaWeb3Public.prototype, "callForTokensInfo", null);
//# sourceMappingURL=solana-web3-public.js.map