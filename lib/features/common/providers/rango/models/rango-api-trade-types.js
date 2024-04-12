"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rangoTradeTypes = exports.rangoCrossChainTradeTypes = exports.rangoOnChainTradeTypes = void 0;
const bridge_type_1 = require("../../../../cross-chain/calculation-manager/providers/common/models/bridge-type");
const on_chain_trade_type_1 = require("../../../../on-chain/calculation-manager/providers/common/models/on-chain-trade-type");
exports.rangoOnChainTradeTypes = {
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE['10K_SWAP']]: '10KSwap',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.PANGOLIN]: 'Pangolin Swap',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.SUSHI_SWAP]: 'Sushi Swap',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.OSMOSIS_SWAP]: 'Osmosis',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.UNISWAP_V2]: 'UniSwapV2',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.VVS_FINANCE]: 'VVS Finance',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.MM_FINANCE]: 'MM Finance',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.CRONA_SWAP]: 'Crona Swap',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.OOLONG_SWAP]: 'Oolong Swap',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.TRISOLARIS]: 'Trisolaris Swap',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.MOJITO_SWAP]: 'Mojito Swap',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.NET_SWAP]: 'Netswap',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.VOLTAGE_SWAP]: 'Voltage Swap',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.PANCAKE_SWAP]: 'PancakeV2',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.PANCAKE_SWAP_V3]: 'PancakeV3',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.UNI_SWAP_V3]: 'UniSwapV3',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.KYBER_SWAP]: 'KyberSwapV3',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.JUPITER]: 'Jupiter',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.OPEN_OCEAN]: 'Open Ocean',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.CURVE]: 'CurveFi',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.QUICK_SWAP]: 'Quick Swap',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.XY_DEX]: 'XY Finance',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.SOLAR_BEAM]: 'Solarbeam',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.AURORA_SWAP]: 'Aurora Swap',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.STELLA_SWAP]: 'Stella Swap',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.ONE_INCH]: '1Inch',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.BEAM_SWAP]: 'Beam Swap',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.PARA_SWAP]: 'ParaSwap',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.SYNAPSE]: 'Synapse Swapper',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.FINKUJIRA]: 'Fin Kujira',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.SOLANA]: 'Solana Wrapper',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.AVNU]: 'Avnu',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.ECHO_DEX]: 'EchoDEX',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.SPACEFI_SWAP]: 'SpaceFi',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.WYND]: 'Wynd Dex',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.SUN_SWAP]: 'Sun Swap',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.MDEX]: 'MDex',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.OKC_SWAP]: 'Okc Swap',
    [on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.CHERRY_SWAP]: 'Cherry Swap'
};
exports.rangoCrossChainTradeTypes = {
    [bridge_type_1.BRIDGE_TYPE.ACROSS]: 'Across',
    [bridge_type_1.BRIDGE_TYPE.VOYAGER]: 'Voyager',
    [bridge_type_1.BRIDGE_TYPE.CBRIDGE]: 'CBridge',
    [bridge_type_1.BRIDGE_TYPE.RAINBOW]: 'Rainbow Bridge',
    [bridge_type_1.BRIDGE_TYPE.SYNAPSE]: 'Synapse Bridge',
    [bridge_type_1.BRIDGE_TYPE.OPTIMISM_GATEWAY]: 'Optimism Bridge',
    [bridge_type_1.BRIDGE_TYPE.ORBITER_BRIDGE]: 'Orbiter',
    [bridge_type_1.BRIDGE_TYPE.MAYA_PROTOCOL]: 'Maya Protocol',
    [bridge_type_1.BRIDGE_TYPE.XY]: 'XY Finance',
    [bridge_type_1.BRIDGE_TYPE.THORCHAIN]: 'ThorChain',
    [bridge_type_1.BRIDGE_TYPE.ARBITRUM_BRIDGE]: 'Arbitrum Bridge',
    [bridge_type_1.BRIDGE_TYPE.ALLBRIDGE]: 'AllBridge',
    [bridge_type_1.BRIDGE_TYPE.HYPHEN]: 'Hyphen',
    [bridge_type_1.BRIDGE_TYPE.CIRCLE_CELER_BRIDGE]: 'Circle',
    [bridge_type_1.BRIDGE_TYPE.IBC]: 'IBC',
    [bridge_type_1.BRIDGE_TYPE.STARGATE]: 'Stargate',
    [bridge_type_1.BRIDGE_TYPE.SATELLITE]: 'Satellite',
    [bridge_type_1.BRIDGE_TYPE.SYMBIOSIS]: 'Symbiosis',
    [bridge_type_1.BRIDGE_TYPE.OSMOSIS_BRIDGE]: 'Osmosis'
};
exports.rangoTradeTypes = { ...exports.rangoOnChainTradeTypes, ...exports.rangoCrossChainTradeTypes };
//# sourceMappingURL=rango-api-trade-types.js.map