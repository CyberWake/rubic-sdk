"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAddressCorrect = void 0;
const blockchains_info_1 = require("../../../core/blockchain/utils/blockchains-info/blockchains-info");
const web3_pure_1 = require("../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../core/injector/injector");
const cross_chain_trade_type_1 = require("../../cross-chain/calculation-manager/models/cross-chain-trade-type");
const changenow_api_blockchain_1 = require("../../cross-chain/calculation-manager/providers/changenow-provider/constants/changenow-api-blockchain");
async function isAddressCorrect(address, toBlockchain, crossChainType) {
    try {
        if (crossChainType === cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.CHANGENOW) {
            const chain = changenow_api_blockchain_1.changenowApiBlockchain[toBlockchain];
            const response = await injector_1.Injector.httpClient.get(`https://api.changenow.io/v2/validate/address?currency=${chain.toLowerCase()}&address=${address}`);
            return response.result;
        }
        const blockchainProvider = web3_pure_1.Web3Pure[blockchains_info_1.BlockchainsInfo.getChainType(toBlockchain)];
        return blockchainProvider.isAddressCorrect(address);
    }
    catch {
        return true;
    }
}
exports.isAddressCorrect = isAddressCorrect;
//# sourceMappingURL=check-address.js.map