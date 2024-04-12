"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ETH_SWAP_METHOD = exports.ETH_EXACT_OUTPUT_SWAP_METHOD = exports.ETH_EXACT_OUTPUT_SUPPORTING_FEE_SWAP_METHOD = exports.ETH_EXACT_OUTPUT_REGULAR_SWAP_METHOD = exports.ETH_EXACT_INPUT_SWAP_METHOD = exports.ETH_EXACT_INPUT_SUPPORTING_FEE_SWAP_METHOD = exports.ETH_EXACT_INPUT_REGULAR_SWAP_METHOD = void 0;
exports.ETH_EXACT_INPUT_REGULAR_SWAP_METHOD = {
    TOKENS_TO_TOKENS: 'swapExactTokensForTokens',
    ETH_TO_TOKENS: 'swapExactETHForTokens',
    TOKENS_TO_ETH: 'swapExactTokensForETH'
};
exports.ETH_EXACT_INPUT_SUPPORTING_FEE_SWAP_METHOD = {
    TOKENS_TO_TOKENS_SUPPORTING_FEE: 'swapExactTokensForTokensSupportingFeeOnTransferTokens',
    ETH_TO_TOKENS_SUPPORTING_FEE: 'swapExactETHForTokensSupportingFeeOnTransferTokens',
    TOKENS_TO_ETH_SUPPORTING_FEE: 'swapExactTokensForETHSupportingFeeOnTransferTokens'
};
exports.ETH_EXACT_INPUT_SWAP_METHOD = {
    ...exports.ETH_EXACT_INPUT_REGULAR_SWAP_METHOD,
    ...exports.ETH_EXACT_INPUT_SUPPORTING_FEE_SWAP_METHOD
};
exports.ETH_EXACT_OUTPUT_REGULAR_SWAP_METHOD = {
    TOKENS_TO_TOKENS: 'swapTokensForExactTokens',
    ETH_TO_TOKENS: 'swapETHForExactTokens',
    TOKENS_TO_ETH: 'swapTokensForExactETH'
};
exports.ETH_EXACT_OUTPUT_SUPPORTING_FEE_SWAP_METHOD = {
    TOKENS_TO_TOKENS_SUPPORTING_FEE: 'swapTokensForExactTokensSupportingFeeOnTransferTokens',
    ETH_TO_TOKENS_SUPPORTING_FEE: 'swapETHForExactTokensSupportingFeeOnTransferTokens',
    TOKENS_TO_ETH_SUPPORTING_FEE: 'swapTokensForExactETHSupportingFeeOnTransferTokens'
};
exports.ETH_EXACT_OUTPUT_SWAP_METHOD = {
    ...exports.ETH_EXACT_OUTPUT_REGULAR_SWAP_METHOD,
    ...exports.ETH_EXACT_OUTPUT_SUPPORTING_FEE_SWAP_METHOD
};
exports.ETH_SWAP_METHOD = {
    input: exports.ETH_EXACT_INPUT_SWAP_METHOD,
    output: exports.ETH_EXACT_OUTPUT_SWAP_METHOD
};
//# sourceMappingURL=dex-trader-swap-method.js.map