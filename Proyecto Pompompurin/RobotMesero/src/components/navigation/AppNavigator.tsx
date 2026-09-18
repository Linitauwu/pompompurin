import React from 'react';
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

function AppNavigatorContent() {
  const currentRouteName = useNavigationState(state =>
    state.routes[state.index]?.name
  );

  const mostrarIsla =
    currentRouteName !== 'Login' && currentRouteName !== 'Cocina';

  return (
    <>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Categoria" component={CategoriaScreen} />
        <Stack.Screen name="Cocina" component={CocinaScreen} />
      </Stack.Navigator>

      {mostrarIsla && <CartIsland />}
    </>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <AppNavigatorContent />
    </NavigationContainer>
  );
}

export default AppNavigator;
