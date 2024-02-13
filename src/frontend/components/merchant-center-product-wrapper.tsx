import { CubeIcon } from '@heroicons/react/24/outline';
import React, { HTMLAttributes, PropsWithChildren } from 'react';
import { useMerchantCenterIntegrationContext } from '../providers/merchant-center';

type Props = {
  product?: {
    productId: string;
  };
  as?: 'div';
};

export const MerchantCenterProductWrapper: React.FC<PropsWithChildren<Props> & HTMLAttributes<HTMLDivElement>> = ({
  children,
  as,
  product,
  className,
  ...rest
}) => {
  const { isMenuDisplayed } = useMerchantCenterIntegrationContext();
  const region = process.env.NEXT_PUBLIC_INTEGRATION_MC_REGION;
  const project = process.env.NEXT_PUBLIC_INTEGRATION_MC_PROJECT;

  if (as === 'div') {
    return (
      <div className={`${className} relative`} {...rest}>
        {children}
        {isMenuDisplayed && (
          <div className="absolute left-15 top-10 z-40 p-2">
            <a
              href={`https://mc.${region}.commercetools.com/${project}/products/${product?.productId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CubeIcon className="h-15 w-15 bg-white" />
            </a>
          </div>
        )}
      </div>
    );
  }
  return (
    <>
      {children}
      {isMenuDisplayed && (
        <div className="absolute left-15 top-10 z-50 p-2">
          <a
            href={`https://mc.${region}.commercetools.com/${project}/products/${product?.productId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CubeIcon className="h-15 w-15 bg-white" />
          </a>
        </div>
      )}
    </>
  );
};
