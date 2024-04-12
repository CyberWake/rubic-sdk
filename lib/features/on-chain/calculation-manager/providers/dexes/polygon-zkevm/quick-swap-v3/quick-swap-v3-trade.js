"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickSwapV3PolygonZKEVMTrade = void 0;
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const algebra_quoter_controller_1 = require("../../common/algebra/algebra-quoter-controller");
const uniswap_v3_algebra_abstract_trade_1 = require("../../common/uniswap-v3-algebra-abstract/uniswap-v3-algebra-abstract-trade");
const swap_router_contract_data_1 = require("../../polygon/quick-swap-v3/constants/swap-router-contract-data");
const swap_router_contract_data_2 = require("./constants/swap-router-contract-data");
class QuickSwapV3PolygonZKEVMTrade extends uniswap_v3_algebra_abstract_trade_1.UniswapV3AlgebraAbstractTrade {
    static get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.QUICK_SWAP_V3;
    }
    constructor(tradeStruct, providerAddress) {
        super(tradeStruct, providerAddress);
        this.dexContractAddress = swap_router_contract_data_2.QUICK_SWAP_V3_POLYGON_ZKEVM_ROUTER_CONTRACT_ADDRESS;
        this.contractAbi = swap_router_contract_data_1.QUICK_SWAP_V3_ROUTER_CONTRACT_ABI;
        this.unwrapWethMethodName = 'unwrapWNativeToken';
        this.route = tradeStruct.route;
        this.wrappedPath = this.route.path;
    }
    /**
     * Returns swap `exactInput` method's name and arguments to use in Swap contract.
     */
    getSwapRouterExactInputMethodData(walletAddress) {
        const amountParams = this.getAmountParams();
        if (this.route.path.length === 2 && this.route?.path?.[0] && this.route?.path?.[1]) {
            const methodName = this.exact === 'input' ? 'exactInputSingle' : 'exactOutputSingle';
            return {
                methodName,
                methodArguments: [
                    [
                        this.route.path[0].address,
                        this.route.path[1].address,
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
                    algebra_quoter_controller_1.AlgebraQuoterController.getEncodedPath(this.route.path),
                    walletAddress,
                    this.deadlineMinutesTimestamp,
                    ...amountParams
                ]
            ]
        };
    }
}
exports.QuickSwapV3PolygonZKEVMTrade = QuickSwapV3PolygonZKEVMTrade;
//# sourceMappingURL=quick-swap-v3-trade.js.map