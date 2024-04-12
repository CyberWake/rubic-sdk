"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitFor = void 0;
async function waitFor(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
exports.waitFor = waitFor;
//# sourceMappingURL=waitFor.js.map