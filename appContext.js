import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext();


export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const user = await AsyncStorage.getItem("user");
        if (token && user) {
          setUser(JSON.parse(user));
          setToken(token);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Erro ao verificar a sessão:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, token, setToken, isAuthenticated, isLoading }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAuth = () => useContext(AppContext);
