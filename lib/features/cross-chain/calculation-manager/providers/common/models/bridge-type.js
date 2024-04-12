"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bridges = exports.BRIDGE_TYPE = void 0;
const default_bridge_type_1 = require("./default-bridge-type");
const uniq_lifi_bridge_types_1 = require("../../lifi-provider/models/uniq-lifi-bridge-types");
exports.BRIDGE_TYPE = {
    ...default_bridge_type_1.DEFAULT_BRIDGE_TYPE,
    ...uniq_lifi_bridge_types_1.UNIQ_LIFI_BRIDGE_TYPES
};
exports.bridges = Object.values(exports.BRIDGE_TYPE);
//# sourceMappingURL=bridge-type.js.map