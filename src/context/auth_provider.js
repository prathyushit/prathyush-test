import React, { createContext, useContext, useEffect, useState } from "react";

import { getItemFromLS } from "../config/storage";
import { performLogout } from "../config/authUtils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [initializing, setInitializing] = useState(true);

  const checkAuth = () => {
    const token = getItemFromLS("id_token");
    setIsAuthenticated(!!token);

    setInitializing(false);
  };

  useEffect(() => {
    checkAuth();

    const handleStorageChange = () => {
      checkAuth();
    };
    window.addEventListener("storageChange", handleStorageChange);
    return () => {
      window.removeEventListener("storageChange", handleStorageChange);
    };
  }, []);

  const logout = () => {
    setIsAuthenticated(false);
    performLogout();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, initializing, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
