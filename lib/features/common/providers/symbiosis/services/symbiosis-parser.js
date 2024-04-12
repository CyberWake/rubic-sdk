"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbiosisParser = void 0;
const blockchain_id_1 = require("../../../../../core/blockchain/utils/blockchains-info/constants/blockchain-id");
const web3_pure_1 = require("../../../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../../../core/injector/injector");
class SymbiosisParser {
    static getSwapRequestBody(fromToken, toToken, options) {
        const walletAddress = injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(fromToken.blockchain).address;
        const toAddress = options.receiverAddress ?? walletAddress;
        const fromAddress = options.fromAddress ?? walletAddress;
        const slippage = options.slippage * 10000;
        const tokenAmountIn = {
            address: fromToken.address,
            decimals: fromToken.decimals,
            chainId: blockchain_id_1.blockchainId[fromToken.blockchain],
            amount: web3_pure_1.Web3Pure.toWei(fromToken.tokenAmount, fromToken.decimals)
        };
        const tokenOut = {
            address: toToken.address,
            decimals: toToken.decimals,
            chainId: blockchain_id_1.blockchainId[toToken.blockchain]
        };
        return {
            from: fromAddress,
            to: toAddress,
            slippage,
            tokenAmountIn,
            tokenOut
        };
    }
}
exports.SymbiosisParser = SymbiosisParser;
//# sourceMappingURL=symbiosis-parser.js.map