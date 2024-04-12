import { PriceToken, PriceTokenAmount } from "../../../../../../../../common/tokens";
import { TronBlockchainName } from "../../../../../../../../core/blockchain/models/blockchain-name";
import { TronWeb3Public } from "../../../../../../../../core/blockchain/web3-public-service/web3-public/tron-web3-public/tron-web3-public";
import { OnChainCalculationOptions } from "../../../../common/models/on-chain-calculation-options";
import { TronOnChainTrade } from "../../../../common/on-chain-trade/tron-on-chain-trade/tron-on-chain-trade";
import { OnChainProvider } from "../on-chain-provider";
export declare abstract class TronOnChainProvider extends OnChainProvider {
    readonly blockchain: "TRON";
    protected get walletAddress(): string;
    protected get web3Public(): TronWeb3Public;
    abstract calculate(from: PriceTokenAmount<TronBlockchainName>, to: PriceToken<TronBlockchainName>, options?: OnChainCalculationOptions): Promise<TronOnChainTrade>;
}
