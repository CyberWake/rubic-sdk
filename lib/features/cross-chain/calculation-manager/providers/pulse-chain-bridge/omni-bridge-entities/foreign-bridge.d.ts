import BigNumber from 'bignumber.js';
import { EvmEncodeConfig } from "../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/models/evm-encode-config";
import { OmniBridge } from "./omni-bridge";
export declare class ForeignBridge extends OmniBridge {
    isTokenRegistered(address: string): Promise<boolean>;
    protected isRegisteredAsNative(address: string): Promise<boolean>;
    protected getNonNativeToken(address: string): Promise<string>;
    protected getNativeToken(address: string): Promise<string>;
    getMinAmountToken(address: string): Promise<BigNumber>;
    protected checkSourceLimits(address: string, amount: string): Promise<void>;
    protected checkTargetLimits(address: string, amount: string): Promise<void>;
    getDataForNativeSwap(receiverAddress: string, value: string): EvmEncodeConfig;
    getDataForTokenSwap(receiverAddress: string, amount: string, isERC677: boolean, tokenAddress: string): EvmEncodeConfig;
}
