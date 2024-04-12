"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_BRIDGE_TYPE = void 0;
const cross_chain_trade_type_1 = require("../../../models/cross-chain-trade-type");
exports.DEFAULT_BRIDGE_TYPE = {
    ...cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE,
    ACROSS: 'across',
    AMAROK: 'connext',
    ANY_SWAP: 'anyswap',
    ARBITRUM_BRIDGE: 'arbitrum',
    AVALANCHE_BRIDGE: 'avalanche',
    CONNEXT: 'connext',
    CELERIM: 'celerim',
    HOP: 'hop',
    HYPHEN: 'hyphen',
    IBC: 'ibc',
    MAKERS_WORMHOLE: 'maker',
    MAYA_PROTOCOL: 'mayaprotocol',
    MULTICHAIN: 'multichain',
    OPEN_OCEAN: 'openocean',
    OPTIMISM_GATEWAY: 'optimism',
    OSMOSIS_BRIDGE: 'osmosis',
    POLYGON: 'polygon',
    RAINBOW: 'rainbow',
    REFUEL: 'refuel',
    SATELLITE: 'satellite',
    STARGATE: 'stargate',
    SYMBIOSIS: 'symbiosis',
    SYNAPSE: 'synapse',
    THORCHAIN: 'thorchain',
    VOYAGER: 'voyager',
    WORMHOLE: 'wormhole',
    YPOOL: 'ypool'
};
//# sourceMappingURL=default-bridge-type.js.map