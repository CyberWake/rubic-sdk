import { Result } from 'ethers/lib/utils';
import { EvmEncodeConfig } from "./models/evm-encode-config";
import { TransactionGasParams } from "../../../../../features/on-chain/calculation-manager/providers/common/on-chain-trade/evm-on-chain-trade/models/gas-params";
import { AbiItem } from 'web3-utils';
export type DecodeResult<T> = Result & T;
export declare class EvmWeb3Pure {
    static readonly EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";
    private static web3Eth;
    static get nativeTokenAddress(): string;
    static isNativeAddress(address: string): boolean;
    static isEmptyAddress(address?: string): boolean;
    static isAddressCorrect(address: string): Promise<boolean>;
    static encodeParameters(types: string[], params: unknown[]): string;
    /**
     * Converts address to bytes32 format.
     * @param address Address to convert.
     */
    static addressToBytes32(address: string): string;
    /**
     * Converts ascii address to bytes32 format.
     * @param address Address to convert.
     */
    static asciiToBytes32(address: string): string;
    /**
     * Generate random HEX strings from a given byte size.
     * @param size byte size.
     */
    static randomHex(size: number): string;
    /**
     * Returns transaction config with encoded data.
     */
    static encodeMethodCall(contractAddress: string, contractAbi: AbiItem[], method: string, parameters?: unknown[], value?: string, options?: TransactionGasParams): EvmEncodeConfig;
    /**
     * Encodes a function call using its JSON interface object and given parameters.
     * @param contractAbi The JSON interface object of a function.
     * @param methodName Method name to encode.
     * @param methodArguments Parameters to encode.
     * @returns An ABI encoded function call. Means function signature + parameters.
     */
    static encodeFunctionCall(contractAbi: AbiItem[], methodName: string, methodArguments: unknown[]): string;
    /**
     * Converts address to checksum format.
     * @param address Address to convert.
     */
    static toChecksumAddress(address: string): string;
    /**
     * Decodes data by ABI.
     * @param functionName Function name in ABI.
     * @param functionArguments Array of function's inputs.
     * @param data Data (hex string).
     * @returns Decoded data.
     */
    static decodeData<T>(functionName: string, functionArguments: Array<[type: string, name: string]>, data: string): T;
}
