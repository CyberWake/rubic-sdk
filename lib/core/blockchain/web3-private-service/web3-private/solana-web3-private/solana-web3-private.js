"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaWeb3Private = void 0;
const web3_js_1 = require("@solana/web3.js");
const blockchain_name_1 = require("../../../models/blockchain-name");
const evm_web3_private_1 = require("../evm-web3-private/evm-web3-private");
const web3_private_1 = require("../web3-private");
const solana_web3_pure_1 = require("../../../web3-pure/typed-web3-pure/non-evm-web3-pure/solana-web3-pure");
const injector_1 = require("../../../../injector/injector");
class SolanaWeb3Private extends web3_private_1.Web3Private {
    async getBlockchainName() {
        return blockchain_name_1.BLOCKCHAIN_NAME.SOLANA;
    }
    async sendTransaction(options = {}) {
        try {
            const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(blockchain_name_1.BLOCKCHAIN_NAME.SOLANA);
            const tx = web3_js_1.VersionedTransaction.deserialize(Buffer.from(options.data.slice(2), 'hex'));
            const { blockhash } = await web3Public.getRecentBlockhash();
            tx.message.recentBlockhash = blockhash;
            const { signature } = await this.solanaWeb3.signAndSendTransaction(tx);
            options.onTransactionHash?.(signature);
            return signature;
        }
        catch (err) {
            console.error(`Send transaction error. ${err}`);
            throw evm_web3_private_1.EvmWeb3Private.parseError(err);
        }
    }
    constructor(solanaWeb3) {
        super(solanaWeb3.publicKey?.toString() || '');
        this.solanaWeb3 = solanaWeb3;
        this.Web3Pure = solana_web3_pure_1.SolanaWeb3Pure;
    }
}
exports.SolanaWeb3Private = SolanaWeb3Private;
//# sourceMappingURL=solana-web3-private.js.map