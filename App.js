import "react-native-gesture-handler";
import React from "react";
import { AppProvider, useAuth } from "./appContext";
import Routes from './Routes'

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const {setUser, setToken} = useAuth();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const user = await AsyncStorage.getItem("user");
        if (token && user) {
          console.log(token, user)
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

  if (isLoading) {
    return null;
  }

  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isAuthenticated ? "MainTabs" : "MainTabs"}
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
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
