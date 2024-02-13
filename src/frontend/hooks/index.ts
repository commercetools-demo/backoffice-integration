import { useState } from 'react';

export const useMerchantCenterIntegrationHook = () => {
  const [isMenuDisplayed, toggleMenu] = useState<boolean>(false);

  return {
    isMenuDisplayed,
    toggleMenu,
  };
};
