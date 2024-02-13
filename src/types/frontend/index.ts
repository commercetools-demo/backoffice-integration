import { PageResponse } from '@commercetools/frontend-sdk/lib/types/api/page';

export type DynamicPageHandlerResponse =
  | (PageResponse & {
      data: {
        dataSources: {
          [id: string]: {
            total: number;
            items: unknown[];
            count: number;
            facets: unknown[];
            query: unknown;
            pageType?: string;
          };
        };
      };
    })
  | null;
export interface UseFrontendIntegrationReturn {
  pageData: DynamicPageHandlerResponse;
}

export interface UseMerchantCenterIntegrationReturn {
  isMenuDisplayed: boolean;
  toggleMenu: (value: boolean) => void;
}
