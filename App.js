  import "react-native-gesture-handler";
  import { NavigationContainer } from "@react-navigation/native";
  import { createStackNavigator } from "@react-navigation/stack";
  import Login from "./pages/Login/Login";
  import Initial from "./pages/Initial/Initial"
  import Register from "./pages/Register/Register";
  import Home from "./pages/Home/Home";
  import RegisterMatch from "./pages/RegisterMatch/RegisterMatch";
  import Match from "./pages/Match/Match";
  import { AppProvider } from "./appContext";
  import React, { useState, useEffect } from "react";
  import { View, Text } from "react-native";
  import AsyncStorage from '@react-native-async-storage/async-storage';

  const Stack = createStackNavigator();

  export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const checkSession = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          const user = await AsyncStorage.getItem('user');
          if (token && user) {
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Erro ao verificar a sessão:', error);
        } finally {
          setIsLoading(false);
        }
      };
  
      checkSession();
    }, []);
  
    return (
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={isAuthenticated ? "Home" : "RegisterMatch"}>
          <Stack.Screen
              name="Initial"
              component={Initial}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RegisterMatch"
              component={RegisterMatch}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Match"
              component={Match}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    );
  }
