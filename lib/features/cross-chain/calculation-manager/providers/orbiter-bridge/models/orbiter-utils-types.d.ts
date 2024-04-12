import { PriceToken } from "../../../../../../common/tokens";
import { OrbiterQuoteConfig } from './orbiter-api-quote-types';
export interface OrbiterGetQuoteConfigParams {
    from: PriceToken;
    to: PriceToken;
    configs: OrbiterQuoteConfig[];
}
