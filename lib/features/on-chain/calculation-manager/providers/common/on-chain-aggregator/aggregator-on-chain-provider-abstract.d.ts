import { PriceToken, PriceTokenAmount, Token } from "../../../../../../common/tokens";
import { BlockchainName } from "../../../../../../core/blockchain/models/blockchain-name";
import { Web3PrivateSupportedBlockchain } from "../../../../../../core/blockchain/web3-private-service/models/web-private-supported-blockchain";
import { OnChainTradeError } from '../../../models/on-chain-trade-error';
import { RequiredOnChainCalculationOptions } from '../models/on-chain-calculation-options';
import { OnChainProxyFeeInfo } from '../models/on-chain-proxy-fee-info';
import { OnChainTradeType } from '../models/on-chain-trade-type';
import { OnChainTradeStruct } from '../on-chain-trade/evm-on-chain-trade/models/evm-on-chain-trade-struct';
import { GasFeeInfo } from '../on-chain-trade/evm-on-chain-trade/models/gas-fee-info';
import { OnChainTrade } from '../on-chain-trade/on-chain-trade';
export declare abstract class AggregatorOnChainProvider {
    private readonly onChainProxyService;
    abstract readonly tradeType: OnChainTradeType;
    abstract calculate(from: PriceTokenAmount, toToken: PriceToken, options: RequiredOnChainCalculationOptions): Promise<OnChainTrade | OnChainTradeError>;
    protected abstract isSupportedBlockchain(blockchain: BlockchainName): boolean;
    protected getWalletAddress(blockchain: Web3PrivateSupportedBlockchain): string;
    protected abstract getGasFeeInfo(tradeStruct: OnChainTradeStruct<BlockchainName>, providerGateway?: string): Promise<GasFeeInfo | null>;
    protected handleProxyContract<T extends BlockchainName>(from: PriceTokenAmount<T>, fullOptions: RequiredOnChainCalculationOptions): Promise<{
        fromWithoutFee: PriceTokenAmount<T>;
        proxyFeeInfo: OnChainProxyFeeInfo | undefined;
    }>;
    protected getRoutePath(from: Token, to: Token): ReadonlyArray<Token>;
}
