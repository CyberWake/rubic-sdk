"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniSwapV3ScrollSepoliaProvider = void 0;
const errors_1 = require("../../../../../../../common/errors");
const blockchain_1 = require("../../../../../../../common/utils/blockchain");
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const evm_web3_pure_1 = require("../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const token_native_address_proxy_1 = require("../../../../../../common/utils/token-native-address-proxy");
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const quoter_contract_data_1 = require("../../common/uniswap-v3-abstract/utils/quoter-controller/constants/quoter-contract-data");
const uniswap_v3_quoter_controller_1 = require("../../common/uniswap-v3-abstract/utils/quoter-controller/uniswap-v3-quoter-controller");
const uniswap_v3_algebra_abstract_provider_1 = require("../../common/uniswap-v3-algebra-abstract/uniswap-v3-algebra-abstract-provider");
const provider_configuration_1 = require("./constants/provider-configuration");
const router_configuration_1 = require("./constants/router-configuration");
const uni_swap_v3_scroll_sepolia_trade_1 = require("./uni-swap-v3-scroll-sepolia-trade");
const swap_router_contract_abi_1 = require("../../common/uniswap-v3-abstract/constants/swap-router-contract-abi");
class UniSwapV3ScrollSepoliaProvider extends uniswap_v3_algebra_abstract_provider_1.UniswapV3AlgebraAbstractProvider {
    constructor() {
        super(...arguments);
        this.contractAddress = '0x59a662Ed724F19AD019307126CbEBdcF4b57d6B1';
        this.contractAbi = swap_router_contract_abi_1.UNISWAP_V3_SWAP_ROUTER_CONTRACT_ABI;
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.SCROLL_SEPOLIA;
        this.OnChainTradeClass = uni_swap_v3_scroll_sepolia_trade_1.UniSwapV3ScrollSepoliaTrade;
        this.providerConfiguration = provider_configuration_1.UNI_SWAP_V3_SCROLL_SEPOLIA_PROVIDER_CONFIGURATION;
        this.routerConfiguration = router_configuration_1.UNI_SWAP_V3_SCROLL_SEPOLIA_ROUTER_CONFIGURATION;
        this.quoterController = new uniswap_v3_quoter_controller_1.UniswapV3QuoterController(this.blockchain, this.routerConfiguration, '0x805488DaA81c1b9e7C5cE3f1DCeA28F21448EC6A', quoter_contract_data_1.UNISWAP_V3_QUOTER_CONTRACT_ABI, '0xB856587fe1cbA8600F75F1b1176E44250B11C788');
    }
    get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.UNI_SWAP_V3;
    }
    createTradeInstance(tradeStruct, route, providerAddress) {
        const path = this.extractPath(route);
        return new this.OnChainTradeClass({
            ...tradeStruct,
            path,
            route
        }, providerAddress);
    }
    extractPath(route) {
        const initialPool = route.poolsPath[0];
        if (!initialPool) {
            throw new errors_1.RubicSdkError('Initial pool has to be defined');
        }
        const path = [
            (0, blockchain_1.compareAddresses)(initialPool.token0.address, route.initialTokenAddress)
                ? initialPool.token0
                : initialPool.token1
        ];
        const lastToken = path[path.length - 1];
        if (!lastToken) {
            throw new errors_1.RubicSdkError('Last token has to be defined');
        }
        route.poolsPath.forEach(pool => {
            path.push(!(0, blockchain_1.compareAddresses)(pool.token0.address, lastToken.address)
                ? pool.token0
                : pool.token1);
        });
        return (0, token_native_address_proxy_1.createTokenNativeAddressProxyInPathStartAndEnd)(path, evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress);
    }
}
exports.UniSwapV3ScrollSepoliaProvider = UniSwapV3ScrollSepoliaProvider;
//# sourceMappingURL=uni-swap-v3-scroll-sepolia-provider.js.map