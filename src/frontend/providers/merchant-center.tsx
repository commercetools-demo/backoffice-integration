'use client';
import React, { Context, PropsWithChildren, createContext, useContext } from 'react';
import { UseMerchantCenterIntegrationReturn } from '../../types';
import { useMerchantCenterIntegrationHook } from '../hooks';

const initialState: UseMerchantCenterIntegrationReturn = {
    isMenuDisplayed: false,
    toggleMenu: () => {},
}

const MerchantCenterIntegration: Context<UseMerchantCenterIntegrationReturn> = createContext(initialState);

export const MerchantCenterIntegrationProvider: React.FC<PropsWithChildren<UseMerchantCenterIntegrationReturn>> = ({ children }) => {
  const { isMenuDisplayed, toggleMenu } = useMerchantCenterIntegrationHook();
  return (
    <MerchantCenterIntegration.Provider
      value={{
        isMenuDisplayed,
        toggleMenu,
      }}
    >
      {children}
    </MerchantCenterIntegration.Provider>
  );
};

export const useMerchantCenterIntegrationContext = () => useContext(MerchantCenterIntegration);
