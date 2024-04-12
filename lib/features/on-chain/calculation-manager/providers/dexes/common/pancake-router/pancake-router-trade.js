"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PancakeRouterTrade = void 0;
const sdk_1 = require("@pancakeswap/sdk");
const evm_1 = require("@pancakeswap/smart-router/evm");
const injector_1 = require("../../../../../../../core/injector/injector");
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const evm_on_chain_trade_1 = require("../../../common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade");
class PancakeRouterTrade extends evm_on_chain_trade_1.EvmOnChainTrade {
    static async getGasLimit(tradeStruct, providerAddress) {
        const fromBlockchain = tradeStruct.from.blockchain;
        const walletAddress = injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(fromBlockchain).address;
        if (!walletAddress) {
            return null;
        }
        try {
            const transactionConfig = await new PancakeRouterTrade(tradeStruct, providerAddress).encode({ fromAddress: walletAddress });
            const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
            const gasLimit = await web3Public.getEstimatedGasByData(walletAddress, transactionConfig.to, {
                data: transactionConfig.data,
                value: transactionConfig.value
            });
            if (!gasLimit?.isFinite()) {
                return null;
            }
            return gasLimit;
        }
        catch (err) {
            console.debug(err);
            return null;
        }
    }
    get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.PANCAKE_SWAP;
    }
    async encodeDirect(options) {
        const slippage = Number.parseInt(String(this.slippageTolerance * 100));
        const slippagePercent = new sdk_1.Percent(slippage, 100);
        const payload = evm_1.SwapRouter.swapCallParameters(this.trade, {
            slippageTolerance: slippagePercent,
            ...(options.receiverAddress && { recipient: options.receiverAddress })
        });
        return {
            to: this.dexContractAddress,
            value: payload.value,
            data: payload.calldata
        };
    }
    constructor(tradeStruct, providerAddress) {
        super(tradeStruct, providerAddress);
        this.trade = tradeStruct.trade;
        this.dexContractAddress = tradeStruct.dexContractAddress;
    }
}
exports.PancakeRouterTrade = PancakeRouterTrade;
//# sourceMappingURL=pancake-router-trade.js.map