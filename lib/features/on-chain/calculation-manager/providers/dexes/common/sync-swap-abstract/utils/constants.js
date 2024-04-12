"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ETHER = exports.MAX_XP = exports.UINT256_MAX = exports.UINT128_MAX = exports.granularity = exports.FOUR = exports.THREE = exports.TWO = exports.ONE = exports.ZERO = exports.STABLE_POOL_A = exports.MAX_FEE = exports.MAX_LOOP_LIMIT = void 0;
const ethers_1 = require("ethers");
exports.MAX_LOOP_LIMIT = 256;
exports.MAX_FEE = ethers_1.BigNumber.from(100000); // 1e5
exports.STABLE_POOL_A = ethers_1.BigNumber.from(1000);
exports.ZERO = ethers_1.BigNumber.from(0);
exports.ONE = ethers_1.BigNumber.from(1);
exports.TWO = ethers_1.BigNumber.from(2);
exports.THREE = ethers_1.BigNumber.from(3);
exports.FOUR = ethers_1.BigNumber.from(4);
exports.granularity = 10; // div to 10 parts
exports.UINT128_MAX = ethers_1.BigNumber.from(2).pow(128).sub(1);
exports.UINT256_MAX = ethers_1.BigNumber.from(2).pow(256).sub(1);
// @TODO SyncSwap
exports.MAX_XP = ethers_1.BigNumber.from(2).pow(256).sub(1);
exports.ETHER = ethers_1.BigNumber.from(10).pow(18);
//# sourceMappingURL=constants.js.map