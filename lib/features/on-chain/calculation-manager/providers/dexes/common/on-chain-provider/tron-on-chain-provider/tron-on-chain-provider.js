"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TronOnChainProvider = void 0;
const blockchain_name_1 = require("../../../../../../../../core/blockchain/models/blockchain-name");
const chain_type_1 = require("../../../../../../../../core/blockchain/models/chain-type");
const injector_1 = require("../../../../../../../../core/injector/injector");
const on_chain_provider_1 = require("../on-chain-provider");
class TronOnChainProvider extends on_chain_provider_1.OnChainProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.TRON;
    }
    get walletAddress() {
        return injector_1.Injector.web3PrivateService.getWeb3Private(chain_type_1.CHAIN_TYPE.TRON).address;
    }
    get web3Public() {
        return injector_1.Injector.web3PublicService.getWeb3Public(this.blockchain);
    }
}
exports.TronOnChainProvider = TronOnChainProvider;
//# sourceMappingURL=tron-on-chain-provider.js.map