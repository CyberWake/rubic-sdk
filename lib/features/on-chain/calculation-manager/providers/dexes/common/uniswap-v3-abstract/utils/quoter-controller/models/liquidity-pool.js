"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiquidityPool = void 0;
const blockchain_1 = require("../../../../../../../../../../common/utils/blockchain");
/**
 * Represents liquidity pool in uni v3.
 */
class LiquidityPool {
    constructor(address, token0, token1, fee) {
        this.address = address;
        this.token0 = token0;
        this.token1 = token1;
        this.fee = fee;
    }
    /**
     * Checks if the pool contains passed tokens.
     * @param tokenA First token address.
     * @param tokenB Second token address.
     */
    isPoolWithTokens(tokenA, tokenB) {
        return (((0, blockchain_1.compareAddresses)(this.token0.address, tokenA) &&
            (0, blockchain_1.compareAddresses)(this.token1.address, tokenB)) ||
            ((0, blockchain_1.compareAddresses)(this.token1.address, tokenA) &&
                (0, blockchain_1.compareAddresses)(this.token0.address, tokenB)));
    }
}
exports.LiquidityPool = LiquidityPool;
//# sourceMappingURL=liquidity-pool.js.map