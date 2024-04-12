"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGasOptions = exports.deadlineMinutesTimestamp = exports.combineOptions = void 0;
const web3_private_1 = require("../../core/blockchain/web3-private-service/web3-private/web3-private");
function combineOptions(options, defaultOptions) {
    return {
        ...defaultOptions,
        ...options
    };
}
exports.combineOptions = combineOptions;
function deadlineMinutesTimestamp(deadlineMinutes) {
    return Math.floor(Date.now() / 1000 + 60 * deadlineMinutes);
}
exports.deadlineMinutesTimestamp = deadlineMinutesTimestamp;
function getGasOptions(options) {
    const { gasPriceOptions } = options;
    if (!gasPriceOptions)
        return {};
    if ('gasPrice' in gasPriceOptions && gasPriceOptions.gasPrice) {
        return {
            gasPrice: web3_private_1.Web3Private.stringifyAmount(gasPriceOptions.gasPrice)
        };
    }
    if ('maxPriorityFeePerGas' in gasPriceOptions &&
        gasPriceOptions.maxPriorityFeePerGas &&
        gasPriceOptions.maxFeePerGas) {
        return {
            maxPriorityFeePerGas: web3_private_1.Web3Private.stringifyAmount(gasPriceOptions.maxPriorityFeePerGas),
            maxFeePerGas: web3_private_1.Web3Private.stringifyAmount(gasPriceOptions.maxFeePerGas)
        };
    }
    return {};
}
exports.getGasOptions = getGasOptions;
//# sourceMappingURL=options.js.map