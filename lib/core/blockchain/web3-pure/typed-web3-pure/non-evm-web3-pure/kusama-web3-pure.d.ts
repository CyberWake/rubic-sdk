export declare class KusamaWeb3Pure {
    static readonly EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";
    static get nativeTokenAddress(): string;
    static isNativeAddress(address: string): boolean;
    static isEmptyAddress(address?: string): boolean;
    static isAddressCorrect(address: string): Promise<boolean>;
}
