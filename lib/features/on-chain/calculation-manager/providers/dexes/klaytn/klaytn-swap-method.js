"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KLAY_SWAP_METHOD = exports.KLAY_EXACT_OUTPUT_SWAP_METHOD = exports.KLAY_EXACT_OUTPUT_SUPPORTING_FEE_SWAP_METHOD = exports.KLAY_EXACT_OUTPUT_REGULAR_SWAP_METHOD = exports.KLAY_EXACT_INPUT_SWAP_METHOD = exports.KLAY_EXACT_INPUT_SUPPORTING_FEE_SWAP_METHOD = exports.KLAY_EXACT_INPUT_REGULAR_SWAP_METHOD = void 0;
exports.KLAY_EXACT_INPUT_REGULAR_SWAP_METHOD = {
    TOKENS_TO_TOKENS: 'swapExactTokensForTokens',
    ETH_TO_TOKENS: 'swapExactKLAYForTokens',
    TOKENS_TO_ETH: 'swapExactTokensForKLAY'
};
exports.KLAY_EXACT_INPUT_SUPPORTING_FEE_SWAP_METHOD = {
    TOKENS_TO_TOKENS_SUPPORTING_FEE: 'swapExactTokensForTokensSupportingFeeOnTransferTokens',
    ETH_TO_TOKENS_SUPPORTING_FEE: 'swapExactKLAYForTokensSupportingFeeOnTransferTokens',
    TOKENS_TO_ETH_SUPPORTING_FEE: 'swapExactTokensForKLAYSupportingFeeOnTransferTokens'
};
exports.KLAY_EXACT_INPUT_SWAP_METHOD = {
    ...exports.KLAY_EXACT_INPUT_REGULAR_SWAP_METHOD,
    ...exports.KLAY_EXACT_INPUT_SUPPORTING_FEE_SWAP_METHOD
};
exports.KLAY_EXACT_OUTPUT_REGULAR_SWAP_METHOD = {
    TOKENS_TO_TOKENS: 'swapTokensForExactTokens',
    ETH_TO_TOKENS: 'swapKLAYForExactTokens',
    TOKENS_TO_ETH: 'swapTokensForExactKLAY'
};
exports.KLAY_EXACT_OUTPUT_SUPPORTING_FEE_SWAP_METHOD = {
    TOKENS_TO_TOKENS_SUPPORTING_FEE: 'swapTokensForExactTokensSupportingFeeOnTransferTokens',
    ETH_TO_TOKENS_SUPPORTING_FEE: 'swapKLAYForExactTokensSupportingFeeOnTransferTokens',
    TOKENS_TO_ETH_SUPPORTING_FEE: 'swapTokensForExactKLAYSupportingFeeOnTransferTokens'
};
exports.KLAY_EXACT_OUTPUT_SWAP_METHOD = {
    ...exports.KLAY_EXACT_OUTPUT_REGULAR_SWAP_METHOD,
    ...exports.KLAY_EXACT_OUTPUT_SUPPORTING_FEE_SWAP_METHOD
};
exports.KLAY_SWAP_METHOD = {
    input: exports.KLAY_EXACT_INPUT_SWAP_METHOD,
    output: exports.KLAY_EXACT_OUTPUT_SWAP_METHOD
};
//# sourceMappingURL=klaytn-swap-method.js.map