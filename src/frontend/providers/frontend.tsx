'use client';
import React, { Context, PropsWithChildren, createContext, useContext } from 'react';
import { UseFrontendIntegrationReturn } from '../../types';

const initialState: UseFrontendIntegrationReturn = {
  pageData: null,
  isDisplayed: false,
};

const FrontendIntegration: Context<UseFrontendIntegrationReturn> = createContext(initialState);

export const FrontendIntegrationProvider: React.FC<PropsWithChildren<UseFrontendIntegrationReturn>> = ({
  children,
  pageData,
  isDisplayed,
}) => {
  return (
    <FrontendIntegration.Provider
      value={{
        pageData,
        isDisplayed,
      }}
    >
      {children}
    </FrontendIntegration.Provider>
  );
};

export const useFrontendIntegrationContext = () => useContext(FrontendIntegration);
