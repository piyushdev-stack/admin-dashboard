'use client';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './index';
import { checkIfLoggedIn } from './slices/authSlice';

interface ReduxProviderProps {
  children: React.ReactNode;
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  useEffect(() => {
    // Check if user is already logged in when app starts
    store.dispatch(checkIfLoggedIn());
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
