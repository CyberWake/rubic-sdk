"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNIQ_LIFI_BRIDGE_TYPES = void 0;
const default_bridge_type_1 = require("../../common/models/default-bridge-type");
const lifi_bridge_types_1 = require("./lifi-bridge-types");
// @TODO add type
exports.UNIQ_LIFI_BRIDGE_TYPES = {
    ACROSS: default_bridge_type_1.DEFAULT_BRIDGE_TYPE.ACROSS,
    AMAROK: default_bridge_type_1.DEFAULT_BRIDGE_TYPE.AMAROK,
    ARBITRUM: default_bridge_type_1.DEFAULT_BRIDGE_TYPE.ARBITRUM_BRIDGE,
    AVALANCHE: default_bridge_type_1.DEFAULT_BRIDGE_TYPE.AVALANCHE_BRIDGE,
    CBRIDGE: lifi_bridge_types_1.LIFI_BRIDGE_TYPES.CBRIDGE,
    CONNEXT: default_bridge_type_1.DEFAULT_BRIDGE_TYPE.CONNEXT,
    CELERIM: default_bridge_type_1.DEFAULT_BRIDGE_TYPE.CELERIM,
    HOP: default_bridge_type_1.DEFAULT_BRIDGE_TYPE.HOP,
    HYPHEN: default_bridge_type_1.DEFAULT_BRIDGE_TYPE.HYPHEN,
    MULTICHAIN: default_bridge_type_1.DEFAULT_BRIDGE_TYPE.MULTICHAIN,
    STARGATE: default_bridge_type_1.DEFAULT_BRIDGE_TYPE.STARGATE,
    ALLBRIDGE: lifi_bridge_types_1.LIFI_BRIDGE_TYPES.ALLBRIDGE,
    POLYGON_BRIDGE: default_bridge_type_1.DEFAULT_BRIDGE_TYPE.POLYGON,
    OMNI_BRIDGE: lifi_bridge_types_1.LIFI_BRIDGE_TYPES.OMNI_BRIDGE,
    GNOSIS_BRIDGE: lifi_bridge_types_1.LIFI_BRIDGE_TYPES.GNOSIS_BRIDGE,
    CONNEXT_AMAROK: lifi_bridge_types_1.LIFI_BRIDGE_TYPES.CONNEXT_AMAROK,
    CIRCLE_CELER_BRIDGE: lifi_bridge_types_1.LIFI_BRIDGE_TYPES.CIRCLE_CELER_BRIDGE,
    LI_FUEL: lifi_bridge_types_1.LIFI_BRIDGE_TYPES.LI_FUEL,
    WORMHOLE: default_bridge_type_1.DEFAULT_BRIDGE_TYPE.WORMHOLE
};
//# sourceMappingURL=uniq-lifi-bridge-types.js.map