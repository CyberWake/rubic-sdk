"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AerodromePathFactory = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../../common/errors");
const tokens_1 = require("../../../../../../../common/tokens");
const object_1 = require("../../../../../../../common/utils/object");
const path_factory_1 = require("../../common/uniswap-v2-abstract/path-factory");
class AerodromePathFactory extends path_factory_1.PathFactory {
    constructor() {
        super(...arguments);
        this.routes = [];
    }
    calculateRoutes(tokens, finalPath) {
        const updRoutesMethodArgumentsWithTransitToken = (finalPath, tokenA, tokenB, tokenC, isPairAStablePool, isPairBStablePool) => {
            this.routes.push({
                path: finalPath,
                methodArguments: [
                    this.stringWeiAmount,
                    [
                        [
                            tokenA,
                            tokenB,
                            isPairAStablePool,
                            '0x420DD381b31aEf6683db6B902084cB0FFECe40Da'
                        ],
                        [
                            tokenB,
                            tokenC,
                            isPairBStablePool,
                            '0x420DD381b31aEf6683db6B902084cB0FFECe40Da'
                        ]
                    ]
                ]
            });
        };
        const updRoutesMethodArgumentsWithoutTransitToken = (finalPath, tokenA, tokenB, isStable) => {
            this.routes.push({
                path: finalPath,
                methodArguments: [
                    this.stringWeiAmount,
                    [[tokenA, tokenB, isStable, '0x420DD381b31aEf6683db6B902084cB0FFECe40Da']]
                ]
            });
        };
        if (tokens.length > 3) {
            throw new errors_1.RubicSdkError('Maximum number of transit tokens: 1');
        }
        if (tokens.length === 2) {
            updRoutesMethodArgumentsWithoutTransitToken(finalPath, tokens[0], tokens[1], true);
            updRoutesMethodArgumentsWithoutTransitToken(finalPath, tokens[0], tokens[1], false);
        }
        if (tokens.length === 3) {
            updRoutesMethodArgumentsWithTransitToken(finalPath, tokens[0], tokens[1], tokens[2], true, true);
            updRoutesMethodArgumentsWithTransitToken(finalPath, tokens[0], tokens[1], tokens[2], false, false);
            updRoutesMethodArgumentsWithTransitToken(finalPath, tokens[0], tokens[1], tokens[2], false, true);
            updRoutesMethodArgumentsWithTransitToken(finalPath, tokens[0], tokens[1], tokens[2], true, false);
        }
    }
    async getAllRoutes() {
        const transitTokens = await tokens_1.Token.createTokens(this.routingProvidersAddresses, this.from.blockchain);
        const vertexes = transitTokens.filter(elem => !elem.isEqualTo(this.from) && !elem.isEqualTo(this.to));
        const initialPath = [this.from];
        const recGraphVisitor = (path, transitTokensLimit) => {
            if (path.length === transitTokensLimit + 1) {
                const finalPath = path.concat(this.to);
                this.calculateRoutes(tokens_1.Token.tokensToAddresses(finalPath), finalPath);
                return;
            }
            vertexes
                .filter(vertex => path.every(token => !token.isEqualTo(vertex)))
                .forEach(vertex => {
                const extendedPath = path.concat(vertex);
                recGraphVisitor(extendedPath, transitTokensLimit);
            });
        };
        for (let i = 0; i <= this.maxTransitTokens; i++) {
            recGraphVisitor(initialPath, i);
        }
        const responses = await this.UniswapV2TradeClass.callForRoutes(this.from.blockchain, this.exact, this.routes.map(route => route.methodArguments));
        const tokens = responses.map((response, index) => {
            if (!response.success || !response.output || !(response.output[1] !== '0')) {
                return null;
            }
            const amounts = response.output;
            const numberAmount = this.exact === 'input' ? amounts[amounts.length - 1] : amounts[0];
            if (!numberAmount) {
                throw new errors_1.RubicSdkError('Amount has to be defined');
            }
            const outputAbsoluteAmount = new bignumber_js_1.default(numberAmount);
            const path = this.routes?.[index]?.path;
            const routPoolInfo = this.routes?.[index]?.methodArguments[1];
            if (!path || !routPoolInfo) {
                throw new errors_1.RubicSdkError('Path has to be defined');
            }
            return { outputAbsoluteAmount, path, routPoolInfo };
        });
        return tokens.filter(object_1.notNull);
    }
}
exports.AerodromePathFactory = AerodromePathFactory;
//# sourceMappingURL=aerodrome-path-factory.js.map