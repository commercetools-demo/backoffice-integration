import { DynamicPageRedirectResult, DynamicPageSuccessResult } from '@frontastic/extension-types';

type PossibleDynamicPageResults = DynamicPageSuccessResult | DynamicPageRedirectResult | null;

export type DynamicPageHandlerResponse = PossibleDynamicPageResults | Promise<PossibleDynamicPageResults>;
