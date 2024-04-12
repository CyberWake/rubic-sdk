"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryExecuteAsync = exports.tryExecute = void 0;
/**
 * Wraps result of function in {@link SuccessfulCall} or {@link ErrorCall}.
 * @param func Function to calculate.
 * @param parameters Parameter of function to calculate.
 */
function tryExecute(func, parameters) {
    try {
        const value = func(...parameters);
        return {
            success: true,
            value
        };
    }
    catch (error) {
        return {
            success: false,
            error
        };
    }
}
exports.tryExecute = tryExecute;
/**
 * Wraps result of async function in {@link SuccessfulCall} or {@link ErrorCall}.
 * @param func Async function to calculate.
 * @param parameters Parameter of function to calculate.
 */
async function tryExecuteAsync(func, parameters) {
    try {
        const value = await func(...parameters);
        return {
            success: true,
            value
        };
    }
    catch (error) {
        return {
            success: false,
            error
        };
    }
}
exports.tryExecuteAsync = tryExecuteAsync;
//# sourceMappingURL=functions.js.map