"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvmWrapTrade = void 0;
const errors_1 = require("../../../../../../common/errors");
const wrapped_addresses_1 = require("../../../../../../common/tokens/constants/wrapped-addresses");
const blockchain_1 = require("../../../../../../common/utils/blockchain");
const evm_web3_pure_1 = require("../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const wrap_abi_1 = require("./wrap-abi");
const on_chain_trade_type_1 = require("../models/on-chain-trade-type");
const evm_on_chain_trade_1 = require("../on-chain-trade/evm-on-chain-trade/evm-on-chain-trade");
class EvmWrapTrade extends evm_on_chain_trade_1.EvmOnChainTrade {
    get dexContractAddress() {
        return this.from.isNative ? this.to.address : this.from.address;
    }
    async encodeDirect(options) {
        await this.checkFromAddress(options.fromAddress, true);
        const methodName = this.from.isNative ? 'deposit' : 'withdraw';
        const gasParams = this.getGasParams(options);
        return evm_web3_pure_1.EvmWeb3Pure.encodeMethodCall(this.dexContractAddress, wrap_abi_1.wrapAbi, methodName, this.from.isNative ? [] : [this.from.stringWeiAmount], this.from.isNative ? this.from.stringWeiAmount : '0', gasParams);
    }
    constructor(evmOnChainTradeStruct, providerAddress) {
        super(evmOnChainTradeStruct, providerAddress);
        this.type = on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.WRAPPED;
    }
    static isSupportedBlockchain(blockchain) {
        return Boolean(wrapped_addresses_1.wrappedAddress?.[blockchain]);
    }
    static isSupportedTrade(blockchain, fromAddress, toAddress) {
        if (!EvmWrapTrade.isSupportedBlockchain) {
            throw new errors_1.RubicSdkError('Trade is not supported');
        }
        const wethAddress = wrapped_addresses_1.wrappedAddress[blockchain];
        return (((0, blockchain_1.compareAddresses)(fromAddress, evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS) &&
            (0, blockchain_1.compareAddresses)(toAddress, wethAddress)) ||
            ((0, blockchain_1.compareAddresses)(toAddress, evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS) &&
                (0, blockchain_1.compareAddresses)(fromAddress, wethAddress)));
    }
    async needApprove(_fromAddress) {
        return false;
    }
}
exports.EvmWrapTrade = EvmWrapTrade;
//# sourceMappingURL=evm-wrap-trade.js.map