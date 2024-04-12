"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
function isCancelablePromise(promise) {
    return ('cancel' in promise &&
        typeof promise.cancel === 'function');
}
function pTimeout(promise, milliseconds, fallback, options) {
    let timer;
    const clearablePromise = new Promise((resolve, reject) => {
        if (Math.sign(milliseconds) !== 1) {
            throw new TypeError(`Expected \`milliseconds\` to be a positive number, got \`${milliseconds}\``);
        }
        if (milliseconds === Number.POSITIVE_INFINITY) {
            resolve(promise);
            return;
        }
        options = {
            customTimers: { setTimeout, clearTimeout },
            ...options
        };
        timer = options.customTimers.setTimeout.call(undefined, () => {
            if (typeof fallback === 'function') {
                try {
                    resolve(fallback());
                }
                catch (error) {
                    reject(error);
                }
                return;
            }
            const message = typeof fallback === 'string'
                ? fallback
                : `Promise timed out after ${milliseconds} milliseconds`;
            const timeoutError = fallback instanceof Error ? fallback : new errors_1.TimeoutError(message);
            if (isCancelablePromise(promise)) {
                promise.cancel();
            }
            reject(timeoutError);
        }, milliseconds);
        (async () => {
            try {
                resolve(await promise);
            }
            catch (error) {
                reject(error);
            }
            finally {
                options.customTimers.clearTimeout.call(undefined, timer);
            }
        })();
    });
    clearablePromise.clear = () => {
        clearTimeout(timer);
        timer = undefined;
    };
    return clearablePromise;
}
exports.default = pTimeout;
//# sourceMappingURL=p-timeout.js.map