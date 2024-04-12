import { EvmBlockchainName } from "../../../../../../../core/blockchain/models/blockchain-name";
import { ContractMulticallResponse } from "../../../../../../../core/blockchain/web3-public-service/web3-public/models/contract-multicall-response";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { Exact } from "../../../common/on-chain-trade/evm-on-chain-trade/models/exact";
import { DefaultRoutesMethodArgument } from "../../common/uniswap-v2-abstract/models/route-method-arguments";
import { UniswapV2AbstractTrade } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-trade";
export declare class MuteSwapTrade extends UniswapV2AbstractTrade {
    static callForRoutes(blockchain: EvmBlockchainName, exact: Exact, routesMethodArguments: DefaultRoutesMethodArgument[]): Promise<ContractMulticallResponse<string[]>[]>;
    static get type(): OnChainTradeType;
    static readonly contractAbi: import("web3-utils").AbiItem[];
    readonly dexContractAddress = "0x8B791913eB07C32779a16750e3868aA8495F5964";
    protected getCallParameters(receiverAddress?: string): unknown[];
}
