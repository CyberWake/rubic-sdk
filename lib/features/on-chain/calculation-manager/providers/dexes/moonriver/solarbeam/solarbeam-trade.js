"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolarbeamTrade = void 0;
const injector_1 = require("../../../../../../../core/injector/injector");
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const uniswap_v2_abstract_trade_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-trade");
const constants_1 = require("./constants");
class SolarbeamTrade extends uniswap_v2_abstract_trade_1.UniswapV2AbstractTrade {
    constructor() {
        super(...arguments);
        this.dexContractAddress = constants_1.SOLARBEAM_CONTRACT_ADDRESS;
    }
    static get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.SOLAR_BEAM;
    }
    static callForRoutes(blockchain, exact, routesMethodArguments) {
        const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(blockchain);
        return web3Public.multicallContractMethod(this.getDexContractAddress(blockchain), this.contractAbi, exact === 'input' ? 'getAmountsOut' : 'getAmountsIn', routesMethodArguments.map(args => args.concat(this.feeParameter)));
    }
}
exports.SolarbeamTrade = SolarbeamTrade;
SolarbeamTrade.contractAbi = constants_1.SOLARBEAM_CONTRACT_ABI;
SolarbeamTrade.feeParameter = '25';
//# sourceMappingURL=solarbeam-trade.js.map