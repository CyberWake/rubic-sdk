import { TronWeb3PrimitiveType, Web3PrimitiveType } from "../../../models/web3-primitive-type";
import { TronParameters } from "./models/tron-parameters";
import { TronTransactionConfig } from "./models/tron-transaction-config";
import { AbiItem, AbiOutput } from 'web3-utils';
export declare class TronWeb3Pure {
    static readonly EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";
    static get nativeTokenAddress(): string;
    static isNativeAddress(address: string): boolean;
    static isEmptyAddress(address?: string): boolean;
    static isAddressCorrect(address: string): Promise<boolean>;
    static addressToHex(address: string): string;
    /**
     * Returns transaction config with encoded data.
     */
    static encodeMethodCall(contractAddress: string, contractAbi: AbiItem[], methodName: string, methodArguments?: unknown[], callValue?: string, feeLimit?: number): TronTransactionConfig;
    /**
     * Encodes a function call using its JSON interface object and given parameters.
     * @param contractAbi The JSON interface object of a function.
     * @param methodName Method name to encode.
     * @param methodArguments Parameters to encode.
     * @returns An ABI encoded function call. Means function signature + parameters.
     */
    static encodeFunctionCall(contractAbi: AbiItem[], methodName: string, methodArguments: unknown[]): string;
    static encodeMethodSignature(methodSignature: string, parameters: TronParameters): string;
    /**
     * Decodes method result using its JSON interface object and given parameters.
     * @param outputAbi The JSON interface object of an output of function.
     * @param response Bytes code returned after method call.
     * @returns Parsed method output.
     */
    static decodeMethodOutput(outputAbi: AbiOutput[], response: string): Web3PrimitiveType;
    private static flattenTypesToString;
    private static flattenTypesToArray;
    private static flattenParameters;
    static flattenParameterToPrimitive(parameter: TronWeb3PrimitiveType): Web3PrimitiveType;
}
