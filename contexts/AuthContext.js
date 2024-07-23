'use client'

import React, { createContext, useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie'

export const AuthContext = createContext();

const COOKIE_NAME = 'logged'
export const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null);

  /* When the component loads, we store the cookie's content inside the token state variable */
  useEffect(() => {
    const storedToken = Cookies.get(COOKIE_NAME)
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const logIn = useCallback((accessToken) => {
    Cookies.set(COOKIE_NAME, accessToken, {expires: 7})
    setToken(accessToken);
  }, []);

  const isLogged = useCallback(() => {
    if (token) {
      return true;
    } else {
      return false;
    }
  }, [token]);

  const logOut = useCallback(() => {
    Cookies.remove(COOKIE_NAME)
    setToken(null);
  }, []);

  const value = {
    token,
    isLogged,
    logIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
