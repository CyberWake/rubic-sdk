"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeBridge = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../common/errors");
const evm_web3_pure_1 = require("../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const erc_677_abi_1 = require("../constants/erc-677-abi");
const native_bridge_abi_1 = require("../constants/native-bridge-abi");
const pulse_chain_contract_address_1 = require("../constants/pulse-chain-contract-address");
const omni_bridge_1 = require("./omni-bridge");
class HomeBridge extends omni_bridge_1.OmniBridge {
    isTokenRegistered(address) {
        return this.sourceWeb3Public.callContractMethod(this.sourceBridgeAddress, this.sourceBridgeAbi, 'isTokenRegistered', [address]);
    }
    isRegisteredAsNative(address) {
        return this.sourceWeb3Public.callContractMethod(this.sourceBridgeAddress, this.sourceBridgeAbi, 'isRegisteredAsNativeToken', [address]);
    }
    getNonNativeToken(address) {
        return this.sourceWeb3Public.callContractMethod(this.sourceBridgeAddress, this.sourceBridgeAbi, 'nativeTokenAddress', [address]);
    }
    getNativeToken(address) {
        return this.targetWeb3Public.callContractMethod(this.targetBridgeAddress, this.targetBridgeAbi, 'bridgedTokenAddress', [address]);
    }
    async getMinAmountToken(address) {
        const amount = await this.sourceWeb3Public.callContractMethod(this.sourceBridgeAddress, this.sourceBridgeAbi, 'minPerTx', [address]);
        return new bignumber_js_1.default(amount);
    }
    async checkSourceLimits(address, amount) {
        const allowSend = await this.sourceWeb3Public.callContractMethod(this.sourceBridgeAddress, this.sourceBridgeAbi, 'withinLimit', [address, amount]);
        if (!allowSend) {
            throw new errors_1.RubicSdkError('Swap is not allowed due to contract limitations');
        }
    }
    async checkTargetLimits(address, amount) {
        const allowSend = await this.targetWeb3Public.callContractMethod(this.targetBridgeAddress, this.targetBridgeAbi, 'withinExecutionLimit', [address, amount]);
        if (!allowSend) {
            throw new errors_1.RubicSdkError('Swap is not allowed due to contract limitations');
        }
    }
    getDataForNativeSwap(receiverAddress, value) {
        return evm_web3_pure_1.EvmWeb3Pure.encodeMethodCall(pulse_chain_contract_address_1.omniBridgeNativeRouter, native_bridge_abi_1.nativeBridgeAbi, 'wrapAndRelayTokens', [receiverAddress], value);
    }
    getDataForTokenSwap(receiverAddress, amount, isERC677, tokenAddress) {
        if (isERC677) {
            return evm_web3_pure_1.EvmWeb3Pure.encodeMethodCall(tokenAddress, erc_677_abi_1.erc677Abi, 'transferAndCall', [this.sourceBridgeAddress, amount, receiverAddress], '0');
        }
        return evm_web3_pure_1.EvmWeb3Pure.encodeMethodCall(this.sourceBridgeAddress, this.sourceBridgeAbi, 'relayTokens', [tokenAddress, receiverAddress, amount], '0');
    }
}
exports.HomeBridge = HomeBridge;
//# sourceMappingURL=home-bridge.js.map