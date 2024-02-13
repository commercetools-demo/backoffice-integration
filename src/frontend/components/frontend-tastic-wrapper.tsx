'use client';
import { Tastic } from '@frontastic/extension-types';
import { Popover } from '@headlessui/react';
import { BeakerIcon, BugAntIcon, Cog6ToothIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { useParams } from 'next/navigation';
import React, { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { useFrontendIntegrationContext } from '../providers/frontend';
import { useMerchantCenterIntegrationContext } from '../providers/merchant-center';

type Props = {
  data?: Tastic;
  className?: string;
};

export const FrontendTasticWrapper = ({ children, data: tastic, className }: PropsWithChildren<Props>) => {
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false);
  const { pageData } = useFrontendIntegrationContext();
  const { toggleMenu, isMenuDisplayed } = useMerchantCenterIntegrationContext();
  const { locale } = useParams();
  const customer = process.env.NEXT_PUBLIC_INTEGRATION_FRONTASTIC_CUSTOMER;
  const project = process.env.NEXT_PUBLIC_INTEGRATION_FRONTASTIC_PROJECT;

  const getUrl = useCallback(
    (env: string) => {
      return `https://${customer}.frontastic.io/dynamicPages/page?environment=${env}&project=${project}&locale=${locale}&page=${pageData?.page?.pageId}&tastic=${tastic?.tasticId}&node=${pageData?.pageFolder?.pageFolderId}&type=${pageData?.data?.dataSources['__master'].pageType}`;
    },
    [locale, pageData, tastic],
  );

  const isMerchantCenterAvailable = useMemo(() => {
    return [
      'commercetools/ui/products/product-list',
      'commercetools/ui/products/slider',
      'commercetools/ui/products/similar-products',
      'commercetools/ui/products/other-products',
      'commercetools/ui/products/details',
    ].includes(tastic?.tasticType || '');
  }, []);

  return (
    <div
      className={`${className} relative`}
      onMouseEnter={() => setIsTooltipDisplayed(true)}
      onMouseLeave={() => setIsTooltipDisplayed(false)}
    >
      {children}
      {isTooltipDisplayed && (
        <div className="absolute top-10 z-40 px-2 shadow-dark">
          <Popover className="relative p-2 leading-tight">
            <Popover.Button>
              <Cog6ToothIcon className="h-15 w-15 bg-white" />
            </Popover.Button>

            <Popover.Panel className="absolute z-10 h-auto w-fit bg-white">
              <div className="flex flex-row items-center text-sm">
                Studio
                <a
                  href={getUrl('development')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit bg-white p-2 text-sm"
                >
                  <BugAntIcon className="h-15 w-15 bg-white" />
                </a>
                <a
                  href={getUrl('staging')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit bg-white p-2 text-sm"
                >
                  <BeakerIcon className="h-15 w-15 bg-white" />
                </a>
                <a
                  href={getUrl('production')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit bg-white p-2 text-sm"
                >
                  <GlobeAltIcon className="h-15 w-15 bg-white" />
                </a>
              </div>
              {isMerchantCenterAvailable && (
                <div className="grid grid-cols-2 bg-white">
                  <button
                    type="button"
                    className="w-fit whitespace-nowrap bg-white py-2 text-sm"
                    onClick={() => toggleMenu(!isMenuDisplayed)}
                  >
                    Merchant center
                  </button>
                </div>
              )}
            </Popover.Panel>
          </Popover>
        </div>
      )}
    </div>
  );
};