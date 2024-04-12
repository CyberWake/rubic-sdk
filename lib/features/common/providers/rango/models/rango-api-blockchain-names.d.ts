import { RangoSupportedBlockchain } from './rango-supported-blockchains';
export declare const rangoApiBlockchainNames: Record<RangoSupportedBlockchain, string>;
export type RangoBlockchainName = keyof typeof rangoApiBlockchainNames;
