import BigNumber from 'bignumber.js';
import { PriceTokenAmount, Token } from "../../../../../../../common/tokens";
import { EvmEncodeConfig } from "../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/models/evm-encode-config";
import { EncodeTransactionOptions } from "../../../../../../common/models/encode-transaction-options";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { EvmOnChainTrade } from "../../../common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade";
import { OneinchTradeStruct } from "./models/oneinch-trade-struct";
export declare class OneinchTrade extends EvmOnChainTrade {
    /** @internal */
    static getGasLimit(tradeStruct: OneinchTradeStruct): Promise<BigNumber | null>;
    /** @internal */
    static checkIfNeedApproveAndThrowError(from: PriceTokenAmount, toToken: Token, fromWithoutFee: PriceTokenAmount, fromAddress: string, useProxy: boolean): Promise<void | never>;
    readonly dexContractAddress: string;
    private readonly nativeSupportedFromWithoutFee;
    private readonly nativeSupportedTo;
    private readonly disableMultihops;
    private readonly availableProtocols;
    /**
     * @internal
     * Path with wrapped native address.
     */
    readonly wrappedPath: ReadonlyArray<Token>;
    /** @internal */
    readonly transactionData: string | null;
    get type(): OnChainTradeType;
    constructor(tradeStruct: OneinchTradeStruct, providerAddress: string);
    encodeDirect(options: EncodeTransactionOptions): Promise<EvmEncodeConfig>;
    private getTradeData;
    private getResponseFromApiToTransactionRequest;
    private specifyError;
}
