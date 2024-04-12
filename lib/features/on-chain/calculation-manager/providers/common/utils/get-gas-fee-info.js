"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGasFeeInfo = void 0;
const web3_pure_1 = require("../../../../../../core/blockchain/web3-pure/web3-pure");
function getGasFeeInfo(estimatedGas, gasPriceInfo) {
    const gasLimit = estimatedGas ? web3_pure_1.Web3Pure.calculateGasMargin(estimatedGas, 1.2) : undefined;
    if (!gasLimit) {
        return { gasPrice: gasPriceInfo?.gasPrice };
    }
    const gasFeeInEth = gasPriceInfo?.gasPriceInEth?.multipliedBy(gasLimit);
    const gasFeeInUsd = gasPriceInfo?.gasPriceInUsd?.multipliedBy(gasLimit);
    return {
        gasLimit,
        gasPrice: gasPriceInfo?.gasPrice,
        gasFeeInEth,
        gasFeeInUsd,
        maxFeePerGas: gasPriceInfo?.maxFeePerGas
    };
}
exports.getGasFeeInfo = getGasFeeInfo;
//# sourceMappingURL=get-gas-fee-info.js.map