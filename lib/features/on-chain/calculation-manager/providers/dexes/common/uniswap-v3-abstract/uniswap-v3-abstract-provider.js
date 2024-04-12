"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniswapV3AbstractProvider = void 0;
const errors_1 = require("../../../../../../../common/errors");
const blockchain_1 = require("../../../../../../../common/utils/blockchain");
const evm_web3_pure_1 = require("../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const token_native_address_proxy_1 = require("../../../../../../common/utils/token-native-address-proxy");
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const swap_router_contract_abi_1 = require("./constants/swap-router-contract-abi");
const uniswap_v3_algebra_abstract_provider_1 = require("../uniswap-v3-algebra-abstract/uniswap-v3-algebra-abstract-provider");
class UniswapV3AbstractProvider extends uniswap_v3_algebra_abstract_provider_1.UniswapV3AlgebraAbstractProvider {
    constructor() {
        super(...arguments);
        this.contractAddress = swap_router_contract_abi_1.UNISWAP_V3_SWAP_ROUTER_CONTRACT_ADDRESS;
        this.contractAbi = swap_router_contract_abi_1.UNISWAP_V3_SWAP_ROUTER_CONTRACT_ABI;
        this.isRubicOptimisationEnabled = false;
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
exports.UniswapV3AbstractProvider = UniswapV3AbstractProvider;
//# sourceMappingURL=uniswap-v3-abstract-provider.js.map