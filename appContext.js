import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');

  return (
    <AppContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAuth = () => useContext(AppContext);