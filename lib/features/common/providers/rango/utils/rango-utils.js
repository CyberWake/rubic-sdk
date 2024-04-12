"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangoUtils = void 0;
const tokens_1 = require("../../../../../common/tokens");
const blockchain_name_1 = require("../../../../../core/blockchain/models/blockchain-name");
const tx_status_1 = require("../../../../../core/blockchain/web3-public-service/web3-public/models/tx-status");
const cross_chain_trade_type_1 = require("../../../../cross-chain/calculation-manager/models/cross-chain-trade-type");
const rango_api_blockchain_names_1 = require("../models/rango-api-blockchain-names");
const rango_api_status_types_1 = require("../models/rango-api-status-types");
const rango_api_symbol_names_1 = require("../models/rango-api-symbol-names");
const rango_api_trade_types_1 = require("../models/rango-api-trade-types");
class RangoUtils {
    /**
     * @returns Query-param string in format `chainName.symbol--address`, chainName's compatible with rango-api
     */
    static async getFromToQueryParam(token) {
        const rangoBlockchainName = rango_api_blockchain_names_1.rangoApiBlockchainNames[token.blockchain];
        const symbol = token.isNative
            ? rango_api_symbol_names_1.rangoApiSymbols[token.blockchain]
            : (await tokens_1.Token.createToken({ address: token.address, blockchain: token.blockchain }))
                .symbol;
        if (token.isNative && token.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.METIS) {
            return `${rangoBlockchainName}.${symbol}--0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000`;
        }
        const param = token.isNative
            ? `${rangoBlockchainName}.${symbol}`
            : `${rangoBlockchainName}.${symbol}--${token.address}`;
        return param;
    }
    static convertStatusForRubic(rangoStatus) {
        if (rangoStatus === rango_api_status_types_1.RANGO_SWAP_STATUS.SUCCESS) {
            return tx_status_1.TX_STATUS.SUCCESS;
        }
        if (rangoStatus === rango_api_status_types_1.RANGO_SWAP_STATUS.RUNNING) {
            return tx_status_1.TX_STATUS.PENDING;
        }
        return tx_status_1.TX_STATUS.FAIL;
    }
    static getRubicBlockchainByRangoBlockchain(rangoBlockchainName) {
        const blockchainName = Object.entries(rango_api_blockchain_names_1.rangoApiBlockchainNames).find(([_, value]) => value === rangoBlockchainName)[0];
        return blockchainName;
    }
    static getTradeTypeForRubic(swapType, rangoTradeType) {
        if (swapType === 'cross-chain') {
            const found = Object.entries(rango_api_trade_types_1.rangoCrossChainTradeTypes).find(([_, value]) => value === rangoTradeType);
            if (found) {
                return found[0];
            }
        }
        if (swapType === 'on-chain') {
            const found = Object.entries(rango_api_trade_types_1.rangoOnChainTradeTypes).find(([_, value]) => value === rangoTradeType);
            if (found) {
                return found[0];
            }
        }
        return cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.RANGO;
    }
    static getTradeTypeForRango(rubicTradeType) {
        return rango_api_trade_types_1.rangoTradeTypes[rubicTradeType];
    }
}
exports.RangoUtils = RangoUtils;
//# sourceMappingURL=rango-utils.js.map