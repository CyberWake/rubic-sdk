import BigNumber from 'bignumber.js';
import { PriceTokenAmount } from "../../../../../../common/tokens";
import { ChangenowCrossChainSupportedBlockchain } from "../constants/changenow-api-blockchain";
import { ChangenowCurrency } from "./changenow-currencies-api";
import { GasData } from "../../common/emv-cross-chain-trade/models/gas-data";
import { FeeInfo } from "../../common/models/fee-info";
import { EvmOnChainTrade } from "../../../../../on-chain/calculation-manager/providers/common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade";
import { MarkRequired } from 'ts-essentials';
import { ChangenowSwapResponse } from './changenow-swap.api';
export interface ChangenowTrade {
    from: PriceTokenAmount<ChangenowCrossChainSupportedBlockchain>;
    to: PriceTokenAmount<ChangenowCrossChainSupportedBlockchain>;
    toTokenAmountMin: BigNumber;
    fromCurrency: ChangenowCurrency;
    toCurrency: ChangenowCurrency;
    feeInfo: FeeInfo;
    gasData: GasData;
    onChainTrade: EvmOnChainTrade | null;
}
export type GetPaymentInfoReturnType = MarkRequired<Partial<ChangenowSwapResponse>, 'id' | 'payinAddress'>;
