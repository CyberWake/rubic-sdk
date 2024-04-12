"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openOceanApiUrl = void 0;
exports.openOceanApiUrl = {
    tokenList: (chain) => `https://x-api.rubic.exchange/oo/api/token_list/${chain}`,
    quote: (chain) => `https://x-api.rubic.exchange/oo/api/v3/${chain}/quote`,
    swapQuote: (chain) => `https://x-api.rubic.exchange/oo/api/v3/${chain}/swap_quote`
};
//# sourceMappingURL=get-open-ocean-api-url.js.map