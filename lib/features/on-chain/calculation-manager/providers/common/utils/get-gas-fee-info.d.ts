import BigNumber from 'bignumber.js';
import { GasFeeInfo } from "../on-chain-trade/evm-on-chain-trade/models/gas-fee-info";
import { GasPriceInfo } from "../../dexes/common/on-chain-provider/evm-on-chain-provider/models/gas-price-info";
export declare function getGasFeeInfo(estimatedGas: BigNumber | string | number | null | undefined, gasPriceInfo: GasPriceInfo | undefined): GasFeeInfo;
