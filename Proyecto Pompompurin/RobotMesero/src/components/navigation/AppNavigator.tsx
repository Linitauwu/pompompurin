import React from 'react';
import { View } from 'react-native';
import {
  NavigationContainer,
  useNavigationState,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import MenuScreen from '../screens/MenuScreen';
import CategoriaScreen from '../screens/CategoriaScreen';
import CocinaScreen from '../screens/CocinaScreen';
import CartIsland from '../CartIsland';

const Stack = createStackNavigator();

function NavigationContent() {
  const routeName = useNavigationState(state => {
    const route = state.routes[state.index];
    return route?.name ?? 'Login';
  });

  const mostrarIsla = routeName === 'Menu' || routeName === 'Categoria';

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Categoria" component={CategoriaScreen} />
        <Stack.Screen name="Cocina" component={CocinaScreen} />
      </Stack.Navigator>

      {mostrarIsla ? <CartIsland /> : null}
    </View>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <NavigationContent />
    </NavigationContainer>
  );
}

export default AppNavigator;
