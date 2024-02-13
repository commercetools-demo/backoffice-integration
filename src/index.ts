import { injectPageTypeIntoDynamicPage } from './extensions';
import {
  FrontendIntegrationProvider,
  useFrontendIntegrationContext,
  useMerchantCenterIntegrationContext,
  FrontendTasticWrapper,
  MerchantCenterProductWrapper,
} from './frontend';

export default {
  extensions: { injectPageTypeIntoDynamicPage },
  frontend: {
    FrontendIntegrationProvider,
    useFrontendIntegrationContext,
    useMerchantCenterIntegrationContext,
    FrontendTasticWrapper,
    MerchantCenterProductWrapper,
  },
};
