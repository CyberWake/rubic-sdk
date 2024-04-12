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
exports.OnChainTrade = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../common/errors");
const updated_rates_error_1 = require("../../../../../../common/errors/cross-chain/updated-rates-error");
const tokens_1 = require("../../../../../../common/tokens");
const decorators_1 = require("../../../../../../common/utils/decorators");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const injector_1 = require("../../../../../../core/injector/injector");
const check_address_1 = require("../../../../../common/utils/check-address");
/**
 * Abstract class for all instant trade providers' trades.
 */
class OnChainTrade {
    /**
     * Minimum amount of output token user can get.
     */
    get toTokenAmountMin() {
        const weiAmountOutMin = this.to.weiAmountMinusSlippage(this.slippageTolerance);
        return new tokens_1.PriceTokenAmount({ ...this.to.asStruct, weiAmount: weiAmountOutMin });
    }
    get web3Public() {
        return injector_1.Injector.web3PublicService.getWeb3Public(this.from.blockchain);
    }
    get web3Private() {
        return injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(this.from.blockchain);
    }
    get walletAddress() {
        return this.web3Private.address;
    }
    get httpClient() {
        return injector_1.Injector.httpClient;
    }
    /**
     * Price impact, based on tokens' usd prices.
     */
    get priceImpact() {
        return this.from.calculatePriceImpactPercent(this.to);
    }
    constructor(providerAddress) {
        this.providerAddress = providerAddress;
    }
    /**
     * Returns true, if allowance is not enough.
     */
    async needApprove(fromAddress) {
        if (!fromAddress) {
            this.checkWalletConnected();
        }
        // Native coin in METIS can be Token required approve
        if (this.from.isNative && this.from.blockchain !== blockchain_name_1.BLOCKCHAIN_NAME.METIS) {
            return false;
        }
        // Special native address for METIS native coin
        const fromTokenAddress = this.from.isNative && this.from.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.METIS
            ? '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000'
            : this.from.address;
        const allowance = await this.web3Public.getAllowance(fromTokenAddress, fromAddress || this.walletAddress, this.spenderAddress);
        return allowance.lt(this.from.weiAmount);
    }
    async checkWalletState() {
        this.checkWalletConnected();
        await this.checkBlockchainCorrect();
        await this.checkBalance();
    }
    checkWalletConnected() {
        if (!this.walletAddress) {
            throw new errors_1.WalletNotConnectedError();
        }
    }
    async checkBlockchainCorrect() {
        await this.web3Private.checkBlockchainCorrect(this.from.blockchain);
    }
    async checkBalance() {
        await this.web3Public.checkBalance(this.from, this.from.tokenAmount, this.walletAddress);
    }
    async checkFromAddress(fromAddress, isRequired = false, chainType) {
        if (!fromAddress) {
            if (isRequired) {
                throw new errors_1.RubicSdkError(`'fromAddress' is required option`);
            }
            return;
        }
        const isAddressCorrectValue = await (0, check_address_1.isAddressCorrect)(fromAddress, this.from.blockchain, chainType);
        if (!isAddressCorrectValue) {
            throw new errors_1.WrongFromAddressError();
        }
    }
    async checkReceiverAddress(receiverAddress, isRequired = false, chainType) {
        if (!receiverAddress) {
            if (isRequired) {
                throw new errors_1.RubicSdkError(`'receiverAddress' is required option`);
            }
            return;
        }
        const isAddressCorrectValue = await (0, check_address_1.isAddressCorrect)(receiverAddress, this.from.blockchain, chainType);
        if (!isAddressCorrectValue) {
            throw new errors_1.WrongReceiverAddressError();
        }
    }
    getRoutePath() {
        return [
            {
                type: 'on-chain',
                provider: this.type,
                path: this.path.map(token => new tokens_1.TokenAmount({ ...token, tokenAmount: new bignumber_js_1.default(0) }))
            }
        ];
    }
    getTradeInfo() {
        return {
            estimatedGas: null,
            feeInfo: this.feeInfo,
            priceImpact: this.priceImpact ?? null,
            slippage: this.slippageTolerance * 100,
            routePath: this.getRoutePath()
        };
    }
    checkAmountChange(transactionRequest, newWeiAmount, oldWeiAmount) {
        const oldAmount = new bignumber_js_1.default(oldWeiAmount);
        const newAmount = new bignumber_js_1.default(newWeiAmount);
        const changePercent = 0.1;
        const acceptablePercentPriceChange = new bignumber_js_1.default(changePercent).dividedBy(100);
        const amountPlusPercent = oldAmount.multipliedBy(acceptablePercentPriceChange.plus(1));
        const amountMinusPercent = oldAmount.multipliedBy(new bignumber_js_1.default(1).minus(acceptablePercentPriceChange));
        const shouldThrowError = newAmount.lt(amountMinusPercent) || newAmount.gt(amountPlusPercent);
        if (shouldThrowError) {
            throw new updated_rates_error_1.UpdatedRatesError({
                ...transactionRequest,
                newAmount: newWeiAmount,
                oldAmount: oldWeiAmount
            });
        }
    }
}
exports.OnChainTrade = OnChainTrade;
__decorate([
    decorators_1.Cache
], OnChainTrade.prototype, "priceImpact", null);
//# sourceMappingURL=on-chain-trade.js.map