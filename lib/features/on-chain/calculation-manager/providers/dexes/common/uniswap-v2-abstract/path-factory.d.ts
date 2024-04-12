import BigNumber from 'bignumber.js';
import { PriceToken } from "../../../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../../../core/blockchain/models/blockchain-name";
import { OnChainProxyFeeInfo } from "../../../common/models/on-chain-proxy-fee-info";
import { Exact } from "../../../common/on-chain-trade/evm-on-chain-trade/models/exact";
import { UniswapCalculatedInfo } from "./models/uniswap-calculated-info";
import { UniswapRoute } from "./models/uniswap-route";
import { UniswapV2CalculationOptions } from "./models/uniswap-v2-calculation-options";
import { UniswapV2ProviderConfiguration } from "./models/uniswap-v2-provider-configuration";
import { UniswapV2TradeClass } from "./models/uniswap-v2-trade-class";
import { UniswapV2AbstractTrade } from "./uniswap-v2-abstract-trade";
export interface PathFactoryStruct {
    readonly from: PriceToken<EvmBlockchainName>;
    readonly to: PriceToken<EvmBlockchainName>;
    readonly weiAmount: BigNumber;
    readonly exact: Exact;
    readonly options: UniswapV2CalculationOptions;
    readonly proxyFeeInfo: OnChainProxyFeeInfo | undefined;
}
export interface UniswapV2AbstractProviderStruct<T extends UniswapV2AbstractTrade> {
    readonly UniswapV2TradeClass: UniswapV2TradeClass<T>;
    readonly providerSettings: UniswapV2ProviderConfiguration;
}
export declare class PathFactory<T extends UniswapV2AbstractTrade> {
    private readonly web3Public;
    protected readonly from: PriceToken<EvmBlockchainName>;
    protected readonly to: PriceToken<EvmBlockchainName>;
    private readonly weiAmount;
    protected readonly exact: Exact;
    private readonly options;
    private readonly proxyFeeInfo;
    protected readonly UniswapV2TradeClass: UniswapV2TradeClass<T>;
    protected readonly routingProvidersAddresses: ReadonlyArray<string>;
    protected readonly maxTransitTokens: number;
    private get walletAddress();
    protected get stringWeiAmount(): string;
    constructor(uniswapProviderStruct: UniswapV2AbstractProviderStruct<T>, pathFactoryStruct: PathFactoryStruct);
    getAmountAndPath(gasPriceInUsd: BigNumber | undefined): Promise<UniswapCalculatedInfo>;
    private getGasRequests;
    private getDefaultGases;
    private getTradesByRoutes;
    protected getAllRoutes(): Promise<UniswapRoute[]>;
}
