import BigNumber from 'bignumber.js';
import { PriceToken, PriceTokenAmount } from "../../../../../../../common/tokens";
import { BlockchainName } from "../../../../../../../core/blockchain/models/blockchain-name";
import { Exact } from "../../../common/on-chain-trade/evm-on-chain-trade/models/exact";
export declare function getFromToTokensAmountsByExact<T extends BlockchainName>(fromToken: PriceToken<T>, toToken: PriceToken<T>, exact: Exact, initialWeiAmount: BigNumber, weiAmountWithoutFee: BigNumber, routeWeiAmount: BigNumber): {
    from: PriceTokenAmount<T>;
    to: PriceTokenAmount<T>;
    fromWithoutFee: PriceTokenAmount<T>;
};
