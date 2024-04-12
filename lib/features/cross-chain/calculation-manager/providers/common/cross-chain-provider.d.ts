import { RubicSdkError } from "../../../../../common/errors";
import { PriceToken, PriceTokenAmount } from "../../../../../common/tokens";
import { BlockchainName } from "../../../../../core/blockchain/models/blockchain-name";
import { Web3PrivateSupportedBlockchain } from "../../../../../core/blockchain/web3-private-service/models/web-private-supported-blockchain";
import { Web3Public } from "../../../../../core/blockchain/web3-public-service/web3-public/web3-public";
import { HttpClient } from "../../../../../core/http-client/models/http-client";
import { RequiredCrossChainOptions } from "../../models/cross-chain-options";
import { CrossChainTradeType } from "../../models/cross-chain-trade-type";
import { CalculationResult } from "./models/calculation-result";
import { FeeInfo } from "./models/fee-info";
import { RubicStep } from "./models/rubicStep";
import { AbiItem } from 'web3-utils';
export declare abstract class CrossChainProvider {
    static parseError(err: unknown): RubicSdkError;
    abstract readonly type: CrossChainTradeType;
    protected get httpClient(): HttpClient;
    abstract isSupportedBlockchain(fromBlockchain: BlockchainName): boolean;
    areSupportedBlockchains(fromBlockchain: BlockchainName, toBlockchain: BlockchainName): boolean;
    protected getFromWeb3Public(fromBlockchain: BlockchainName): Web3Public;
    abstract calculate(from: PriceTokenAmount, toToken: PriceToken, options: RequiredCrossChainOptions): Promise<CalculationResult>;
    protected getWalletAddress(blockchain: Web3PrivateSupportedBlockchain): string;
    protected abstract getRoutePath(...options: unknown[]): Promise<RubicStep[]>;
    /**
     * Gets fee information.
     * @param _fromBlockchain Source network blockchain.
     * @param _providerAddress Integrator address.
     * @param _percentFeeToken Protocol fee token.
     * @param _useProxy Use rubic proxy or not.
     * @param _contractAbi Rubic Proxy contract abi.
     * @protected
     * @internal
     */
    protected getFeeInfo(_fromBlockchain: Partial<BlockchainName>, _providerAddress: string, _percentFeeToken: PriceToken, _useProxy: boolean, _contractAbi?: AbiItem[]): Promise<FeeInfo>;
}
