import BigNumber from 'bignumber.js';
import { Token } from "../../../../../../common/tokens";
import { EvmWeb3Private } from "../../../../../../core/blockchain/web3-private-service/web3-private/evm-web3-private/evm-web3-private";
import { EvmWeb3Public } from "../../../../../../core/blockchain/web3-public-service/web3-public/evm-web3-public/evm-web3-public";
import { EvmEncodeConfig } from "../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/models/evm-encode-config";
import { PulseChainCrossChainSupportedBlockchain } from "../constants/pulse-chain-supported-blockchains";
import { AbiItem } from 'web3-utils';
export declare abstract class OmniBridge {
    private readonly fromToken;
    private readonly toToken;
    readonly sourceBridgeAddress: string;
    protected readonly targetBridgeAddress: string;
    protected readonly sourceBridgeAbi: AbiItem[];
    protected readonly targetBridgeAbi: AbiItem[];
    protected readonly sourceBlockchain: PulseChainCrossChainSupportedBlockchain;
    protected readonly targetBlockchain: PulseChainCrossChainSupportedBlockchain;
    protected get web3Private(): EvmWeb3Private;
    protected get sourceWeb3Public(): EvmWeb3Public;
    protected get targetWeb3Public(): EvmWeb3Public;
    constructor(fromToken: Token<PulseChainCrossChainSupportedBlockchain>, toToken: Token<PulseChainCrossChainSupportedBlockchain>);
    /**
     * Check if token registered in source network.
     * @param address Token address in source network.
     */
    abstract isTokenRegistered(address: string): Promise<boolean>;
    /**
     * Check if registered is native bridge token.
     * @param address Token address in source network.
     */
    protected abstract isRegisteredAsNative(address: string): Promise<boolean>;
    /**
     * Fetch target token address for non native token.
     * @param address Token address in source network.
     */
    protected abstract getNonNativeToken(address: string): Promise<string>;
    /**
     * Fetch target token address for native token.
     * @param address Token address in source network.
     */
    protected abstract getNativeToken(address: string): Promise<string>;
    /**
     * Get bridge token address in target network.
     * @param fromAddress Token address in source network.
     */
    getBridgeToken(fromAddress: string): Promise<string>;
    /**
     * Get min swap amount in source network.
     * @param address Token address in source network.
     */
    abstract getMinAmountToken(address: string): Promise<BigNumber>;
    /**
     * Check if token allowed to send in source network (min/max amounts, daily limits).
     * @param address Token address in source network.
     * @param amount Swap amount.
     */
    protected abstract checkSourceLimits(address: string, amount: string): Promise<void>;
    /**
     * Check if token allowed to get in target network (min/max amounts, daily limits).
     * @param address Token address in target network.
     * @param amount Swap amount.
     */
    protected abstract checkTargetLimits(address: string, amount: string): Promise<void>;
    /**
     * Check if allowed to swap.
     * @param fromAddress Token address in source network.
     * @param toAddress Token address in target network.
     * @param amount Swap amount.
     */
    checkLimits(fromAddress: string, toAddress: string, amount: string): Promise<void>;
    /**
     * Get fee manager address.
     */
    private getFeeManager;
    /**
     *
     * Get fee type for trade.
     */
    private getFeeType;
    /**
     * Calculate output amount for trade.
     * @param toAddress Token address in target network.
     * @param feeManagerAddress Fee manager contract address.
     * @param feeType Type of fee.
     * @param fromAmount Amount of tokens to send.
     */
    private getOutputAmount;
    /**
     * Calculate output amount for trade.
     * @param toAddress Token address in target network.
     * @param fromAmount Amount of tokens to send.
     */
    calculateAmount(toAddress: string, fromAmount: string): Promise<BigNumber>;
    static isCustomWrap(token: Token): boolean;
    /**
     * Get swap data for native token trade.
     * @param receiverAddress Receiver address user get money to.
     * @param value Amount of money user spend.
     */
    abstract getDataForNativeSwap(receiverAddress: string, value: string): EvmEncodeConfig;
    /**
     * Get swap data for native token trade.
     * @param receiverAddress Receiver address user get money to.
     * @param amount Amount of money user spend.
     * @param isERC677 Is token part of ERC677 token standard.
     * @param tokenAddress Address of sending token.
     */
    abstract getDataForTokenSwap(receiverAddress: string, amount: string, isERC677: boolean, tokenAddress: string): EvmEncodeConfig;
}
