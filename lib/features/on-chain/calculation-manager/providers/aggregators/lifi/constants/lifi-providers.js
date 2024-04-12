"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lifiProviders = void 0;
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
exports.lifiProviders = {
    '0x': on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.ZRX,
    '1inch': on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.ONE_INCH,
    openocean: on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.OPEN_OCEAN,
    dodo: on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.DODO,
    sushiswap: on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.SUSHI_SWAP,
    'sushiswap-fus': on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.SUSHI_SWAP,
    honeyswap: on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.HONEY_SWAP,
    stellaswap: on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.STELLA_SWAP,
    beamswap: on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.BEAM_SWAP,
    ubeswap: on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.UBE_SWAP,
    jswap: on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.J_SWAP,
    cronaswap: on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.CRONA_SWAP
};
//# sourceMappingURL=lifi-providers.js.map