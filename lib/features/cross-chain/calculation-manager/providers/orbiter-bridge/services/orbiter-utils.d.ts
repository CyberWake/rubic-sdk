import BigNumber from 'bignumber.js';
import { PriceTokenAmount } from "../../../../../../common/tokens";
import { BlockchainName, EvmBlockchainName } from "../../../../../../core/blockchain/models/blockchain-name";
import { OrbiterQuoteConfig } from '../models/orbiter-api-quote-types';
import { OrbiterGetQuoteConfigParams } from '../models/orbiter-utils-types';
export declare class OrbiterUtils {
    static compareChainId(orbiterChainId: string, blockchainName: BlockchainName): boolean;
    static getQuoteConfig({ configs, from, to }: OrbiterGetQuoteConfigParams): OrbiterQuoteConfig;
    static isAmountCorrect(fromAmount: BigNumber, config: OrbiterQuoteConfig): boolean;
    /**
     *
     * @param code Orbiter identification code of chain(9001, 9002 etc), equals quoteConfig.vc
     * @param receiverAddress
     * @returns data argument for orbiter-abi methods as hex string
     */
    static getHexDataArg(code: string, receiverAddress: string): string;
    static getTradingFee(from: PriceTokenAmount<EvmBlockchainName>, config: OrbiterQuoteConfig): BigNumber;
    static getTransferAmount(from: PriceTokenAmount<EvmBlockchainName>, config: OrbiterQuoteConfig): string;
}
