"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncSwapAbstractTrade = void 0;
const limit_order_protocol_utils_1 = require("@1inch/limit-order-protocol-utils");
const errors_1 = require("../../../../../../../common/utils/errors");
const options_1 = require("../../../../../../../common/utils/options");
const evm_web3_pure_1 = require("../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const injector_1 = require("../../../../../../../core/injector/injector");
const token_native_address_proxy_1 = require("../../../../../../common/utils/token-native-address-proxy");
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const evm_on_chain_trade_1 = require("../../../common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade");
const constants_1 = require("../oneinch-abstract/constants");
const sync_swap_abi_1 = require("./sync-swap-abi");
class SyncSwapAbstractTrade extends evm_on_chain_trade_1.EvmOnChainTrade {
    /** @internal */
    static async getGasLimit(tradeStruct, dexContractAddress, providerAddress) {
        const fromBlockchain = tradeStruct.from.blockchain;
        const walletAddress = injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(fromBlockchain).address;
        if (!walletAddress) {
            return null;
        }
        try {
            const transactionConfig = await new SyncSwapAbstractTrade(tradeStruct, providerAddress || evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS, dexContractAddress).encode({ fromAddress: walletAddress });
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
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.SYNC_SWAP;
    }
    constructor(tradeStruct, providerAddress, dexContractAddress) {
        super(tradeStruct, providerAddress);
        this.nativeSupportedFromWithoutFee = (0, token_native_address_proxy_1.createTokenNativeAddressProxy)(tradeStruct.fromWithoutFee, constants_1.oneinchApiParams.nativeAddress);
        this.nativeSupportedTo = (0, token_native_address_proxy_1.createTokenNativeAddressProxy)(tradeStruct.to, constants_1.oneinchApiParams.nativeAddress);
        this.bestPathWithAmounts = tradeStruct.bestPathWithAmounts;
        this.dexContractAddress = dexContractAddress;
    }
    async encodeDirect(options) {
        await this.checkFromAddress(options.fromAddress, true);
        await this.checkReceiverAddress(options.receiverAddress);
        try {
            const params = this.getCallParameters(options?.receiverAddress);
            const gasParams = this.getGasParams(options);
            const value = this.from.isNative ? this.from.stringWeiAmount : '0';
            return evm_web3_pure_1.EvmWeb3Pure.encodeMethodCall(this.dexContractAddress, sync_swap_abi_1.syncSwapAbi, 'swap', params, value, gasParams);
        }
        catch (err) {
            console.debug(err);
            throw (0, errors_1.parseError)(err);
        }
    }
    getCallParameters(receiverAddress) {
        const paths = this.bestPathWithAmounts.pathsWithAmounts.map(path => {
            const pathTokenInRoute = path.stepsWithAmount[0].tokenIn;
            const pathTokenIn = this.from.isNative ? limit_order_protocol_utils_1.ZERO_ADDRESS : pathTokenInRoute;
            return {
                steps: path.stepsWithAmount.map((step, i) => {
                    const isLastStep = i === path.stepsWithAmount.length - 1;
                    const stepTo = isLastStep
                        ? receiverAddress || this.walletAddress
                        : path.stepsWithAmount[i + 1].pool.pool;
                    let withdrawMode = 0;
                    if (isLastStep) {
                        withdrawMode = this.to.isNative ? 1 : 2;
                    }
                    const data = evm_web3_pure_1.EvmWeb3Pure.encodeParameters(['address', 'address', 'uint8'], [step.tokenIn, stepTo, withdrawMode]);
                    return {
                        pool: step.pool.pool,
                        data,
                        callback: limit_order_protocol_utils_1.ZERO_ADDRESS,
                        callbackData: '0x'
                    };
                }),
                tokenIn: pathTokenIn,
                amountIn: path.amountIn
            };
        });
        return [paths, this.toTokenAmountMin.stringWeiAmount, String((0, options_1.deadlineMinutesTimestamp)(30))];
    }
}
exports.SyncSwapAbstractTrade = SyncSwapAbstractTrade;
//# sourceMappingURL=sync-swap-abstract-trade.js.map