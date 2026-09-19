import React, { useState } from 'react';
import { View } from 'react-native';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import MenuScreen from '../screens/MenuScreen';
import CategoriaScreen from '../screens/CategoriaScreen';
import CocinaScreen from '../screens/CocinaScreen';
import CartIsland from '../CartIsland';

const Stack = createStackNavigator();

function AppNavigator() {
  const navigationRef = useNavigationContainerRef();
  const [currentRouteName, setCurrentRouteName] = useState('Login');

  const actualizarRuta = () => {
    const routeName = navigationRef.getCurrentRoute()?.name ?? 'Login';
    setCurrentRouteName(routeName);
  };

  const mostrarIsla =
    currentRouteName !== 'Login' && currentRouteName !== 'Cocina';

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer
        ref={navigationRef}
        onReady={actualizarRuta}
        onStateChange={actualizarRuta}
      >
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="Categoria" component={CategoriaScreen} />
          <Stack.Screen name="Cocina" component={CocinaScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      {mostrarIsla && <CartIsland />}
    </View>
  );
}

export default AppNavigator;
