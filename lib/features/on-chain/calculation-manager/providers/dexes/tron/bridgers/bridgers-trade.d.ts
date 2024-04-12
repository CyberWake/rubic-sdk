import { PriceTokenAmount, Token, TokenAmount } from "../../../../../../../common/tokens";
import { TronBlockchainName } from "../../../../../../../core/blockchain/models/blockchain-name";
import { TronTransactionConfig } from "../../../../../../../core/blockchain/web3-pure/typed-web3-pure/tron-web3-pure/models/tron-transaction-config";
import { EncodeTransactionOptions } from "../../../../../../common/models/encode-transaction-options";
import { SwapTransactionOptions } from "../../../../../../common/models/swap-transaction-options";
import { FeeInfo } from "../../../../../../cross-chain/calculation-manager/providers/common/models/fee-info";
import { OnChainPlatformFee } from "../../../common/models/on-chain-proxy-fee-info";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { TronOnChainTrade } from "../../../common/on-chain-trade/tron-on-chain-trade/tron-on-chain-trade";
export declare class BridgersTrade extends TronOnChainTrade {
    readonly from: PriceTokenAmount<TronBlockchainName>;
    readonly to: PriceTokenAmount<TronBlockchainName>;
    readonly path: ReadonlyArray<Token>;
    readonly slippageTolerance: number;
    private readonly contractAddress;
    readonly cryptoFeeToken: TokenAmount;
    readonly platformFee: OnChainPlatformFee;
    get type(): OnChainTradeType;
    protected get spenderAddress(): string;
    get toTokenAmountMin(): PriceTokenAmount;
    readonly feeInfo: FeeInfo;
    constructor(tradeStruct: {
        from: PriceTokenAmount<TronBlockchainName>;
        to: PriceTokenAmount<TronBlockchainName>;
        slippageTolerance: number;
        contractAddress: string;
        cryptoFeeToken: TokenAmount;
        platformFee: OnChainPlatformFee;
    }, providerAddress: string);
    swap(options?: SwapTransactionOptions): Promise<string | never>;
    encode(options: EncodeTransactionOptions): Promise<TronTransactionConfig>;
    private getTransactionData;
}
