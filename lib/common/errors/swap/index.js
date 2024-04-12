"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./bridgers-pair-is-unavailable.error"), exports);
__exportStar(require("./failed-to-check-for-transaction-receipt.error"), exports);
__exportStar(require("./insufficient-funds.error"), exports);
__exportStar(require("./insufficient-funds-oneinch.error"), exports);
__exportStar(require("./insufficient-liquidity.error"), exports);
__exportStar(require("./lifi-pair-is-unavailable.error"), exports);
__exportStar(require("./low-slippage.error"), exports);
__exportStar(require("./low-slippage-deflationary-token.error"), exports);
__exportStar(require("./max-amount.error"), exports);
__exportStar(require("./min-amount.error"), exports);
__exportStar(require("./not-supported-blockchain"), exports);
__exportStar(require("./not-supported-tokens.error"), exports);
__exportStar(require("./not-whitelisted-provider.error"), exports);
__exportStar(require("./swap-request.error"), exports);
__exportStar(require("./unnecessary-approve.error"), exports);
__exportStar(require("./wallet-not-connected.error"), exports);
__exportStar(require("./wrong-network.error"), exports);
//# sourceMappingURL=index.js.map