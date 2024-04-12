import { EvmBlockchainName } from "../../../../../../../core/blockchain/models/blockchain-name";
import { ContractMulticallResponse } from "../../../../../../../core/blockchain/web3-public-service/web3-public/models/contract-multicall-response";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { Exact } from "../../../common/on-chain-trade/evm-on-chain-trade/models/exact";
import { DefaultRoutesMethodArgument } from "../../common/uniswap-v2-abstract/models/route-method-arguments";
import { UniswapV2AbstractTrade } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-trade";
export declare class SolarbeamTrade extends UniswapV2AbstractTrade {
    static readonly contractAbi: import("web3-utils").AbiItem[];
    static get type(): OnChainTradeType;
    static callForRoutes(blockchain: EvmBlockchainName, exact: Exact, routesMethodArguments: DefaultRoutesMethodArgument[]): Promise<ContractMulticallResponse<string[]>[]>;
    private static readonly feeParameter;
    readonly dexContractAddress = "0xAA30eF758139ae4a7f798112902Bf6d65612045f";
}
