export function routes 

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
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="RegisterMatch" component={RegisterMatch} />
          <Stack.Screen name="Match" component={Match} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>