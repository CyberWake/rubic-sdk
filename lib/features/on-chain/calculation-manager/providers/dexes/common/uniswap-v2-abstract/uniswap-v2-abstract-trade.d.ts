import BigNumber from 'bignumber.js';
import { Token } from "../../../../../../../common/tokens";
import { BlockchainName, EvmBlockchainName } from "../../../../../../../core/blockchain/models/blockchain-name";
import { BatchCall } from "../../../../../../../core/blockchain/web3-public-service/web3-public/evm-web3-public/models/batch-call";
import { ContractMulticallResponse } from "../../../../../../../core/blockchain/web3-public-service/web3-public/models/contract-multicall-response";
import { EvmEncodeConfig } from "../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/models/evm-encode-config";
import { EncodeTransactionOptions } from "../../../../../../common/models/encode-transaction-options";
import { SwapTransactionOptions } from "../../../../../../common/models/swap-transaction-options";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { EvmOnChainTrade } from "../../../common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade";
import { Exact } from "../../../common/on-chain-trade/evm-on-chain-trade/models/exact";
import { ExactInputOutputSwapMethodsList } from "./constants/SWAP_METHOD";
import { AerodromeRoutePoolArgument } from "./models/aerodrome-route-method-arguments";
import { DefaultEstimatedGas } from "./models/default-estimated-gas";
import { ExtendedRoutesMethodArguments } from "./models/route-method-arguments";
import { UniswapV2TradeStruct } from "./models/uniswap-v2-trade-struct";
import { AbiItem } from 'web3-utils';
export declare abstract class UniswapV2AbstractTrade extends EvmOnChainTrade {
    /** @internal */
    static getDexContractAddress(blockchain: BlockchainName): string;
    static get type(): OnChainTradeType;
    /** @internal */
    static readonly contractAbi: AbiItem[];
    /** @internal */
    static readonly swapMethods: ExactInputOutputSwapMethodsList;
    /** @internal */
    static readonly defaultEstimatedGasInfo: DefaultEstimatedGas;
    static callForRoutes(blockchain: EvmBlockchainName, exact: Exact, routesMethodArguments: ExtendedRoutesMethodArguments): Promise<ContractMulticallResponse<string[]>[]>;
    /**
     * Deadline for transaction in minutes.
     */
    readonly deadlineMinutes: number;
    /**
     * @internal
     * Path with wrapped native address.
     */
    readonly wrappedPath: ReadonlyArray<Token>;
    readonly routPoolInfo: AerodromeRoutePoolArgument[] | undefined;
    /**
     * Defines, whether to call 'exactInput' or 'exactOutput' method.
     */
    readonly exact: Exact;
    get type(): OnChainTradeType;
    protected get deadlineMinutesTimestamp(): number;
    protected get nativeValueToSend(): string | undefined;
    private get regularSwapMethod();
    private get supportedFeeSwapMethod();
    private get regularSwapMethodKey();
    constructor(tradeStruct: UniswapV2TradeStruct, providerAddress: string);
    protected getAmountInAndAmountOut(): {
        amountIn: string;
        amountOut: string;
    };
    encodeDirect(options: EncodeTransactionOptions): Promise<EvmEncodeConfig>;
    protected getCallParameters(receiverAddress?: string): unknown[];
    protected getMethodName(options: SwapTransactionOptions, fromAddress?: string, supportFee?: boolean): Promise<string>;
    private getSwapParametersByMethod;
    private convertSwapParametersToCallParameters;
    /** @internal */
    getEstimatedGasCallData(): Promise<BatchCall>;
    /** @internal */
    getDefaultEstimatedGas(): BigNumber;
}
