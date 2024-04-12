import { PriceToken, PriceTokenAmount } from "../../../../../common/tokens";
import { SymbiosisSwapRequestOptions } from '../models/symbiosis-api-parser-types';
import { SymbiosisSwapRequestBody } from '../models/symbiosis-api-swap-types';
export declare class SymbiosisParser {
    static getSwapRequestBody(fromToken: PriceTokenAmount, toToken: PriceToken, options: SymbiosisSwapRequestOptions): SymbiosisSwapRequestBody;
}
