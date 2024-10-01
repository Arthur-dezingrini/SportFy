import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useAuth } from './appContext';

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import RegisterMatch from "./pages/RegisterMatch/RegisterMatch";
import Profile from "./pages/Profile/Profile";
import Initial from "./pages/Initial/Initial";
import Register from "./pages/Register/Register";
import Match from "./pages/Match/Match";
import FriendList from './pages/FriendList/FriendList'
import ProfileCourtOwner from './pages/ProfileCourtOwner/ProfileCourtOwner'
import Notifications from "./pages/Notifications/Notifications";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "house";
          } else if (route.name === "RegisterMatch") {
            iconName = "sports-soccer";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#43F16A",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#333",
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="RegisterMatch" options={{title: 'Criar Partida'}} component={RegisterMatch} />
      <Tab.Screen name="Profile" options={{title: 'Perfil'}} component={Profile} />
    </Tab.Navigator>
  );
}

export default function Routes() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? "MainTabs" : "Initial"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Initial" component={Initial} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="RegisterMatch" component={RegisterMatch} />
        <Stack.Screen name="Match" component={Match} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="FriendList" component={FriendList} />
        <Stack.Screen name="ProfileCourtOwner" component={ProfileCourtOwner} />
        <Stack.Screen name="Notifications" component={Notifications} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
