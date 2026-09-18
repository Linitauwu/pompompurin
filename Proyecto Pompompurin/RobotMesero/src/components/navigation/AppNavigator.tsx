import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MenuScreen from '../screens/MenuScreen';
import CategoriaScreen from '../screens/CategoriaScreen';
import CocinaScreen from '../screens/CocinaScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Menu"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
  name="Menu"
  component={MenuScreen}
/>

<Stack.Screen
  name="Categoria"
  component={CategoriaScreen}
/>

<Stack.Screen
  name="Cocina"
  component={CocinaScreen}
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;