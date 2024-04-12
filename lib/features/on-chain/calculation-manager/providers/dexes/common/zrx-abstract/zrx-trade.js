"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZrxTrade = void 0;
const evm_web3_pure_1 = require("../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const injector_1 = require("../../../../../../../core/injector/injector");
const check_unsupported_receiver_address_1 = require("../../../../../../common/utils/check-unsupported-receiver-address");
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const evm_on_chain_trade_1 = require("../../../common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade");
class ZrxTrade extends evm_on_chain_trade_1.EvmOnChainTrade {
    /** @internal */
    static async getGasLimit(zrxTradeStruct) {
        const fromBlockchain = zrxTradeStruct.from.blockchain;
        const walletAddress = injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(fromBlockchain).address;
        if (!walletAddress) {
            return null;
        }
        try {
            const transactionConfig = await new ZrxTrade(zrxTradeStruct, evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS).encode({ fromAddress: walletAddress });
            const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
            const gasLimit = (await web3Public.batchEstimatedGas(walletAddress, [transactionConfig]))[0];
            if (!gasLimit?.isFinite()) {
                return null;
            }
            return gasLimit;
        }
        catch (_err) {
            return null;
        }
    }
    get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.ZRX;
    }
    constructor(tradeStruct, providerAddress) {
        super(tradeStruct, providerAddress);
        this.apiTradeData = tradeStruct.apiTradeData;
        this.dexContractAddress = this.apiTradeData.to;
    }
    async encodeDirect(options) {
        (0, check_unsupported_receiver_address_1.checkUnsupportedReceiverAddress)(options?.receiverAddress, options?.fromAddress || this.walletAddress);
        const { gas, gasPrice } = this.getGasParams(options);
        return {
            to: this.apiTradeData.to,
            data: this.apiTradeData.data,
            value: this.apiTradeData.value,
            gas,
            gasPrice
        };
    }
}
exports.ZrxTrade = ZrxTrade;
//# sourceMappingURL=zrx-trade.js.map