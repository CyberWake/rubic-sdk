"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickSwapV3PolygonZKEVMProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const evm_web3_pure_1 = require("../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const token_native_address_proxy_1 = require("../../../../../../common/utils/token-native-address-proxy");
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const quickswap_v3_quoter_controller_1 = require("../../common/quickswap-v3/quickswap-v3-quoter-controller");
const uniswap_v3_algebra_abstract_provider_1 = require("../../common/uniswap-v3-algebra-abstract/uniswap-v3-algebra-abstract-provider");
const swap_router_contract_data_1 = require("../../polygon/quick-swap-v3/constants/swap-router-contract-data");
const default_constants_1 = require("../default-constants");
const provider_configuration_1 = require("./constants/provider-configuration");
const swap_router_contract_data_2 = require("./constants/swap-router-contract-data");
const quick_swap_v3_trade_1 = require("./quick-swap-v3-trade");
const quoter_contract_data_1 = require("./utils/quoter-controller/constants/quoter-contract-data");
class QuickSwapV3PolygonZKEVMProvider extends uniswap_v3_algebra_abstract_provider_1.UniswapV3AlgebraAbstractProvider {
    constructor() {
        super(...arguments);
        this.contractAddress = swap_router_contract_data_2.QUICK_SWAP_V3_POLYGON_ZKEVM_ROUTER_CONTRACT_ADDRESS;
        this.contractAbi = swap_router_contract_data_1.QUICK_SWAP_V3_ROUTER_CONTRACT_ABI;
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.POLYGON_ZKEVM;
        this.OnChainTradeClass = quick_swap_v3_trade_1.QuickSwapV3PolygonZKEVMTrade;
        this.quoterController = new quickswap_v3_quoter_controller_1.QuickswapV3QuoterController(this.blockchain, default_constants_1.defaultPolygonZKEVMProviderConfiguration.routingProvidersAddresses, quoter_contract_data_1.QUICK_SWAP_V3_POLYGON_ZKEVM_QUOTER_CONTRACT_ADDRESS, quoter_contract_data_1.QUICK_SWAP_V3_POLYGON_ZKEVM_QUOTER_CONTRACT_ABI);
        this.providerConfiguration = provider_configuration_1.QUICK_SWAP_V3_POLYGON_ZKEVM_PROVIDER_CONFIGURATION;
    }
    get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.QUICK_SWAP_V3;
    }
    createTradeInstance(tradeStruct, route, providerAddress) {
        const path = (0, token_native_address_proxy_1.createTokenNativeAddressProxyInPathStartAndEnd)(route.path, evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress);
        return new quick_swap_v3_trade_1.QuickSwapV3PolygonZKEVMTrade({
            ...tradeStruct,
            path,
            route
        }, providerAddress);
    }
}
exports.QuickSwapV3PolygonZKEVMProvider = QuickSwapV3PolygonZKEVMProvider;
//# sourceMappingURL=quick-swap-v3-provider.js.map