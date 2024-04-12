"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniswapV2TradeProviders = void 0;
const sushi_swap_arbitrum_provider_1 = require("../../providers/dexes/arbitrum/sushi-swap-arbitrum/sushi-swap-arbitrum-provider");
const arth_swap_provider_1 = require("../../providers/dexes/astar-evm/arth-swap/arth-swap-provider");
const trisolaris_aurora_provider_1 = require("../../providers/dexes/aurora/trisolaris-aurora/trisolaris-aurora-provider");
const wanna_swap_aurora_provider_1 = require("../../providers/dexes/aurora/wanna-swap-aurora/wanna-swap-aurora-provider");
const joe_provider_1 = require("../../providers/dexes/avalanche/joe/joe-provider");
const pangolin_provider_1 = require("../../providers/dexes/avalanche/pangolin/pangolin-provider");
const sushi_swap_avalanche_provider_1 = require("../../providers/dexes/avalanche/sushi-swap-avalanche/sushi-swap-avalanche-provider");
const aerodrome_provider_1 = require("../../providers/dexes/base/aerodrome/aerodrome-provider");
const base_swap_provider_1 = require("../../providers/dexes/base/base-swap/base-swap-provider");
const oolong_swap_provider_1 = require("../../providers/dexes/boba/oolong-swap/oolong-swap-provider");
const sushi_swap_bsc_provider_1 = require("../../providers/dexes/bsc/sushi-swap-bsc/sushi-swap-bsc-provider");
const pancake_swap_testnet_provider_1 = require("../../providers/dexes/bsct/pancake-swap-testnet/pancake-swap-testnet-provider");
const trader_joe_bsct_provider_1 = require("../../providers/dexes/bsct/trader-joe-bsct/trader-joe-bsct-provider");
const cro_swap_provider_1 = require("../../providers/dexes/cronos/cro-swap/cro-swap-provider");
const crodex_provider_1 = require("../../providers/dexes/cronos/crodex/crodex-provider");
const crona_swap_provider_1 = require("../../providers/dexes/cronos/crona-swap/crona-swap-provider");
const sushi_swap_ethereum_provider_1 = require("../../providers/dexes/ethereum/sushi-swap-ethereum/sushi-swap-ethereum-provider");
const uni_swap_v2_ethereum_provider_1 = require("../../providers/dexes/ethereum/uni-swap-v2-ethereum/uni-swap-v2-ethereum-provider");
const verse_provider_1 = require("../../providers/dexes/ethereum/verse/verse-provider");
const sushi_swap_ethereum_pow_provider_1 = require("../../providers/dexes/ethereum-pow/sushi-swap-ethereum-pow/sushi-swap-ethereum-pow-provider");
const uni_swap_v2_ethereum_pow_provider_1 = require("../../providers/dexes/ethereum-pow/uni-swap-v2-ethereum-pow/uni-swap-v2-ethereum-pow-provider");
const soul_swap_provider_1 = require("../../providers/dexes/fantom/soul-swap/soul-swap-provider");
const spirit_swap_provider_1 = require("../../providers/dexes/fantom/spirit-swap/spirit-swap-provider");
const spooky_swap_provider_1 = require("../../providers/dexes/fantom/spooky-swap/spooky-swap-provider");
const sushi_swap_fantom_provider_1 = require("../../providers/dexes/fantom/sushi-swap-fantom/sushi-swap-fantom-provider");
const joe_fuji_provider_1 = require("../../providers/dexes/fuji/joe-fuji/joe-fuji-provider");
const pangolin_fuji_provider_1 = require("../../providers/dexes/fuji/pangolin-fuji/pangolin-fuji-provider");
const uni_swap_v2_goerli_provider_1 = require("../../providers/dexes/goerli/uni-swap-v2-goerli/uni-swap-v2-goerli-provider");
const sushi_swap_harmony_provider_1 = require("../../providers/dexes/harmony/sushi-swap-harmony/sushi-swap-harmony-provider");
const trader_harmony_provider_1 = require("../../providers/dexes/harmony/trader-harmony/trader-harmony-provider");
const viper_swap_harmony_provider_1 = require("../../providers/dexes/harmony/viper-swap-harmony/viper-swap-harmony-provider");
const elk_provider_1 = require("../../providers/dexes/kava/elk/elk-provider");
const jupiter_swap_provider_1 = require("../../providers/dexes/kava/jupiter-swap/jupiter-swap-provider");
const photon_swap_provider_1 = require("../../providers/dexes/kava/photon-swap/photon-swap-provider");
const surfdex_provider_1 = require("../../providers/dexes/kava/surfdex/surfdex-provider");
const claim_swap_provider_1 = require("../../providers/dexes/klaytn/claim-swap/claim-swap-provider");
const net_swap_provider_1 = require("../../providers/dexes/metis/net-swap/net-swap-provider");
const solarbeam_provider_1 = require("../../providers/dexes/moonriver/solarbeam/solarbeam-provider");
const sushi_swap_moonriver_provider_1 = require("../../providers/dexes/moonriver/sushi-swap-moonriver/sushi-swap-moonriver-provider");
const quick_swap_mumbai_provider_1 = require("../../providers/dexes/mumbai/quick-swap-mumbai/quick-swap-mumbai-provider");
const yuzu_swap_provider_1 = require("../../providers/dexes/oasis/yuzu-swap/yuzu-swap-provider");
const quick_swap_provider_1 = require("../../providers/dexes/polygon/quick-swap/quick-swap-provider");
const sushi_swap_polygon_provider_1 = require("../../providers/dexes/polygon/sushi-swap-polygon/sushi-swap-polygon-provider");
const pulsex_v1_provider_1 = require("../../providers/dexes/pulsechain/pulsex-v1/pulsex-v1-provider");
const pulsex_v2_provider_1 = require("../../providers/dexes/pulsechain/pulsex-v2/pulsex-v2-provider");
const pegasys_provider_1 = require("../../providers/dexes/syscoin/pegasys/pegasys-provider");
const ape_swap_telos_provider_1 = require("../../providers/dexes/telos/ape-swap/ape-swap-telos-provider");
const omnidex_provider_1 = require("../../providers/dexes/telos/omnidex/omnidex-provider");
const sushi_swap_telos_provider_1 = require("../../providers/dexes/telos/sushi-swap-telos/sushi-swap-telos-provider");
const trisolaris_aurora_provider_2 = require("../../providers/dexes/telos/zappy/trisolaris-aurora-provider");
const astro_swap_provider_1 = require("../../providers/dexes/velas/astro-swap/astro-swap-provider");
const wagyu_swap_provider_1 = require("../../providers/dexes/velas/wagyu-swap/wagyu-swap-provider");
const mute_swap_provider_1 = require("../../providers/dexes/zksync/mute-swap/mute-swap-provider");
exports.UniswapV2TradeProviders = [
    // ethereum
    uni_swap_v2_ethereum_provider_1.UniSwapV2EthereumProvider,
    sushi_swap_ethereum_provider_1.SushiSwapEthereumProvider,
    verse_provider_1.VerseProvider,
    // bsc
    sushi_swap_bsc_provider_1.SushiSwapBscProvider,
    // polygon
    quick_swap_provider_1.QuickSwapProvider,
    sushi_swap_polygon_provider_1.SushiSwapPolygonProvider,
    // avalanche
    joe_provider_1.JoeProvider,
    pangolin_provider_1.PangolinProvider,
    sushi_swap_avalanche_provider_1.SushiSwapAvalancheProvider,
    // moonriver
    solarbeam_provider_1.SolarbeamProvider,
    sushi_swap_moonriver_provider_1.SushiSwapMoonriverProvider,
    // fantom
    spirit_swap_provider_1.SpiritSwapProvider,
    spooky_swap_provider_1.SpookySwapProvider,
    soul_swap_provider_1.SoulSwapProvider,
    sushi_swap_fantom_provider_1.SushiSwapFantomProvider,
    // harmony
    sushi_swap_harmony_provider_1.SushiSwapHarmonyProvider,
    viper_swap_harmony_provider_1.ViperSwapHarmonyProvider,
    trader_harmony_provider_1.TradeHarmonySwapProvider,
    // arbitrum
    sushi_swap_arbitrum_provider_1.SushiSwapArbitrumProvider,
    // aurora
    trisolaris_aurora_provider_1.TrisolarisAuroraProvider,
    wanna_swap_aurora_provider_1.WannaSwapAuroraProvider,
    // telos
    sushi_swap_telos_provider_1.SushiSwapTelosProvider,
    trisolaris_aurora_provider_2.ZappyProvider,
    ape_swap_telos_provider_1.ApeSwapTelosProvider,
    omnidex_provider_1.OmnidexProvider,
    // Boba
    oolong_swap_provider_1.OolongSwapProvider,
    // Ethereum PoW
    uni_swap_v2_ethereum_pow_provider_1.UniSwapV2EthereumPowProvider,
    sushi_swap_ethereum_pow_provider_1.SushiSwapEthereumPowProvider,
    // Kava
    jupiter_swap_provider_1.JupiterSwapProvider,
    photon_swap_provider_1.PhotonSwapProvider,
    elk_provider_1.ElkProvider,
    surfdex_provider_1.SurfdexProvider,
    // Oasis
    yuzu_swap_provider_1.YuzuSwapProvider,
    // Metis
    net_swap_provider_1.NetSwapProvider,
    // Klaytn
    claim_swap_provider_1.ClaimSwapProvider,
    // Velas
    wagyu_swap_provider_1.WagyuSwapProvider,
    astro_swap_provider_1.AstroSwapProvider,
    // Syscoin
    pegasys_provider_1.PegasysProvider,
    // Cronos
    crona_swap_provider_1.CronaSwapProvider,
    cro_swap_provider_1.CroSwapProvider,
    crodex_provider_1.CrodexProvider,
    // Astar EVM
    arth_swap_provider_1.ArthSwapProvider,
    // ZkSync
    mute_swap_provider_1.MuteSwapProvider,
    // Pulsechain
    pulsex_v1_provider_1.PulseXV1Provider,
    pulsex_v2_provider_1.PulseXV2Provider,
    // Base
    base_swap_provider_1.BaseSwapProvider,
    aerodrome_provider_1.AerodromeProvider,
    // BSC Testnet
    pancake_swap_testnet_provider_1.PancakeSwapTestnetProvider,
    trader_joe_bsct_provider_1.TraderJoeBsctProvider,
    // Goerli
    uni_swap_v2_goerli_provider_1.UniSwapV2GoerliProvider,
    // Mumbai
    quick_swap_mumbai_provider_1.QuickSwapMumbaiProvider,
    // Fuji
    joe_fuji_provider_1.JoeFujiProvider,
    pangolin_fuji_provider_1.PangolinFujiProvider
    // Scroll
    // UniSwapV2ScrollSepoliaProvider
];
//# sourceMappingURL=uniswap-v2-trade-providers.js.map