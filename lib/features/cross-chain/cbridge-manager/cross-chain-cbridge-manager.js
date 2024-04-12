"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrossChainCbridgeManager = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const blockchain_1 = require("../../../common/utils/blockchain");
const chain_type_1 = require("../../../core/blockchain/models/chain-type");
const blockchains_info_1 = require("../../../core/blockchain/utils/blockchains-info/blockchains-info");
const injector_1 = require("../../../core/injector/injector");
const cbridge_cross_chain_api_service_1 = require("../calculation-manager/providers/cbridge/cbridge-cross-chain-api-service");
const cbridge_contract_abi_1 = require("../calculation-manager/providers/cbridge/constants/cbridge-contract-abi");
const cbridge_contract_address_1 = require("../calculation-manager/providers/cbridge/constants/cbridge-contract-address");
const cbridge_status_response_1 = require("../calculation-manager/providers/cbridge/models/cbridge-status-response");
const web3_1 = __importDefault(require("web3"));
class CrossChainCbridgeManager {
    static async getTransferId(sourceTransaction, fromBlockchain) {
        const transactionRecipient = await injector_1.Injector.web3PublicService
            .getWeb3Public(fromBlockchain)
            .getTransactionReceipt(sourceTransaction);
        const transferLog = transactionRecipient.logs.find(log => (0, blockchain_1.compareAddresses)(log.topics[0], '0x89d8051e597ab4178a863a5190407b98abfeff406aa8db90c59af76612e58f01'));
        const abiCoder = new web3_1.default().eth.abi;
        const inputs = cbridge_contract_abi_1.cbridgeContractAbi.find(abiItem => abiItem?.type === 'event' && abiItem?.name === 'Send')?.inputs;
        const decodedParams = abiCoder.decodeParameters(inputs, transferLog.data);
        const { transferId } = decodedParams;
        if (transferId.includes('0x')) {
            return transferId.slice(2);
        }
        return transferId;
    }
    static async makeRefund(fromBlockchain, sourceTransaction, estimateAmount, onTransactionHash) {
        try {
            const useTestnet = blockchains_info_1.BlockchainsInfo.isTestBlockchainName(fromBlockchain);
            const transferId = await CrossChainCbridgeManager.getTransferId(sourceTransaction, fromBlockchain);
            const statusResponse = await cbridge_cross_chain_api_service_1.CbridgeCrossChainApiService.fetchTradeStatus(transferId, {
                useTestnet
            });
            if (cbridge_status_response_1.TRANSFER_HISTORY_STATUS_CODE[statusResponse.status] ===
                cbridge_status_response_1.TRANSFER_HISTORY_STATUS.TRANSFER_TO_BE_REFUNDED) {
                await cbridge_cross_chain_api_service_1.CbridgeCrossChainApiService.withdrawLiquidity(transferId, estimateAmount, {
                    useTestnet
                });
                await new Promise(resolve => setTimeout(resolve, 10000));
                return CrossChainCbridgeManager.transferRefund(fromBlockchain, statusResponse, onTransactionHash);
            }
            if (cbridge_status_response_1.TRANSFER_HISTORY_STATUS_CODE[statusResponse.status] ===
                cbridge_status_response_1.TRANSFER_HISTORY_STATUS.TRANSFER_REFUND_TO_BE_CONFIRMED) {
                return CrossChainCbridgeManager.transferRefund(fromBlockchain, statusResponse, onTransactionHash);
            }
            return null;
        }
        catch (err) {
            console.debug(err);
            return null;
        }
    }
    static async transferRefund(fromBlockchain, statusResponse, onTransactionHash) {
        const wdmsg = `0x${Buffer.from(statusResponse.wd_onchain, 'base64').toString('hex')}`;
        const sigs = statusResponse.sorted_sigs.map(sign => `0x${Buffer.from(sign, 'base64').toString('hex')}`);
        const signers = statusResponse.signers.map(signer => `0x${Buffer.from(signer, 'base64').toString('hex')}`);
        const powers = statusResponse.powers.map(power => {
            const decodedPower = Buffer.from(power, 'base64').toString('hex');
            return new bignumber_js_1.default(decodedPower, 16).toFixed();
        });
        return injector_1.Injector.web3PrivateService
            .getWeb3Private(chain_type_1.CHAIN_TYPE.EVM)
            .tryExecuteContractMethod(cbridge_contract_address_1.cbridgeContractAddress[fromBlockchain].providerRouter, cbridge_contract_abi_1.cbridgeContractAbi, 'withdraw', [wdmsg, sigs, signers, powers], {
            onTransactionHash
        });
    }
}
exports.CrossChainCbridgeManager = CrossChainCbridgeManager;
//# sourceMappingURL=cross-chain-cbridge-manager.js.map