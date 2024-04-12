"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3Pure = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const decorators_1 = require("../../../common/utils/decorators");
const chain_type_1 = require("../models/chain-type");
const bitcoin_web3_pure_1 = require("./typed-web3-pure/bitcoin-web3-pure");
const eos_web3_pure_1 = require("./typed-web3-pure/eos-web3-pure");
const evm_web3_pure_1 = require("./typed-web3-pure/evm-web3-pure/evm-web3-pure");
const filecoin_web3_pure_1 = require("./typed-web3-pure/filecoin-web3-pure");
const icp_web3_pure_1 = require("./typed-web3-pure/icp-web3-pure");
const algorand_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/algorand-web3-pure");
const aptos_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/aptos-web3-pure");
const astar_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/astar-web3-pure");
const cardano_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/cardano-web3-pure");
const casper_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/casper-web3-pure");
const cosmos_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/cosmos-web3-pure");
const dash_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/dash-web3-pure");
const dogecoin_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/dogecoin-web3-pure");
const flow_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/flow-web3-pure");
const hedear_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/hedear-web3-pure");
const iota_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/iota-web3-pure");
const kadena_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/kadena-web3-pure");
const kava_cosmos_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/kava-cosmos-web3-pure");
const kusama_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/kusama-web3-pure");
const litecoin_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/litecoin-web3-pure");
const mina_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/mina-web3-pure");
const monero_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/monero-web3-pure");
const near_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/near-web3-pure");
const neo_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/neo-web3-pure");
const osmosis_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/osmosis-web3-pure");
const polkadot_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/polkadot-web3-pure");
const ripple_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/ripple-web3-pure");
const secret_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/secret-web3-pure");
const sia_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/sia-web3-pure");
const solana_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/solana-web3-pure");
const stellar_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/stellar-web3-pure");
const tezos_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/tezos-web3-pure");
const ton_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/ton-web3-pure");
const waves_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/waves-web3-pure");
const wax_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/wax-web3-pure");
const zilliqa_web3_pure_1 = require("./typed-web3-pure/non-evm-web3-pure/zilliqa-web3-pure");
const ontology_web3_pure_1 = require("./typed-web3-pure/ontology-web3-pure");
const tron_web3_pure_1 = require("./typed-web3-pure/tron-web3-pure/tron-web3-pure");
const xdc_web3_pure_1 = require("./typed-web3-pure/xdc-web3-pure");
/**
 * Contains common methods, connected with web3, e.g. wei conversion, encoding data, etc.
 */
let Web3Pure = exports.Web3Pure = class Web3Pure {
    /**
     * Increases the gas limit value by the specified percentage and rounds to the nearest integer.
     * @param gasLimit Gas limit value to increase.
     * @param multiplier The multiplier by which the gas limit will be increased.
     */
    static calculateGasMargin(gasLimit, multiplier) {
        return new bignumber_js_1.default(gasLimit || '0').multipliedBy(multiplier).dp(0);
    }
    /**
     * Converts amount from Ether to Wei units.
     * @param amount Amount to convert.
     * @param decimals Token decimals.
     * @param roundingMode BigNumberRoundingMode.
     */
    static toWei(amount, decimals = 18, roundingMode) {
        return new bignumber_js_1.default(amount || 0)
            .times(new bignumber_js_1.default(10).pow(decimals))
            .toFixed(0, roundingMode);
    }
    /**
     * Converts amount from Wei to Ether units.
     * @param amountInWei Amount to convert.
     * @param decimals Token decimals.
     */
    static fromWei(amountInWei, decimals = 18) {
        return new bignumber_js_1.default(amountInWei).div(new bignumber_js_1.default(10).pow(decimals));
    }
};
_a = chain_type_1.CHAIN_TYPE.EVM;
_b = chain_type_1.CHAIN_TYPE.TRON;
_c = chain_type_1.CHAIN_TYPE.BITCOIN;
_d = chain_type_1.CHAIN_TYPE.ICP;
_e = chain_type_1.CHAIN_TYPE.RIPPLE;
_f = chain_type_1.CHAIN_TYPE.CARDANO;
_g = chain_type_1.CHAIN_TYPE.SOLANA;
_h = chain_type_1.CHAIN_TYPE.DOGECOIN;
_j = chain_type_1.CHAIN_TYPE.POLKADOT;
_k = chain_type_1.CHAIN_TYPE.LITECOIN;
_l = chain_type_1.CHAIN_TYPE.MONERO;
_m = chain_type_1.CHAIN_TYPE.NEAR;
_o = chain_type_1.CHAIN_TYPE.ALGORAND;
_p = chain_type_1.CHAIN_TYPE.TEZOS;
_q = chain_type_1.CHAIN_TYPE.DASH;
_r = chain_type_1.CHAIN_TYPE.ZILLIQA;
_s = chain_type_1.CHAIN_TYPE.KAVA_COSMOS;
_t = chain_type_1.CHAIN_TYPE.APTOS;
_u = chain_type_1.CHAIN_TYPE.ASTAR;
_v = chain_type_1.CHAIN_TYPE.COSMOS;
_w = chain_type_1.CHAIN_TYPE.FLOW;
_x = chain_type_1.CHAIN_TYPE.HEDERA;
_y = chain_type_1.CHAIN_TYPE.BITCOIN_DIAMOND;
_z = chain_type_1.CHAIN_TYPE.BITCOIN_GOLD;
_0 = chain_type_1.CHAIN_TYPE.BSV;
_1 = chain_type_1.CHAIN_TYPE.IOTA;
_2 = chain_type_1.CHAIN_TYPE.KADENA;
_3 = chain_type_1.CHAIN_TYPE.KUSAMA;
_4 = chain_type_1.CHAIN_TYPE.MINA_PROTOCOL;
_5 = chain_type_1.CHAIN_TYPE.NEO;
_6 = chain_type_1.CHAIN_TYPE.OSMOSIS;
_7 = chain_type_1.CHAIN_TYPE.SIA;
_8 = chain_type_1.CHAIN_TYPE.SECRET;
_9 = chain_type_1.CHAIN_TYPE.TON;
_10 = chain_type_1.CHAIN_TYPE.WAVES;
_11 = chain_type_1.CHAIN_TYPE.WAX;
_12 = chain_type_1.CHAIN_TYPE.STELLAR;
_13 = chain_type_1.CHAIN_TYPE.XDC;
_14 = chain_type_1.CHAIN_TYPE.ONTOLOGY;
_15 = chain_type_1.CHAIN_TYPE.EOS;
_16 = chain_type_1.CHAIN_TYPE.FILECOIN;
_17 = chain_type_1.CHAIN_TYPE.CASPER;
_18 = chain_type_1.CHAIN_TYPE.AION;
_19 = chain_type_1.CHAIN_TYPE.ARDOR;
_20 = chain_type_1.CHAIN_TYPE.ARK;
_21 = chain_type_1.CHAIN_TYPE.BAND_PROTOCOL;
_22 = chain_type_1.CHAIN_TYPE.DECRED;
_23 = chain_type_1.CHAIN_TYPE.DIGI_BYTE;
_24 = chain_type_1.CHAIN_TYPE.DIVI;
_25 = chain_type_1.CHAIN_TYPE.MULTIVERS_X;
_26 = chain_type_1.CHAIN_TYPE.FIO_PROTOCOL;
_27 = chain_type_1.CHAIN_TYPE.FIRO;
_28 = chain_type_1.CHAIN_TYPE.HELIUM;
_29 = chain_type_1.CHAIN_TYPE.ICON;
_30 = chain_type_1.CHAIN_TYPE.IOST;
_31 = chain_type_1.CHAIN_TYPE.KOMODO;
_32 = chain_type_1.CHAIN_TYPE.LISK;
_33 = chain_type_1.CHAIN_TYPE.TERRA;
_34 = chain_type_1.CHAIN_TYPE.TERRA_CLASSIC;
_35 = chain_type_1.CHAIN_TYPE.NANO;
_36 = chain_type_1.CHAIN_TYPE.PIVX;
_37 = chain_type_1.CHAIN_TYPE.POLYX;
_38 = chain_type_1.CHAIN_TYPE.QTUM;
_39 = chain_type_1.CHAIN_TYPE.THOR_CHAIN;
_40 = chain_type_1.CHAIN_TYPE.RAVENCOIN;
_41 = chain_type_1.CHAIN_TYPE.STEEM;
_42 = chain_type_1.CHAIN_TYPE.STRATIS;
_43 = chain_type_1.CHAIN_TYPE.STACKS;
_44 = chain_type_1.CHAIN_TYPE.SOLAR;
_45 = chain_type_1.CHAIN_TYPE.VE_CHAIN;
_46 = chain_type_1.CHAIN_TYPE.DX_CHAIN;
_47 = chain_type_1.CHAIN_TYPE.E_CASH;
_48 = chain_type_1.CHAIN_TYPE.NEM;
_49 = chain_type_1.CHAIN_TYPE.VERGE;
_50 = chain_type_1.CHAIN_TYPE.SYMBOL;
_51 = chain_type_1.CHAIN_TYPE.ZCASH;
_52 = chain_type_1.CHAIN_TYPE.HORIZEN;
Web3Pure[_a] = evm_web3_pure_1.EvmWeb3Pure;
Web3Pure[_b] = tron_web3_pure_1.TronWeb3Pure;
Web3Pure[_c] = bitcoin_web3_pure_1.BitcoinWeb3Pure;
Web3Pure[_d] = icp_web3_pure_1.IcpWeb3Pure;
Web3Pure[_e] = ripple_web3_pure_1.RippleWeb3Pure;
Web3Pure[_f] = cardano_web3_pure_1.CardanoWeb3Pure;
Web3Pure[_g] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_h] = dogecoin_web3_pure_1.DogecoinWeb3Pure;
Web3Pure[_j] = polkadot_web3_pure_1.PolkadotWeb3Pure;
Web3Pure[_k] = litecoin_web3_pure_1.LitecoinWeb3Pure;
Web3Pure[_l] = monero_web3_pure_1.MoneroWeb3Pure;
Web3Pure[_m] = near_web3_pure_1.NearWeb3Pure;
Web3Pure[_o] = algorand_web3_pure_1.AlgorandWeb3Pure;
Web3Pure[_p] = tezos_web3_pure_1.TezosWeb3Pure;
Web3Pure[_q] = dash_web3_pure_1.DashWeb3Pure;
Web3Pure[_r] = zilliqa_web3_pure_1.ZilliqaWeb3Pure;
Web3Pure[_s] = kava_cosmos_web3_pure_1.KavaCosmosWeb3Pure;
Web3Pure[_t] = aptos_web3_pure_1.AptosWeb3Pure;
Web3Pure[_u] = astar_web3_pure_1.AstarWeb3Pure;
Web3Pure[_v] = cosmos_web3_pure_1.CosmosWeb3Pure;
Web3Pure[_w] = flow_web3_pure_1.FlowWeb3Pure;
Web3Pure[_x] = hedear_web3_pure_1.HederaWeb3Pure;
Web3Pure[_y] = bitcoin_web3_pure_1.BitcoinWeb3Pure;
Web3Pure[_z] = bitcoin_web3_pure_1.BitcoinWeb3Pure;
Web3Pure[_0] = bitcoin_web3_pure_1.BitcoinWeb3Pure;
Web3Pure[_1] = iota_web3_pure_1.IotaWeb3Pure;
Web3Pure[_2] = kadena_web3_pure_1.KadenaWeb3Pure;
Web3Pure[_3] = kusama_web3_pure_1.KusamaWeb3Pure;
Web3Pure[_4] = mina_web3_pure_1.MinaWeb3Pure;
Web3Pure[_5] = neo_web3_pure_1.NeoWeb3Pure;
Web3Pure[_6] = osmosis_web3_pure_1.OsmosisWeb3Pure;
Web3Pure[_7] = sia_web3_pure_1.SiaWeb3Pure;
Web3Pure[_8] = secret_web3_pure_1.SecretWeb3Pure;
Web3Pure[_9] = ton_web3_pure_1.TonWeb3Pure;
Web3Pure[_10] = waves_web3_pure_1.WavesWeb3Pure;
Web3Pure[_11] = wax_web3_pure_1.WaxWeb3Pure;
Web3Pure[_12] = stellar_web3_pure_1.StellarWeb3Pure;
Web3Pure[_13] = xdc_web3_pure_1.XdcWeb3Pure;
Web3Pure[_14] = ontology_web3_pure_1.OntologyWeb3Pure;
Web3Pure[_15] = eos_web3_pure_1.EosWeb3Pure;
Web3Pure[_16] = filecoin_web3_pure_1.FilecoinWeb3Pure;
Web3Pure[_17] = casper_web3_pure_1.CasperWeb3Pure;
// @TODO create web3pure file before release
Web3Pure[_18] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_19] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_20] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_21] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_22] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_23] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_24] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_25] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_26] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_27] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_28] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_29] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_30] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_31] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_32] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_33] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_34] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_35] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_36] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_37] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_38] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_39] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_40] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_41] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_42] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_43] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_44] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_45] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_46] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_47] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_48] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_49] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_50] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_51] = solana_web3_pure_1.SolanaWeb3Pure;
Web3Pure[_52] = solana_web3_pure_1.SolanaWeb3Pure;
exports.Web3Pure = Web3Pure = __decorate([
    (0, decorators_1.staticImplements)()
], Web3Pure);
//# sourceMappingURL=web3-pure.js.map