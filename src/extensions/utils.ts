import { DynamicPageHandlerResponse } from '../types';

export const injectPageTypeIntoDynamicPage = (dynamicPage: DynamicPageHandlerResponse) => {
  if (dynamicPage && 'dynamicPageType' in dynamicPage) {
    return {
      ...dynamicPage,
      dataSourcePayload: {
        pageType: dynamicPage.dynamicPageType,
      },
    };
  }
  return dynamicPage;
};
