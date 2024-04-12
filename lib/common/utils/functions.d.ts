import { Tuple } from 'ts-essentials';
export type SuccessfulCall<T> = {
    success: true;
    value: T;
};
export type ErrorCall = {
    success: false;
    error: unknown;
};
/**
 * Wraps result of function in {@link SuccessfulCall} or {@link ErrorCall}.
 * @param func Function to calculate.
 * @param parameters Parameter of function to calculate.
 */
export declare function tryExecute(func: (...args: any[]) => unknown, parameters: Parameters<typeof func>[]): SuccessfulCall<ReturnType<typeof func>> | ErrorCall;
/**
 * Wraps result of async function in {@link SuccessfulCall} or {@link ErrorCall}.
 * @param func Async function to calculate.
 * @param parameters Parameter of function to calculate.
 */
export declare function tryExecuteAsync<T extends Tuple, R>(func: (...args: T) => Promise<R>, parameters: Parameters<typeof func>): Promise<SuccessfulCall<R> | ErrorCall>;
