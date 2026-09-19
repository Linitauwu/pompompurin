import React from 'react';
import { View, StyleSheet } from 'react-native';

import AppNavigator from './src/components/navigation/AppNavigator';
import { CartProvider } from './src/components/context/CartContext';
import { PedidoProvider } from './src/components/context/PedidoContext';

function App() {
  return (
    <PedidoProvider>
      <CartProvider>
        <View style={styles.container}>
          <AppNavigator />
        </View>
      </CartProvider>
    </PedidoProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
