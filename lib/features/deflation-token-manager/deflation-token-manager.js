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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeflationTokenManager = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../common/errors");
const tokens_1 = require("../../common/tokens");
const native_tokens_1 = require("../../common/tokens/constants/native-tokens");
const decorators_1 = require("../../common/utils/decorators");
const object_1 = require("../../common/utils/object");
const blockchain_name_1 = require("../../core/blockchain/models/blockchain-name");
const evm_web3_pure_1 = require("../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const web3_pure_1 = require("../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../core/injector/injector");
const deflation_manager_supported_blockchain_1 = require("./models/deflation-manager-supported-blockchain");
const uniswap_v2_trade_providers_1 = require("../on-chain/calculation-manager/constants/trade-providers/uniswap-v2-trade-providers");
const simulator_contract_abi_1 = require("./constants/simulator-contract-abi");
const simulator_contract_address_1 = require("./constants/simulator-contract-address");
const DEADLINE = 9999999999;
const SIMULATOR_CALLER = '0x0000000000000000000000000000000000000001';
const ERROR_SELECTOR = '0x02f19474';
const NATIVE_TOKEN_AMOUNT = Object.values(blockchain_name_1.EVM_BLOCKCHAIN_NAME).reduce((acc, blockchain) => {
    let tokenAmount = 0.5;
    if (blockchain === blockchain_name_1.BLOCKCHAIN_NAME.POLYGON || blockchain === blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE) {
        tokenAmount = 10;
    }
    else if (blockchain === blockchain_name_1.BLOCKCHAIN_NAME.FANTOM) {
        tokenAmount = 230;
    }
    return {
        ...acc,
        [blockchain]: tokenAmount
    };
}, {});
/**
 * Contains method to check token for deflation.
 */
class DeflationTokenManager {
    static isSupportedBlockchain(blockchain) {
        return deflation_manager_supported_blockchain_1.deflationManagerSupportedBlockchains.some(supportedBlockchain => supportedBlockchain === blockchain);
    }
    async checkToken(token) {
        const isDeflationToken = await this.isDeflationToken(token);
        if (isDeflationToken.isDeflation) {
            throw new errors_1.DeflationTokenError(token, isDeflationToken.percent);
        }
    }
    async isDeflationToken(token) {
        if (!DeflationTokenManager.isSupportedBlockchain(token.blockchain) ||
            evm_web3_pure_1.EvmWeb3Pure.isNativeAddress(token.address)) {
            return { isDeflation: false };
        }
        const evmToken = new tokens_1.Token({
            ...token,
            blockchain: token.blockchain
        });
        const bestTrade = await this.findUniswapV2Trade(evmToken);
        if (!bestTrade) {
            return { isDeflation: false };
        }
        try {
            await this.simulateTransferWithSwap(bestTrade, evmToken);
        }
        catch (error) {
            if (error?.data?.includes(ERROR_SELECTOR)) {
                return this.parseError(error.data);
            }
        }
        return { isDeflation: false };
    }
    async findUniswapV2Trade(evmToken) {
        const uniswapV2Providers = uniswap_v2_trade_providers_1.UniswapV2TradeProviders.map(ProviderClass => {
            const provider = new ProviderClass();
            return provider.blockchain === evmToken.blockchain ? provider : null;
        }).filter(object_1.notNull);
        const nativeToken = native_tokens_1.nativeTokensList[evmToken.blockchain];
        const from = new tokens_1.PriceTokenAmount({
            ...nativeToken,
            price: new bignumber_js_1.default(NaN),
            tokenAmount: new bignumber_js_1.default(NATIVE_TOKEN_AMOUNT[evmToken.blockchain])
        });
        const to = new tokens_1.PriceToken({
            ...evmToken,
            price: new bignumber_js_1.default(NaN)
        });
        const uniswapV2Trades = await Promise.allSettled(uniswapV2Providers.map(uniswapV2Provider => uniswapV2Provider.calculate(from, to, {
            slippageTolerance: 1,
            deadlineMinutes: DEADLINE,
            gasCalculation: 'disabled'
        })));
        return uniswapV2Trades
            .map(trade => (trade.status === 'fulfilled' ? trade.value : null))
            .filter(object_1.notNull)[0];
    }
    async simulateTransferWithSwap(uniswapV2Trade, token) {
        const { data } = await uniswapV2Trade.encodeDirect({
            fromAddress: SIMULATOR_CALLER,
            receiverAddress: simulator_contract_address_1.simulatorContractAddress[token.blockchain],
            supportFee: true
        });
        const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(token.blockchain);
        const simulatorAddress = simulator_contract_address_1.simulatorContractAddress[token.blockchain];
        const value = web3_pure_1.Web3Pure.toWei(NATIVE_TOKEN_AMOUNT[token.blockchain]);
        await web3Public.staticCallContractMethod(simulatorAddress, simulator_contract_abi_1.simulatorContractAbi, 'simulateTransferWithSwap', [uniswapV2Trade.dexContractAddress, token.address, data], {
            value,
            from: SIMULATOR_CALLER
        });
    }
    parseError(errorData) {
        const decoded = evm_web3_pure_1.EvmWeb3Pure.decodeData('AmntReceived_AmntExpected_TransferSwap', [
            ['bool', 'isWhitelisted'],
            ['uint256', 'amountReceived'],
            ['uint256', 'amountExpected']
        ], errorData);
        const received = new bignumber_js_1.default(decoded.amountReceived.toHexString());
        const expected = new bignumber_js_1.default(decoded.amountExpected.toHexString());
        const percent = new bignumber_js_1.default(1).minus(received.dividedBy(expected)).multipliedBy(100);
        if (percent.eq(0)) {
            return { isDeflation: false };
        }
        return {
            isDeflation: true,
            percent,
            isWhitelisted: decoded.isWhitelisted
        };
    }
}
exports.DeflationTokenManager = DeflationTokenManager;
__decorate([
    decorators_1.Cache
], DeflationTokenManager.prototype, "isDeflationToken", null);
//# sourceMappingURL=deflation-token-manager.js.map