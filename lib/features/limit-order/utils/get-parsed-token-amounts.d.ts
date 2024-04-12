import BigNumber from 'bignumber.js';
import { Token, TokenAmount } from "../../../common/tokens";
import { TokenBaseStruct } from "../../../common/tokens/models/token-base-struct";
import { EvmBlockchainName } from "../../../core/blockchain/models/blockchain-name";
export declare function getParsedTokenAmounts(fromToken: Token<EvmBlockchainName> | TokenBaseStruct<EvmBlockchainName>, toToken: string | Token<EvmBlockchainName> | TokenBaseStruct<EvmBlockchainName>, fromAmount: BigNumber | string | number, toAmount: BigNumber | string | number): Promise<{
    fromTokenAmount: TokenAmount<EvmBlockchainName>;
    toTokenAmount: TokenAmount<EvmBlockchainName>;
}>;
