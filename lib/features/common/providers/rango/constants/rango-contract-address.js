"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rangoContractAddresses = void 0;
const blockchain_name_1 = require("../../../../../core/blockchain/models/blockchain-name");
const rubic_proxy_contract_address_1 = require("../../../../cross-chain/calculation-manager/providers/common/constants/rubic-proxy-contract-address");
exports.rangoContractAddresses = {
    [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: {
        providerGateway: '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d',
        providerRouter: '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d',
        rubicRouter: rubic_proxy_contract_address_1.rubicProxyContractAddress[blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM].router
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.POLYGON]: {
        providerGateway: '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d',
        providerRouter: '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d',
        rubicRouter: rubic_proxy_contract_address_1.rubicProxyContractAddress[blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM].router
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM]: {
        providerGateway: '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d',
        providerRouter: '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d',
        rubicRouter: rubic_proxy_contract_address_1.rubicProxyContractAddress[blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM].router
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]: {
        providerGateway: '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d',
        providerRouter: '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d',
        rubicRouter: rubic_proxy_contract_address_1.rubicProxyContractAddress[blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM].router
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE]: {
        providerGateway: '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d',
        providerRouter: '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d',
        rubicRouter: rubic_proxy_contract_address_1.rubicProxyContractAddress[blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM].router
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: {
        providerGateway: '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d',
        providerRouter: '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d',
        rubicRouter: rubic_proxy_contract_address_1.rubicProxyContractAddress[blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM].router
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.CRONOS]: {
        providerGateway: '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d',
        providerRouter: '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d',
        rubicRouter: rubic_proxy_contract_address_1.rubicProxyContractAddress[blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM].router
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.POLYGON_ZKEVM]: {
        providerGateway: '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d',
        providerRouter: '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d',
        rubicRouter: rubic_proxy_contract_address_1.rubicProxyContractAddress[blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM].router
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.AURORA]: {
        providerGateway: '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d',
        providerRouter: '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d',
        rubicRouter: rubic_proxy_contract_address_1.rubicProxyContractAddress[blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM].router
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.LINEA]: {
        providerGateway: '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d',
        providerRouter: '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d',
        rubicRouter: rubic_proxy_contract_address_1.rubicProxyContractAddress[blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM].router
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.METIS]: {
        providerGateway: '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d',
        providerRouter: '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d',
        rubicRouter: rubic_proxy_contract_address_1.rubicProxyContractAddress[blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM].router
    },
    // [BLOCKCHAIN_NAME.ZK_SYNC]: {
    //     providerGateway: '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d',
    //     providerRouter: '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d',
    //     rubicRouter: rubicProxyContractAddress[BLOCKCHAIN_NAME.ETHEREUM].router
    // },
    [blockchain_name_1.BLOCKCHAIN_NAME.BASE]: {
        providerGateway: '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d',
        providerRouter: '0x69460570c93f9DE5E2edbC3052bf10125f0Ca22d',
        rubicRouter: rubic_proxy_contract_address_1.rubicProxyContractAddress[blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM].router
    }
};
//# sourceMappingURL=rango-contract-address.js.map