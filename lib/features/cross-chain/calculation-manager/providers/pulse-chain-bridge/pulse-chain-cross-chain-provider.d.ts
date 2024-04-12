import { PriceToken, PriceTokenAmount } from "../../../../../common/tokens";
import { BlockchainName, EvmBlockchainName } from "../../../../../core/blockchain/models/blockchain-name";
import { RequiredCrossChainOptions } from "../../models/cross-chain-options";
import { CrossChainProvider } from "../common/cross-chain-provider";
import { CalculationResult } from "../common/models/calculation-result";
import { FeeInfo } from "../common/models/fee-info";
import { RubicStep } from "../common/models/rubicStep";
import { PulseChainCrossChainSupportedBlockchain } from "./constants/pulse-chain-supported-blockchains";
import { EvmOnChainTrade } from "../../../../on-chain/calculation-manager/providers/common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade";
export declare class PulseChainCrossChainProvider extends CrossChainProvider {
    readonly type: "pulsechain_bridge";
    isSupportedBlockchain(blockchain: BlockchainName): blockchain is PulseChainCrossChainSupportedBlockchain;
    calculate(fromToken: PriceTokenAmount<EvmBlockchainName>, toToken: PriceToken<EvmBlockchainName>, options: RequiredCrossChainOptions): Promise<CalculationResult>;
    private getOnChainTrade;
    private getMinMaxAmountsErrors;
    protected getFeeInfo(fromBlockchain: PulseChainCrossChainSupportedBlockchain, providerAddress: string, percentFeeToken: PriceTokenAmount, useProxy: boolean): Promise<FeeInfo>;
    protected getRoutePath(from: PriceTokenAmount, transit: PriceTokenAmount, to: PriceTokenAmount, onChainTrade: EvmOnChainTrade | null): Promise<RubicStep[]>;
    private getTokenAddress;
}
