import React from "react";
import styles from "./FotterMainStyle";
import Icon from "react-native-vector-icons/MaterialIcons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './../../pages/Home/Home'
import RegisterMatch from './../../pages/RegisterMatch/RegisterMatch'
import Profile from './../../pages/Profile/Profile'
import Match from './../../pages/Match/Match'

const Tab = createBottomTabNavigator();

export default function FotterMain() {
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
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="RegisterMatch" 
        component={RegisterMatch} 
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
