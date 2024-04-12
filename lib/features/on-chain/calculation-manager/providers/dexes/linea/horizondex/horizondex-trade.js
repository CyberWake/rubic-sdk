"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorizondexTrade = void 0;
const errors_1 = require("../../../../../../../common/errors");
const blockchain_1 = require("../../../../../../../common/utils/blockchain");
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const uniswap_v3_abstract_trade_1 = require("../../common/uniswap-v3-abstract/uniswap-v3-abstract-trade");
const uniswap_v3_quoter_controller_1 = require("../../common/uniswap-v3-abstract/utils/quoter-controller/uniswap-v3-quoter-controller");
const router_configuration_1 = require("./constants/router-configuration");
class HorizondexTrade extends uniswap_v3_abstract_trade_1.UniswapV3AbstractTrade {
    constructor() {
        super(...arguments);
        this.dexContractAddress = router_configuration_1.HORIZONDEX_UNISWAP_V3_SWAP_ROUTER_CONTRACT_ADDRESS;
        this.contractAbi = router_configuration_1.HORIZONDEX_UNISWAP_V3_SWAP_ROUTER_CONTRACT_ABI;
        this.unwrapWethMethodName = 'unwrapWeth';
    }
    static get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.HORIZONDEX;
    }
    /**
     * Returns swap `exactInput` method's name and arguments to use in Swap contract.
     */
    getSwapRouterExactInputMethodData(walletAddress) {
        const amountParams = this.getAmountParams();
        if (this.route.poolsPath.length === 1) {
            const methodName = this.exact === 'input' ? 'swapExactInputSingle' : 'swapExactOutputSingle';
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
        const methodName = this.exact === 'input' ? 'swapExactInput' : 'swapExactOutput';
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
exports.HorizondexTrade = HorizondexTrade;
//# sourceMappingURL=horizondex-trade.js.map