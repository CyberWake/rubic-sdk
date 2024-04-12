"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OmniBridge = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const blockchain_1 = require("../../../../../../common/utils/blockchain");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const injector_1 = require("../../../../../../core/injector/injector");
const fee_manager_abi_1 = require("../constants/fee-manager-abi");
const foreign_bridge_abi_1 = require("../constants/foreign-bridge-abi");
const home_bridge_abi_1 = require("../constants/home-bridge-abi");
const pulse_chain_contract_address_1 = require("../constants/pulse-chain-contract-address");
class OmniBridge {
    get web3Private() {
        return injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(this.sourceBlockchain);
    }
    get sourceWeb3Public() {
        return injector_1.Injector.web3PublicService.getWeb3Public(this.sourceBlockchain);
    }
    get targetWeb3Public() {
        return injector_1.Injector.web3PublicService.getWeb3Public(this.targetBlockchain);
    }
    constructor(fromToken, toToken) {
        this.fromToken = fromToken;
        this.toToken = toToken;
        this.sourceBlockchain = fromToken.blockchain;
        this.targetBlockchain = toToken.blockchain;
        this.sourceBridgeAddress = OmniBridge.isCustomWrap(fromToken)
            ? pulse_chain_contract_address_1.pulseChainContractAddress[this.sourceBlockchain].omniBridgeWrapped
            : pulse_chain_contract_address_1.pulseChainContractAddress[this.sourceBlockchain].omniBridge;
        this.targetBridgeAddress = OmniBridge.isCustomWrap(toToken)
            ? pulse_chain_contract_address_1.pulseChainContractAddress[this.targetBlockchain].omniBridgeWrapped
            : pulse_chain_contract_address_1.pulseChainContractAddress[this.targetBlockchain].omniBridge;
        if (this.sourceBlockchain === blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM) {
            this.sourceBridgeAbi = foreign_bridge_abi_1.foreignBridgeAbi;
            this.targetBridgeAbi = home_bridge_abi_1.homeBridgeAbi;
        }
        else {
            this.sourceBridgeAbi = foreign_bridge_abi_1.foreignBridgeAbi;
            this.targetBridgeAbi = home_bridge_abi_1.homeBridgeAbi;
        }
    }
    /**
     * Get bridge token address in target network.
     * @param fromAddress Token address in source network.
     */
    async getBridgeToken(fromAddress) {
        const isRegisteredAsNative = await this.isRegisteredAsNative(fromAddress);
        return isRegisteredAsNative
            ? this.getNativeToken(fromAddress)
            : this.getNonNativeToken(fromAddress);
    }
    /**
     * Check if allowed to swap.
     * @param fromAddress Token address in source network.
     * @param toAddress Token address in target network.
     * @param amount Swap amount.
     */
    async checkLimits(fromAddress, toAddress, amount) {
        await this.checkSourceLimits(fromAddress, amount);
        await this.checkTargetLimits(toAddress, amount);
    }
    /**
     * Get fee manager address.
     */
    getFeeManager() {
        const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(blockchain_name_1.BLOCKCHAIN_NAME.PULSECHAIN);
        return web3Public.callContractMethod(this.sourceBlockchain === blockchain_name_1.BLOCKCHAIN_NAME.PULSECHAIN
            ? this.sourceBridgeAddress
            : this.targetBridgeAddress, home_bridge_abi_1.homeBridgeAbi, 'feeManager', []);
    }
    /**
     *
     * Get fee type for trade.
     */
    getFeeType(feeManagerAddress) {
        const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(blockchain_name_1.BLOCKCHAIN_NAME.PULSECHAIN);
        return web3Public.callContractMethod(feeManagerAddress, fee_manager_abi_1.feeManagerAbi, this.sourceBlockchain === blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM
            ? 'FOREIGN_TO_HOME_FEE'
            : 'HOME_TO_FOREIGN_FEE', []);
    }
    /**
     * Calculate output amount for trade.
     * @param toAddress Token address in target network.
     * @param feeManagerAddress Fee manager contract address.
     * @param feeType Type of fee.
     * @param fromAmount Amount of tokens to send.
     */
    async getOutputAmount(toAddress, feeManagerAddress, feeType, fromAmount) {
        const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(blockchain_name_1.BLOCKCHAIN_NAME.PULSECHAIN);
        const feeAmount = await web3Public.callContractMethod(feeManagerAddress, fee_manager_abi_1.feeManagerAbi, 'calculateFee', [feeType, toAddress, fromAmount]);
        return new bignumber_js_1.default(fromAmount).minus(feeAmount);
    }
    /**
     * Calculate output amount for trade.
     * @param toAddress Token address in target network.
     * @param fromAmount Amount of tokens to send.
     */
    async calculateAmount(toAddress, fromAmount) {
        const feeManagerAddress = await this.getFeeManager();
        const feeType = await this.getFeeType(feeManagerAddress);
        return this.getOutputAmount(toAddress, feeManagerAddress, feeType, fromAmount);
    }
    static isCustomWrap(token) {
        return (token.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM &&
            (0, blockchain_1.compareAddresses)(token.address, '0xA882606494D86804B5514E07e6Bd2D6a6eE6d68A'));
    }
}
exports.OmniBridge = OmniBridge;
//# sourceMappingURL=omni-bridge.js.map