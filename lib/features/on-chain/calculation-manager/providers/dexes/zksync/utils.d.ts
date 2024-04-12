import { BigNumber } from 'ethers';
interface GetAmountOutParams {
    amountIn: BigNumber;
    reserveIn: BigNumber;
    reserveOut: BigNumber;
    swapFee: BigNumber;
    A?: BigNumber;
    tokenInPrecisionMultiplier?: BigNumber;
    tokenOutPrecisionMultiplier?: BigNumber;
}
export declare function getAmountOutStable(params: GetAmountOutParams): BigNumber;
export {};
