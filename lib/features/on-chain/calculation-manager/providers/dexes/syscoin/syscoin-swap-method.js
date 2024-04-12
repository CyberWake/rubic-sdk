"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYS_SWAP_METHOD = exports.SYS_EXACT_OUTPUT_SWAP_METHOD = exports.SYS_EXACT_OUTPUT_SUPPORTING_FEE_SWAP_METHOD = exports.SYS_EXACT_OUTPUT_REGULAR_SWAP_METHOD = exports.SYS_EXACT_INPUT_SWAP_METHOD = exports.SYS_EXACT_INPUT_SUPPORTING_FEE_SWAP_METHOD = exports.SYS_EXACT_INPUT_REGULAR_SWAP_METHOD = void 0;
exports.SYS_EXACT_INPUT_REGULAR_SWAP_METHOD = {
    TOKENS_TO_TOKENS: 'swapExactTokensForTokens',
    ETH_TO_TOKENS: 'swapExactSYSForTokens',
    TOKENS_TO_ETH: 'swapExactTokensForSYS'
};
exports.SYS_EXACT_INPUT_SUPPORTING_FEE_SWAP_METHOD = {
    TOKENS_TO_TOKENS_SUPPORTING_FEE: 'swapExactTokensForTokensSupportingFeeOnTransferTokens',
    ETH_TO_TOKENS_SUPPORTING_FEE: 'swapExactSYSForTokensSupportingFeeOnTransferTokens',
    TOKENS_TO_ETH_SUPPORTING_FEE: 'swapExactTokensForSYSSupportingFeeOnTransferTokens'
};
exports.SYS_EXACT_INPUT_SWAP_METHOD = {
    ...exports.SYS_EXACT_INPUT_REGULAR_SWAP_METHOD,
    ...exports.SYS_EXACT_INPUT_SUPPORTING_FEE_SWAP_METHOD
};
exports.SYS_EXACT_OUTPUT_REGULAR_SWAP_METHOD = {
    TOKENS_TO_TOKENS: 'swapTokensForExactTokens',
    ETH_TO_TOKENS: 'swapSYSForExactTokens',
    TOKENS_TO_ETH: 'swapTokensForExactSYS'
};
exports.SYS_EXACT_OUTPUT_SUPPORTING_FEE_SWAP_METHOD = {
    TOKENS_TO_TOKENS_SUPPORTING_FEE: 'swapTokensForExactTokensSupportingFeeOnTransferTokens',
    ETH_TO_TOKENS_SUPPORTING_FEE: 'swapSYSForExactTokensSupportingFeeOnTransferTokens',
    TOKENS_TO_ETH_SUPPORTING_FEE: 'swapTokensForExactSYSSupportingFeeOnTransferTokens'
};
exports.SYS_EXACT_OUTPUT_SWAP_METHOD = {
    ...exports.SYS_EXACT_OUTPUT_REGULAR_SWAP_METHOD,
    ...exports.SYS_EXACT_OUTPUT_SUPPORTING_FEE_SWAP_METHOD
};
exports.SYS_SWAP_METHOD = {
    input: exports.SYS_EXACT_INPUT_SWAP_METHOD,
    output: exports.SYS_EXACT_OUTPUT_SWAP_METHOD
};
//# sourceMappingURL=syscoin-swap-method.js.map