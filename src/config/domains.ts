// config/domains.ts
import CatchAllPage1 from "../pages/domain1/catch-all-page/CatchAllPage";
import CatchAllPage2 from "../pages/domain2/catch-all-page/CatchAllPage";
import CatchAllPage3 from "../pages/domain3/catch-all-page/CatchAllPage";

export const DOMAINS = {
  DOMAIN1: {
    hostname: 'domain1.com',
    catchAllPage: CatchAllPage1,
    apiBaseUrl: 'https://api.domain1.com',
    trackingId: 'UA-XXXXXX-1'
  },
  DOMAIN2: {
    hostname: 'domain2.com',
    catchAllPage: CatchAllPage2,
    apiBaseUrl: 'https://api.domain2.com',
    trackingId: 'UA-XXXXXX-2'
  },
  DOMAIN3: {
    hostname: 'domain3.com',
    catchAllPage: CatchAllPage3,
    apiBaseUrl: 'https://api.domain3.com',
    trackingId: 'UA-XXXXXX-3'
  }
};

export const getDomainConfig = (hostname:any) => {
  return Object.values(DOMAINS).find(
    domain => domain.hostname === hostname
  ) || DOMAINS.DOMAIN1; // default domain
};