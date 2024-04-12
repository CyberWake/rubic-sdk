import BigNumber from 'bignumber.js';
import { PriceTokenAmount } from "../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../core/blockchain/models/blockchain-name";
import { EvmWeb3Private } from "../../../../../core/blockchain/web3-private-service/web3-private/evm-web3-private/evm-web3-private";
import { ContractParams } from "../../../../common/models/contract-params";
import { EncodeTransactionOptions } from "../../../../common/models/encode-transaction-options";
import { SwapTransactionOptions } from "../../../../common/models/swap-transaction-options";
import { ChangenowCrossChainSupportedBlockchain } from "./constants/changenow-api-blockchain";
import { ChangenowPaymentInfo } from "./models/changenow-payment-info";
import { ChangenowTrade } from "./models/changenow-trade";
import { EvmCrossChainTrade } from "../common/emv-cross-chain-trade/evm-cross-chain-trade";
import { GasData } from "../common/emv-cross-chain-trade/models/gas-data";
import { FeeInfo } from "../common/models/fee-info";
import { GetContractParamsOptions } from "../common/models/get-contract-params-options";
import { RubicStep } from "../common/models/rubicStep";
import { EvmOnChainTrade } from "../../../../on-chain/calculation-manager/providers/common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade";
import { MarkRequired } from 'ts-essentials';
import { TransactionConfig } from 'web3-core';
import { TradeInfo } from '../common/models/trade-info';
export declare class ChangenowCrossChainTrade extends EvmCrossChainTrade {
    /** @internal */
    static getGasData(changenowTrade: ChangenowTrade, providerAddress: string, receiverAddress?: string): Promise<GasData | null>;
    protected get methodName(): string;
    readonly type: "changenow";
    readonly isAggregator = false;
    readonly from: PriceTokenAmount<EvmBlockchainName>;
    readonly to: PriceTokenAmount<ChangenowCrossChainSupportedBlockchain>;
    readonly toTokenAmountMin: BigNumber;
    readonly gasData: GasData;
    readonly feeInfo: FeeInfo;
    readonly onChainSubtype: {
        from: "SOLANA" | "LIFI" | "BRIDGERS" | "RANGO" | "10K_SWAP" | "AERODROME" | "ACRYPTOS" | "ALDRIN_EXCHANGE" | "ALGEBRA" | "ALGEBRA_INTEGRAL" | "ANNEX" | "APE_SWAP" | "ARTH_SWAP" | "ASTRO_SWAP" | "AURORA_SWAP" | "AVNU" | "BABY_SWAP" | "BALANCER" | "BASE_SWAP" | "BEAM_SWAP" | "BI_SWAP" | "CHERRY_SWAP" | "CLAIM_SWAP" | "CREMA_FINANCE" | "CRO_SWAP" | "CRONA_SWAP" | "CROPPER_FINANCE" | "CROW_FI" | "CRO_DEX" | "CURVE" | "DEFI_PLAZA" | "DEFI_SWAP" | "DFYN" | "DLN" | "DODO" | "DYSTOPIA" | "ECHO_DEX" | "ELK" | "FINKUJIRA" | "FUSIONX" | "HONEY_SWAP" | "HORIZONDEX" | "JET_SWAP" | "JOE" | "JUPITER" | "JUPITER_SWAP" | "J_SWAP" | "KYBER_SWAP" | "LUA_SWAP" | "MAVERICK" | "MDEX" | "MESH_SWAP" | "MM_FINANCE" | "MOJITO_SWAP" | "MUTE_SWAP" | "NET_SWAP" | "OKC_SWAP" | "ODOS" | "ONE_INCH" | "ONE_MOON" | "ONE_SOL" | "OMNIDEX" | "OOLONG_SWAP" | "OPEN_OCEAN" | "ORCA_SWAP" | "OSMOSIS_SWAP" | "PANCAKE_SWAP" | "PANCAKE_SWAP_V3" | "PANGOLIN" | "PARA_SWAP" | "PEGASYS" | "PHOTON_SWAP" | "POLYDEX" | "QUICK_SWAP" | "QUICK_SWAP_V3" | "PULSEX_V1" | "PULSEX_V2" | "RAYDIUM" | "REF_FINANCE" | "REN_BTC" | "SABER_STABLE_SWAP" | "SAROS_SWAP" | "SERUM" | "SHIBA_SWAP" | "SMOOTHY" | "SOLAR_BEAM" | "SPACEFI_SWAP" | "SPIRIT_SWAP" | "SPL_TOKEN_SWAP" | "SPOOKY_SWAP" | "SOUL_SWAP" | "STELLA_SWAP" | "SUN_SWAP" | "SURFDEX" | "SUSHI_SWAP" | "SYNAPSE" | "SYNC_SWAP" | "SYMBIOSIS_SWAP" | "TRADER" | "TRISOLARIS" | "IZUMI" | "UBE_SWAP" | "UNISWAP_V2" | "UNI_SWAP_V3" | "VERSE" | "VIPER_SWAP" | "VOLTAGE_SWAP" | "VOOI" | "VVS_FINANCE" | "WAGYU_SWAP" | "WANNA_SWAP" | "WAULT_SWAP" | "WOO_FI" | "WRAPPED" | "WYND" | "YUZU_SWAP" | "XY_DEX" | "ZAPPY" | "ZIP_SWAP" | "ZRX";
        to: undefined;
    } | {
        from: undefined;
        to: undefined;
    };
    readonly bridgeType: "changenow";
    readonly priceImpact: number | null;
    /**
     * id of changenow trade, used to get trade status.
     */
    id: string | undefined;
    private payinAddress;
    private readonly fromCurrency;
    private readonly toCurrency;
    private get transitToken();
    protected get fromContractAddress(): string;
    protected get web3Private(): EvmWeb3Private;
    readonly onChainTrade: EvmOnChainTrade | null;
    get estimatedGas(): BigNumber | null;
    constructor(crossChainTrade: ChangenowTrade, providerAddress: string, routePath: RubicStep[]);
    swapDirect(options?: SwapTransactionOptions): Promise<string | never>;
    getChangenowPostTrade(receiverAddress: string): Promise<ChangenowPaymentInfo>;
    private getPaymentInfo;
    protected getContractParams(options: MarkRequired<GetContractParamsOptions, 'receiverAddress'>, skipAmountChangeCheck?: boolean): Promise<ContractParams>;
    getTradeAmountRatio(fromUsd: BigNumber): BigNumber;
    getTradeInfo(): TradeInfo;
    encode(options: EncodeTransactionOptions): Promise<TransactionConfig>;
    encodeApprove(): Promise<TransactionConfig>;
    needApprove(): Promise<boolean>;
}
