import { injectPageTypeIntoDynamicPage } from './extensions';
import {
  FrontendIntegrationProvider,
  useFrontendIntegrationContext,
  useMerchantCenterIntegrationContext,
  FrontendTasticWrapper,
  MerchantCenterProductWrapper,
  MerchantCenterIntegrationProvider,
} from './frontend';

export const extensions = { injectPageTypeIntoDynamicPage };
export const frontend = {
  FrontendIntegrationProvider,
  MerchantCenterIntegrationProvider,
  useFrontendIntegrationContext,
  useMerchantCenterIntegrationContext,
  FrontendTasticWrapper,
  MerchantCenterProductWrapper,
};
