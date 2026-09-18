import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import MenuScreen from '../screens/MenuScreen';
import CategoriaScreen from '../screens/CategoriaScreen';
import CocinaScreen from '../screens/CocinaScreen';
import CartIsland from '../CartIsland';

const Stack = createStackNavigator();

function AppNavigator() {
  const [currentRouteName, setCurrentRouteName] = useState('Login');

  const mostrarIsla =
    currentRouteName !== 'Login' && currentRouteName !== 'Cocina';

  return (
    <NavigationContainer
      onStateChange={state => {
        const route = state?.routes[state.index];
        setCurrentRouteName(route?.name ?? 'Login');
      }}
    >
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
    </NavigationContainer>
  );
}

export default AppNavigator;
