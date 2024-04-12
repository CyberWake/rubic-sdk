import { PriceToken, PriceTokenAmount } from "../../../../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../../../../core/blockchain/models/blockchain-name";
import { EvmWeb3Public } from "../../../../../../../../core/blockchain/web3-public-service/web3-public/evm-web3-public/evm-web3-public";
import { OnChainCalculationOptions, RequiredOnChainCalculationOptions } from "../../../../common/models/on-chain-calculation-options";
import { OnChainProxyFeeInfo } from "../../../../common/models/on-chain-proxy-fee-info";
import { OnChainProxyService } from "../../../../common/on-chain-proxy-service/on-chain-proxy-service";
import { EvmOnChainTrade } from "../../../../common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade";
import { GasPriceInfo } from "./models/gas-price-info";
import { OnChainProvider } from "../on-chain-provider";
export declare abstract class EvmOnChainProvider extends OnChainProvider {
    abstract readonly blockchain: EvmBlockchainName;
    protected readonly onChainProxyService: OnChainProxyService;
    protected get walletAddress(): string;
    protected get web3Public(): EvmWeb3Public;
    abstract calculate(from: PriceTokenAmount<EvmBlockchainName>, to: PriceToken<EvmBlockchainName>, options?: OnChainCalculationOptions): Promise<EvmOnChainTrade>;
    protected handleProxyContract(from: PriceTokenAmount<EvmBlockchainName>, fullOptions: RequiredOnChainCalculationOptions): Promise<{
        fromWithoutFee: PriceTokenAmount<EvmBlockchainName>;
        proxyFeeInfo: OnChainProxyFeeInfo | undefined;
    }>;
    protected getGasPriceInfo(): Promise<GasPriceInfo>;
}
