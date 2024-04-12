"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.METIS_SWAP_METHOD = exports.METIS_EXACT_OUTPUT_SWAP_METHOD = exports.METIS_EXACT_OUTPUT_SUPPORTING_FEE_SWAP_METHOD = exports.METIS_EXACT_OUTPUT_REGULAR_SWAP_METHOD = exports.METIS_EXACT_INPUT_SWAP_METHOD = exports.METIS_EXACT_INPUT_SUPPORTING_FEE_SWAP_METHOD = exports.METIS_EXACT_INPUT_REGULAR_SWAP_METHOD = void 0;
exports.METIS_EXACT_INPUT_REGULAR_SWAP_METHOD = {
    TOKENS_TO_TOKENS: 'swapExactTokensForTokens',
    ETH_TO_TOKENS: 'swapExactMetisForTokens',
    TOKENS_TO_ETH: 'swapExactTokensForMetis'
};
exports.METIS_EXACT_INPUT_SUPPORTING_FEE_SWAP_METHOD = {
    TOKENS_TO_TOKENS_SUPPORTING_FEE: 'swapExactTokensForTokensSupportingFeeOnTransferTokens',
    ETH_TO_TOKENS_SUPPORTING_FEE: 'swapExactMetisForTokensSupportingFeeOnTransferTokens',
    TOKENS_TO_ETH_SUPPORTING_FEE: 'swapExactTokensForMetisSupportingFeeOnTransferTokens'
};
exports.METIS_EXACT_INPUT_SWAP_METHOD = {
    ...exports.METIS_EXACT_INPUT_REGULAR_SWAP_METHOD,
    ...exports.METIS_EXACT_INPUT_SUPPORTING_FEE_SWAP_METHOD
};
exports.METIS_EXACT_OUTPUT_REGULAR_SWAP_METHOD = {
    TOKENS_TO_TOKENS: 'swapTokensForExactTokens',
    ETH_TO_TOKENS: 'swapMetisForExactTokens',
    TOKENS_TO_ETH: 'swapTokensForExactMetis'
};
exports.METIS_EXACT_OUTPUT_SUPPORTING_FEE_SWAP_METHOD = {
    TOKENS_TO_TOKENS_SUPPORTING_FEE: 'swapTokensForExactTokensSupportingFeeOnTransferTokens',
    ETH_TO_TOKENS_SUPPORTING_FEE: 'swapMetisForExactTokensSupportingFeeOnTransferTokens',
    TOKENS_TO_ETH_SUPPORTING_FEE: 'swapTokensForExactMetisSupportingFeeOnTransferTokens'
};
exports.METIS_EXACT_OUTPUT_SWAP_METHOD = {
    ...exports.METIS_EXACT_OUTPUT_REGULAR_SWAP_METHOD,
    ...exports.METIS_EXACT_OUTPUT_SUPPORTING_FEE_SWAP_METHOD
};
exports.METIS_SWAP_METHOD = {
    input: exports.METIS_EXACT_INPUT_SWAP_METHOD,
    output: exports.METIS_EXACT_OUTPUT_SWAP_METHOD
};
//# sourceMappingURL=metis-swap-methods.js.map