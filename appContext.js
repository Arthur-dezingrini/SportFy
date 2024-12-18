import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as userService from "./services/userService";

const AppContext = createContext();


export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const userEmail = await AsyncStorage.getItem("userEmail");
        const userPassword = await AsyncStorage.getItem("userPassword");
        const savedUserType = await AsyncStorage.getItem("userType");
        if (userEmail && userPassword) {
          const response = await userService.Login({email: userEmail, password: userPassword})
          if (response.status === 200) {
            setIsAuthenticated(true);
            setUser({
              id: response.data.id,
              name: response.data.name,
              email: response.data.email
            });
            setToken(response.data.token);
          }
        }
        if (savedUserType) {
          setTheme(savedUserType)
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
    <AppContext.Provider value={{ theme, setTheme, user, setUser, token, setToken, isAuthenticated, isLoading }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAuth = () => useContext(AppContext);
