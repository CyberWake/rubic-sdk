import { PriceTokenAmount, Token } from "../../../../../../../../common/tokens";
import { BlockchainName, EvmBlockchainName } from "../../../../../../../../core/blockchain/models/blockchain-name";
import { IsDeflationToken } from "../../../../../../../deflation-token-manager/models/is-deflation-token";
import { OnChainProxyFeeInfo } from "../../../models/on-chain-proxy-fee-info";
import { GasFeeInfo } from "./gas-fee-info";
export interface OnChainTradeStruct<T extends BlockchainName> {
    from: PriceTokenAmount<T>;
    to: PriceTokenAmount<T>;
    slippageTolerance: number;
    path: ReadonlyArray<Token>;
    gasFeeInfo: GasFeeInfo | null;
    useProxy: boolean;
    proxyFeeInfo: OnChainProxyFeeInfo | undefined;
    fromWithoutFee: PriceTokenAmount<T>;
    withDeflation: {
        from: IsDeflationToken;
        to: IsDeflationToken;
    };
    usedForCrossChain?: boolean;
}
export interface EvmOnChainTradeStruct extends OnChainTradeStruct<EvmBlockchainName> {
}
