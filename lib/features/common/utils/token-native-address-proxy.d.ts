import { Token } from "../../../common/tokens";
export declare function createTokenNativeAddressProxy<T extends Token>(token: T, wrappedNativeAddress: string, useLowerCase?: boolean): T;
export declare function createTokenNativeAddressProxyInPathStartAndEnd<T extends Token>(path: T[] | ReadonlyArray<T>, wrappedNativeAddress: string): ReadonlyArray<T>;
