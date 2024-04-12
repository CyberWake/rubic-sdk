"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFromWithoutFee = void 0;
const tokens_1 = require("../../../common/tokens");
const web3_pure_1 = require("../../../core/blockchain/web3-pure/web3-pure");
function getFromWithoutFee(from, platformFeePercent) {
    if (!platformFeePercent) {
        return new tokens_1.PriceTokenAmount({
            ...from.asStruct,
            weiAmount: from.weiAmount
        });
    }
    const feeAmount = web3_pure_1.Web3Pure.toWei(from.tokenAmount.multipliedBy(platformFeePercent).dividedBy(100), from.decimals, 1);
    return new tokens_1.PriceTokenAmount({
        ...from.asStruct,
        weiAmount: from.weiAmount.minus(feeAmount)
    });
}
exports.getFromWithoutFee = getFromWithoutFee;
//# sourceMappingURL=get-from-without-fee.js.map