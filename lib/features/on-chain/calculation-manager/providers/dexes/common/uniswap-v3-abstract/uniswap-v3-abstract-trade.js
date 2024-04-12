"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniswapV3AbstractTrade = void 0;
const errors_1 = require("../../../../../../../common/errors");
const blockchain_1 = require("../../../../../../../common/utils/blockchain");
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const swap_router_contract_abi_1 = require("./constants/swap-router-contract-abi");
const uniswap_v3_quoter_controller_1 = require("./utils/quoter-controller/uniswap-v3-quoter-controller");
const uniswap_v3_algebra_abstract_trade_1 = require("../uniswap-v3-algebra-abstract/uniswap-v3-algebra-abstract-trade");
class UniswapV3AbstractTrade extends uniswap_v3_algebra_abstract_trade_1.UniswapV3AlgebraAbstractTrade {
    static get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.UNI_SWAP_V3;
    }
    constructor(tradeStruct, providerAddress) {
        super(tradeStruct, providerAddress);
        this.dexContractAddress = swap_router_contract_abi_1.UNISWAP_V3_SWAP_ROUTER_CONTRACT_ADDRESS;
        this.contractAbi = swap_router_contract_abi_1.UNISWAP_V3_SWAP_ROUTER_CONTRACT_ABI;
        this.unwrapWethMethodName = 'unwrapWETH9';
        this.route = tradeStruct.route;
    }
    /**
     * Returns swap `exactInput` method's name and arguments to use in Swap contract.
     */
    getSwapRouterExactInputMethodData(walletAddress) {
        const amountParams = this.getAmountParams();
        if (this.route.poolsPath.length === 1) {
            const methodName = this.exact === 'input' ? 'exactInputSingle' : 'exactOutputSingle';
            const pool = this.route.poolsPath[0];
            if (!pool) {
                throw new errors_1.RubicSdkError('Initial pool has to be defined');
            }
            const toTokenAddress = (0, blockchain_1.compareAddresses)(pool.token0.address, this.route.initialTokenAddress)
                ? pool.token1.address
                : pool.token0.address;
            if (!this.route?.poolsPath?.[0]) {
                throw new errors_1.RubicSdkError('PoolsPath[0] has to be defined');
            }
            return {
                methodName,
                methodArguments: [
                    [
                        this.route.initialTokenAddress,
                        toTokenAddress,
                        this.route.poolsPath[0].fee,
                        walletAddress,
                        this.deadlineMinutesTimestamp,
                        ...amountParams,
                        0
                    ]
                ]
            };
        }
        const methodName = this.exact === 'input' ? 'exactInput' : 'exactOutput';
        return {
            methodName,
            methodArguments: [
                [
                    uniswap_v3_quoter_controller_1.UniswapV3QuoterController.getEncodedPoolsPath(this.route.poolsPath, this.route.initialTokenAddress),
                    walletAddress,
                    this.deadlineMinutesTimestamp,
                    ...amountParams
                ]
            ]
        };
    }
}
exports.UniswapV3AbstractTrade = UniswapV3AbstractTrade;
//# sourceMappingURL=uniswap-v3-abstract-trade.js.map