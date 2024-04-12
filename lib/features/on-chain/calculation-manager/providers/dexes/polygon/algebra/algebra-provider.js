"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlgebraProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const evm_web3_pure_1 = require("../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const token_native_address_proxy_1 = require("../../../../../../common/utils/token-native-address-proxy");
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const algebra_quoter_controller_1 = require("../../common/algebra/algebra-quoter-controller");
const uniswap_v3_algebra_abstract_provider_1 = require("../../common/uniswap-v3-algebra-abstract/uniswap-v3-algebra-abstract-provider");
const algebra_trade_1 = require("./algebra-trade");
const provider_configuration_1 = require("./constants/provider-configuration");
const swap_router_contract_data_1 = require("./constants/swap-router-contract-data");
const quoter_contract_data_1 = require("./utils/quoter-controller/constants/quoter-contract-data");
const default_constants_1 = require("../default-constants");
class AlgebraProvider extends uniswap_v3_algebra_abstract_provider_1.UniswapV3AlgebraAbstractProvider {
    constructor() {
        super(...arguments);
        this.contractAddress = swap_router_contract_data_1.ALGEBRA_SWAP_ROUTER_CONTRACT_ADDRESS;
        this.contractAbi = swap_router_contract_data_1.ALGEBRA_SWAP_ROUTER_CONTRACT_ABI;
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.POLYGON;
        this.OnChainTradeClass = algebra_trade_1.AlgebraTrade;
        this.quoterController = new algebra_quoter_controller_1.AlgebraQuoterController(this.blockchain, default_constants_1.defaultPolygonProviderConfiguration.routingProvidersAddresses, quoter_contract_data_1.ALGEBRA_QUOTER_CONTRACT_ADDRESS, quoter_contract_data_1.ALGEBRA_QUOTER_CONTRACT_ABI);
        this.providerConfiguration = provider_configuration_1.ALGEBRA_V3_PROVIDER_CONFIGURATION;
    }
    get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.ALGEBRA;
    }
    createTradeInstance(tradeStruct, route, providerAddress) {
        const path = (0, token_native_address_proxy_1.createTokenNativeAddressProxyInPathStartAndEnd)(route.path, evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress);
        return new algebra_trade_1.AlgebraTrade({
            ...tradeStruct,
            path,
            route
        }, providerAddress);
    }
}
exports.AlgebraProvider = AlgebraProvider;
//# sourceMappingURL=algebra-provider.js.map