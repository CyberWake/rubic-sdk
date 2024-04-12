"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TronOnChainTrade = void 0;
const errors_1 = require("../../../../../../../common/errors");
const injector_1 = require("../../../../../../../core/injector/injector");
const on_chain_trade_1 = require("../on-chain-trade");
class TronOnChainTrade extends on_chain_trade_1.OnChainTrade {
    get web3Public() {
        return injector_1.Injector.web3PublicService.getWeb3Public(this.from.blockchain);
    }
    get web3Private() {
        return injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(this.from.blockchain);
    }
    async approve(options, checkNeedApprove = true, amount = 'infinity') {
        if (checkNeedApprove) {
            const needApprove = await this.needApprove();
            if (!needApprove) {
                throw new errors_1.UnnecessaryApproveError();
            }
        }
        this.checkWalletConnected();
        await this.checkBlockchainCorrect();
        return this.web3Private.approveTokens(this.from.address, this.spenderAddress, amount, options);
    }
    async checkAllowanceAndApprove(options) {
        const needApprove = await this.needApprove();
        if (!needApprove) {
            return;
        }
        const approveOptions = {
            onTransactionHash: options?.onApprove,
            feeLimit: options?.approveFeeLimit
        };
        await this.approve(approveOptions, false);
    }
    async encodeApprove(tokenAddress, spenderAddress, value, options = {}) {
        return this.web3Private.encodeApprove(tokenAddress, spenderAddress, value, options);
    }
}
exports.TronOnChainTrade = TronOnChainTrade;
//# sourceMappingURL=tron-on-chain-trade.js.map