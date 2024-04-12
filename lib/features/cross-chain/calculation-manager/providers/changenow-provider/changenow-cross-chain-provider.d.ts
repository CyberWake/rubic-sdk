import { PriceToken, PriceTokenAmount } from "../../../../../common/tokens";
import { BlockchainName } from "../../../../../core/blockchain/models/blockchain-name";
import { Web3PublicSupportedBlockchain } from "../../../../../core/blockchain/web3-public-service/models/web3-public-storage";
import { RequiredCrossChainOptions } from "../../models/cross-chain-options";
import { ChangenowCrossChainSupportedBlockchain } from "./constants/changenow-api-blockchain";
import { ChangenowProxySupportedBlockchain } from "./constants/changenow-proxy-supported-blockchains";
import { CrossChainProvider } from "../common/cross-chain-provider";
import { CalculationResult } from "../common/models/calculation-result";
import { FeeInfo } from "../common/models/fee-info";
import { RubicStep } from "../common/models/rubicStep";
export declare class ChangenowCrossChainProvider extends CrossChainProvider {
    readonly type: "changenow";
    isSupportedBlockchain(blockchain: BlockchainName): blockchain is ChangenowCrossChainSupportedBlockchain;
    isSupportedProxyBlockchain(blockchain: BlockchainName): blockchain is ChangenowProxySupportedBlockchain;
    calculate(from: PriceTokenAmount, toToken: PriceToken, options: RequiredCrossChainOptions): Promise<CalculationResult>;
    private getChangenowCurrencies;
    private checkMinMaxAmounts;
    private isNativeAddress;
    private getToAmount;
    private getMinMaxRange;
    protected getFeeInfo(fromBlockchain: Web3PublicSupportedBlockchain, providerAddress: string, percentFeeToken: PriceTokenAmount, useProxy: boolean): Promise<FeeInfo>;
    private getOnChainTrade;
    private getCurrency;
    private getTransitCurrency;
    protected getRoutePath(from: PriceTokenAmount, to: PriceTokenAmount): Promise<RubicStep[]>;
}
