'use client';
import React, { Context, PropsWithChildren, createContext, useContext } from 'react';
import { UseFrontendIntegrationReturn } from '../../types';

const initialState: UseFrontendIntegrationReturn = {
  pageData: null,
};

const FrontendIntegration: Context<UseFrontendIntegrationReturn> = createContext(initialState);

export const FrontendIntegrationProvider: React.FC<PropsWithChildren<UseFrontendIntegrationReturn>> = ({ children, pageData }) => {
  return (
    <FrontendIntegration.Provider
      value={{
        pageData,
      }}
    >
      {children}
    </FrontendIntegration.Provider>
  );
};

export const useFrontendIntegrationContext = () => useContext(FrontendIntegration);
