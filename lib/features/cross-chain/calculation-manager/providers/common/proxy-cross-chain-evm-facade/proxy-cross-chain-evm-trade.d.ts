import { PriceTokenAmount } from "../../../../../../common/tokens";
import { TokenBaseStruct } from "../../../../../../common/tokens/models/token-base-struct";
import { EvmBlockchainName } from "../../../../../../core/blockchain/models/blockchain-name";
import { Web3PublicSupportedBlockchain } from "../../../../../../core/blockchain/web3-public-service/models/web3-public-storage";
import { FeeInfo } from "../models/fee-info";
import { GetContractParamsOptions } from "../models/get-contract-params-options";
import { ProxyBridgeParams } from "../models/proxy-bridge-params";
import { ProxySwapParams } from "../models/proxy-swap-params";
import { EvmOnChainTrade } from "../../../../../on-chain/calculation-manager/providers/common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade";
type BridgeParams = [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    number,
    boolean,
    boolean
];
export declare class ProxyCrossChainEvmTrade {
    static getFeeInfo(fromBlockchain: Web3PublicSupportedBlockchain, providerAddress: string, percentFeeToken: PriceTokenAmount, useProxy: boolean): Promise<FeeInfo>;
    /**
     * Gets fixed fee information.
     * @param fromBlockchain Source network blockchain.
     * @param providerAddress Integrator address.
     * @param contractAddress Contract address.
     * @param contractAbi Contract ABI.
     * @protected
     * @internal
     */
    private static getFixedFee;
    /**
     * Gets percent fee.
     * @param fromBlockchain Source network blockchain.
     * @param providerAddress Integrator address.
     * @param contractAddress Contract address.
     * @param contractAbi Contract ABI.
     * @protected
     * @internal
     */
    private static getFeePercent;
    static getOnChainTrade(from: PriceTokenAmount, transitToken: TokenBaseStruct, slippageTolerance: number, isCustomWeth?: boolean): Promise<EvmOnChainTrade | null>;
    static getWhitelistedDexes(fromBlockchain: EvmBlockchainName): Promise<string[]>;
    static getBridgeData(swapOptions: GetContractParamsOptions, tradeParams: ProxyBridgeParams): BridgeParams;
    private static getReferrerAddress;
    static getSwapData(swapOptions: GetContractParamsOptions, tradeParams: ProxySwapParams): Promise<[[string, string, string, string, string, string, boolean]]>;
    static getGenericProviderData(providerAddress: string, providerData: string, fromBlockchain: EvmBlockchainName, gatewayAddress: string, extraNative: string): Promise<[string, string, string, string]>;
    static checkCrossChainWhiteList(fromBlockchain: EvmBlockchainName, routerAddress: string, offset: string): Promise<void | never>;
    static checkDexWhiteList(fromBlockchain: EvmBlockchainName, routerAddress: string, method: string): Promise<never | void>;
    private static getReceiverAddress;
}
export {};
