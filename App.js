import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // Certifique-se de importar o Tab Navigator
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/MaterialIcons";

// Suas páginas
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import RegisterMatch from "./pages/RegisterMatch/RegisterMatch";
import Profile from "./pages/Profile/Profile";
import Initial from "./pages/Initial/Initial";
import Register from "./pages/Register/Register";
import Match from "./pages/Match/Match";
import { AppProvider } from "./appContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'house';
          } else if (route.name === 'RegisterMatch') {
            iconName = 'sports-soccer';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#43F16A',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#333',
        },
        headerShown: false, 
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="RegisterMatch" component={RegisterMatch} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}


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
        <Stack.Navigator
          initialRouteName={isAuthenticated ? "MainTabs" : "Login"}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Initial" component={Initial} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={MainTabs} />
          <Stack.Screen name="RegisterMatch" component={RegisterMatch} />
          <Stack.Screen name="Match" component={Match} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
