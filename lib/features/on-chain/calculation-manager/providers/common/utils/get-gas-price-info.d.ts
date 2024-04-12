import { EvmBlockchainName } from "../../../../../../core/blockchain/models/blockchain-name";
import { GasPriceInfo } from "../../dexes/common/on-chain-provider/evm-on-chain-provider/models/gas-price-info";
export declare function getGasPriceInfo(blockchain: EvmBlockchainName): Promise<GasPriceInfo>;
