import BigNumber from 'bignumber.js';
import { PriceToken } from "../../../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../../../core/blockchain/models/blockchain-name";
import { MethodData } from "../../../../../../../core/blockchain/web3-public-service/web3-public/models/method-data";
import { EvmEncodeConfig } from "../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/models/evm-encode-config";
import { EncodeTransactionOptions } from "../../../../../../common/models/encode-transaction-options";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { EvmOnChainTrade } from "../../../common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade";
import { Exact } from "../../../common/on-chain-trade/evm-on-chain-trade/models/exact";
import { CreateTradeInstance } from "./models/create-trade-instance";
import { UniswapV3AlgebraRoute } from "./models/uniswap-v3-algebra-route";
import { UniswapV3AlgebraTradeStruct } from "./models/uniswap-v3-algebra-trade-struct";
import { UnwrapWethMethodName } from "./models/unwrapWethMethodName";
import { AbiItem } from 'web3-utils';
interface EstimateGasOptions {
    slippageTolerance: number;
    deadlineMinutes: number;
}
export declare abstract class UniswapV3AlgebraAbstractTrade extends EvmOnChainTrade {
    static get type(): OnChainTradeType;
    static estimateGasLimitForRoute(fromToken: PriceToken<EvmBlockchainName>, toToken: PriceToken<EvmBlockchainName>, exact: Exact, weiAmount: BigNumber, options: EstimateGasOptions, route: UniswapV3AlgebraRoute, createTradeInstance: CreateTradeInstance): Promise<BigNumber>;
    static estimateGasLimitForRoutes(fromToken: PriceToken<EvmBlockchainName>, toToken: PriceToken<EvmBlockchainName>, exact: Exact, weiAmount: BigNumber, options: EstimateGasOptions, routes: UniswapV3AlgebraRoute[], createTradeInstance: CreateTradeInstance): Promise<BigNumber[]>;
    private static getEstimateGasParams;
    protected abstract readonly contractAbi: AbiItem[];
    protected abstract readonly unwrapWethMethodName: UnwrapWethMethodName;
    protected readonly exact: Exact;
    deadlineMinutes: number;
    get type(): OnChainTradeType;
    protected get deadlineMinutesTimestamp(): number;
    private get defaultEstimatedGas();
    protected constructor(tradeStruct: UniswapV3AlgebraTradeStruct, providerAddress: string);
    protected getAmountParams(): [string, string];
    /**
     * Returns swap `exactInput` method's name and arguments to use in `swap contract`.
     */
    protected abstract getSwapRouterExactInputMethodData(walletAddress: string): MethodData;
    encodeDirect(options: EncodeTransactionOptions): Promise<EvmEncodeConfig>;
    private getSwapRouterMethodData;
    /**
     * Returns encoded data of estimated gas function and default estimated gas.
     */
    private getEstimateGasParams;
}
export {};
