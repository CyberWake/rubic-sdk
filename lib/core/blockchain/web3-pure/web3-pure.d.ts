import BigNumber from 'bignumber.js';
import { CHAIN_TYPE } from "../models/chain-type";
import { BitcoinWeb3Pure } from "./typed-web3-pure/bitcoin-web3-pure";
import { EosWeb3Pure } from "./typed-web3-pure/eos-web3-pure";
import { EvmWeb3Pure } from "./typed-web3-pure/evm-web3-pure/evm-web3-pure";
import { FilecoinWeb3Pure } from "./typed-web3-pure/filecoin-web3-pure";
import { IcpWeb3Pure } from "./typed-web3-pure/icp-web3-pure";
import { AlgorandWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/algorand-web3-pure";
import { AptosWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/aptos-web3-pure";
import { AstarWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/astar-web3-pure";
import { CardanoWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/cardano-web3-pure";
import { CasperWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/casper-web3-pure";
import { CosmosWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/cosmos-web3-pure";
import { DashWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/dash-web3-pure";
import { DogecoinWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/dogecoin-web3-pure";
import { FlowWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/flow-web3-pure";
import { HederaWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/hedear-web3-pure";
import { IotaWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/iota-web3-pure";
import { KadenaWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/kadena-web3-pure";
import { KavaCosmosWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/kava-cosmos-web3-pure";
import { KusamaWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/kusama-web3-pure";
import { LitecoinWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/litecoin-web3-pure";
import { MinaWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/mina-web3-pure";
import { MoneroWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/monero-web3-pure";
import { NearWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/near-web3-pure";
import { NeoWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/neo-web3-pure";
import { OsmosisWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/osmosis-web3-pure";
import { PolkadotWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/polkadot-web3-pure";
import { RippleWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/ripple-web3-pure";
import { SecretWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/secret-web3-pure";
import { SiaWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/sia-web3-pure";
import { SolanaWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/solana-web3-pure";
import { StellarWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/stellar-web3-pure";
import { TezosWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/tezos-web3-pure";
import { TonWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/ton-web3-pure";
import { WavesWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/waves-web3-pure";
import { WaxWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/wax-web3-pure";
import { ZilliqaWeb3Pure } from "./typed-web3-pure/non-evm-web3-pure/zilliqa-web3-pure";
import { OntologyWeb3Pure } from "./typed-web3-pure/ontology-web3-pure";
import { TronWeb3Pure } from "./typed-web3-pure/tron-web3-pure/tron-web3-pure";
import { XdcWeb3Pure } from "./typed-web3-pure/xdc-web3-pure";
/**
 * Contains common methods, connected with web3, e.g. wei conversion, encoding data, etc.
 */
export declare class Web3Pure {
    static [CHAIN_TYPE.EVM]: typeof EvmWeb3Pure;
    static [CHAIN_TYPE.TRON]: typeof TronWeb3Pure;
    static [CHAIN_TYPE.BITCOIN]: typeof BitcoinWeb3Pure;
    static [CHAIN_TYPE.ICP]: typeof IcpWeb3Pure;
    static [CHAIN_TYPE.RIPPLE]: typeof RippleWeb3Pure;
    static [CHAIN_TYPE.CARDANO]: typeof CardanoWeb3Pure;
    static [CHAIN_TYPE.SOLANA]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.DOGECOIN]: typeof DogecoinWeb3Pure;
    static [CHAIN_TYPE.POLKADOT]: typeof PolkadotWeb3Pure;
    static [CHAIN_TYPE.LITECOIN]: typeof LitecoinWeb3Pure;
    static [CHAIN_TYPE.MONERO]: typeof MoneroWeb3Pure;
    static [CHAIN_TYPE.NEAR]: typeof NearWeb3Pure;
    static [CHAIN_TYPE.ALGORAND]: typeof AlgorandWeb3Pure;
    static [CHAIN_TYPE.TEZOS]: typeof TezosWeb3Pure;
    static [CHAIN_TYPE.DASH]: typeof DashWeb3Pure;
    static [CHAIN_TYPE.ZILLIQA]: typeof ZilliqaWeb3Pure;
    static [CHAIN_TYPE.KAVA_COSMOS]: typeof KavaCosmosWeb3Pure;
    static [CHAIN_TYPE.APTOS]: typeof AptosWeb3Pure;
    static [CHAIN_TYPE.ASTAR]: typeof AstarWeb3Pure;
    static [CHAIN_TYPE.COSMOS]: typeof CosmosWeb3Pure;
    static [CHAIN_TYPE.FLOW]: typeof FlowWeb3Pure;
    static [CHAIN_TYPE.HEDERA]: typeof HederaWeb3Pure;
    static [CHAIN_TYPE.BITCOIN_DIAMOND]: typeof BitcoinWeb3Pure;
    static [CHAIN_TYPE.BITCOIN_GOLD]: typeof BitcoinWeb3Pure;
    static [CHAIN_TYPE.BSV]: typeof BitcoinWeb3Pure;
    static [CHAIN_TYPE.IOTA]: typeof IotaWeb3Pure;
    static [CHAIN_TYPE.KADENA]: typeof KadenaWeb3Pure;
    static [CHAIN_TYPE.KUSAMA]: typeof KusamaWeb3Pure;
    static [CHAIN_TYPE.MINA_PROTOCOL]: typeof MinaWeb3Pure;
    static [CHAIN_TYPE.NEO]: typeof NeoWeb3Pure;
    static [CHAIN_TYPE.OSMOSIS]: typeof OsmosisWeb3Pure;
    static [CHAIN_TYPE.SIA]: typeof SiaWeb3Pure;
    static [CHAIN_TYPE.SECRET]: typeof SecretWeb3Pure;
    static [CHAIN_TYPE.TON]: typeof TonWeb3Pure;
    static [CHAIN_TYPE.WAVES]: typeof WavesWeb3Pure;
    static [CHAIN_TYPE.WAX]: typeof WaxWeb3Pure;
    static [CHAIN_TYPE.STELLAR]: typeof StellarWeb3Pure;
    static [CHAIN_TYPE.XDC]: typeof XdcWeb3Pure;
    static [CHAIN_TYPE.ONTOLOGY]: typeof OntologyWeb3Pure;
    static [CHAIN_TYPE.EOS]: typeof EosWeb3Pure;
    static [CHAIN_TYPE.FILECOIN]: typeof FilecoinWeb3Pure;
    static [CHAIN_TYPE.CASPER]: typeof CasperWeb3Pure;
    static [CHAIN_TYPE.AION]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.ARDOR]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.ARK]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.BAND_PROTOCOL]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.DECRED]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.DIGI_BYTE]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.DIVI]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.MULTIVERS_X]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.FIO_PROTOCOL]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.FIRO]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.HELIUM]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.ICON]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.IOST]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.KOMODO]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.LISK]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.TERRA]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.TERRA_CLASSIC]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.NANO]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.PIVX]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.POLYX]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.QTUM]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.THOR_CHAIN]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.RAVENCOIN]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.STEEM]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.STRATIS]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.STACKS]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.SOLAR]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.VE_CHAIN]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.DX_CHAIN]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.E_CASH]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.NEM]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.VERGE]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.SYMBOL]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.ZCASH]: typeof SolanaWeb3Pure;
    static [CHAIN_TYPE.HORIZEN]: typeof SolanaWeb3Pure;
    /**
     * Increases the gas limit value by the specified percentage and rounds to the nearest integer.
     * @param gasLimit Gas limit value to increase.
     * @param multiplier The multiplier by which the gas limit will be increased.
     */
    static calculateGasMargin(gasLimit: BigNumber | string | number | null | undefined, multiplier: number): BigNumber;
    /**
     * Converts amount from Ether to Wei units.
     * @param amount Amount to convert.
     * @param decimals Token decimals.
     * @param roundingMode BigNumberRoundingMode.
     */
    static toWei(amount: BigNumber | string | number, decimals?: number, roundingMode?: BigNumber.RoundingMode): string;
    /**
     * Converts amount from Wei to Ether units.
     * @param amountInWei Amount to convert.
     * @param decimals Token decimals.
     */
    static fromWei(amountInWei: BigNumber | string | number, decimals?: number): BigNumber;
}
