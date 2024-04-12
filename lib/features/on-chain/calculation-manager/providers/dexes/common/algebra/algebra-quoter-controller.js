"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlgebraQuoterController = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../../common/errors");
const tokens_1 = require("../../../../../../../common/tokens");
const object_1 = require("../../../../../../../common/utils/object");
const injector_1 = require("../../../../../../../core/injector/injector");
const quoter_contract_data_1 = require("../uniswap-v3-abstract/utils/quoter-controller/constants/quoter-contract-data");
const uniswap_v3_algebra_quoter_controller_1 = require("../uniswap-v3-algebra-abstract/models/uniswap-v3-algebra-quoter-controller");
/**
 * Works with requests, related to Uniswap v3 liquidity pools.
 */
class AlgebraQuoterController extends uniswap_v3_algebra_quoter_controller_1.UniswapV3AlgebraQuoterController {
    /**
     * Converts algebra route to encoded bytes string to pass it to contract.
     * Structure of encoded string: '0x${tokenAddress_0}${tokenAddress_1}...${tokenAddress_n}.
     * @param path Symbol tokens, included in route.
     * @returns string Encoded string.
     */
    static getEncodedPath(path) {
        const encodedPath = path.reduce((accEncodedPath, token) => accEncodedPath + token.address.slice(2).toLowerCase(), '');
        return `0x${encodedPath}`;
    }
    /**
     * Returns swap method's name and arguments to pass it to Quoter contract.
     * @param path Pools, included in route.
     * @param exact Is exact input or output trade.
     * @param weiAmount Amount of tokens to trade.
     */
    static getQuoterMethodData(path, exact, weiAmount) {
        if (path.length === 2 && path?.[0] && path?.[1]) {
            const methodName = exact === 'input' ? 'quoteExactInputSingle' : 'quoteExactOutputSingle';
            const limitSqrtPrice = 0;
            return {
                path,
                methodData: {
                    methodName,
                    methodArguments: [path[0].address, path[1].address, weiAmount, limitSqrtPrice]
                }
            };
        }
        const methodName = exact === 'input' ? 'quoteExactInput' : 'quoteExactOutput';
        const tokensPath = exact === 'input' ? path : path.reverse();
        return {
            path,
            methodData: {
                methodName,
                methodArguments: [AlgebraQuoterController.getEncodedPath(tokensPath), weiAmount]
            }
        };
    }
    get web3Public() {
        return injector_1.Injector.web3PublicService.getWeb3Public(this.blockchain);
    }
    constructor(blockchain, routingTokensAddresses, quoterContractAddress = quoter_contract_data_1.UNISWAP_V3_QUOTER_CONTRACT_ADDRESS, quoterContractABI = quoter_contract_data_1.UNISWAP_V3_QUOTER_CONTRACT_ABI) {
        super();
        this.blockchain = blockchain;
        this.routingTokensAddresses = routingTokensAddresses;
        this.quoterContractAddress = quoterContractAddress;
        this.quoterContractABI = quoterContractABI;
    }
    async getOrCreateRouterTokens() {
        if (!this.routerTokens) {
            this.routerTokens = await tokens_1.Token.createTokens(this.routingTokensAddresses, this.blockchain);
        }
        return this.routerTokens;
    }
    async getAllRoutes(from, to, exact, weiAmount, routeMaxTransitTokens) {
        const routesTokens = (await this.getOrCreateRouterTokens()).filter(token => !token.isEqualToTokens([from, to]));
        const options = {
            routesTokens,
            to,
            exact,
            weiAmount
        };
        const quoterMethodsData = [...Array(routeMaxTransitTokens + 1)]
            .map((_, maxTransitTokens) => this.getQuoterMethodsData({
            ...options,
            maxTransitTokens
        }, [from]))
            .flat();
        const results = await this.web3Public.multicallContractMethods(this.quoterContractAddress, this.quoterContractABI, quoterMethodsData.map(quoterMethodData => quoterMethodData.methodData));
        return results
            .map((result, index) => {
            if (result.success) {
                const quoter = quoterMethodsData?.[index];
                if (!quoter) {
                    throw new errors_1.RubicSdkError('Quoter has to be defined');
                }
                return {
                    outputAbsoluteAmount: new bignumber_js_1.default(result.output),
                    path: quoter.path
                };
            }
            return null;
        })
            .filter(object_1.notNull);
    }
    /**
     * Returns swap methods' names and arguments, built with passed pools' addresses, to use it in Quoter contract.
     */
    getQuoterMethodsData(options, path) {
        const { routesTokens, to, exact, weiAmount, maxTransitTokens } = options;
        if (path.length === maxTransitTokens + 1) {
            return [AlgebraQuoterController.getQuoterMethodData(path.concat(to), exact, weiAmount)];
        }
        return routesTokens
            .filter(token => !path.includes(token))
            .map(token => this.getQuoterMethodsData(options, path.concat(token)))
            .flat();
    }
}
exports.AlgebraQuoterController = AlgebraQuoterController;
//# sourceMappingURL=algebra-quoter-controller.js.map