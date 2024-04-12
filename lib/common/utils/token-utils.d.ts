import BigNumber from 'bignumber.js';
export declare class TokenUtils {
    static getMinWeiAmount(weiAmount: BigNumber, slippage: number): BigNumber;
    static getMaxWeiAmount(weiAmount: BigNumber, slippage: number): BigNumber;
    static getMinWeiAmountString(weiAmount: BigNumber, slippage: number): string;
    static getMaxWeiAmountString(weiAmount: BigNumber, slippage: number): string;
}
