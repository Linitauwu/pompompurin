import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';

import { useCart } from './context/CartContext';
import { usePedidos } from './context/PedidoContext';

function CartIsland() {
  const [abierto, setAbierto] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const {
    carrito,
    aumentarCantidad,
    disminuirCantidad,
    eliminarDelCarrito,
    cantidadProductos,
    subtotal,
    impuestos,
    total,
    crearPedido,
    limpiarCarrito,
  } = useCart();
  const { agregarPedido } = usePedidos();

  const enviarPedido = async () => {
    if (carrito.length === 0 || enviando) return;
    setEnviando(true);

    try {
      const pedido = crearPedido();
      await agregarPedido(pedido);
      limpiarCarrito();
      Alert.alert('Pedido enviado', 'La cocina ya recibió tu pedido.');
    } catch (error) {
      console.error('Error al enviar pedido:', error);
      Alert.alert(
        'No se pudo guardar',
        'Revisa la conexión con Supabase y las políticas de la tabla pedidos.'
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <View style={[styles.island, abierto && styles.islandAbierta]}>
      <TouchableOpacity style={styles.header} activeOpacity={0.85} onPress={() => setAbierto(value => !value)}>
        <Image source={require('./assets/gifs/pompompurin.webp')} style={styles.pompompurin} resizeMode="contain" />
        <View style={styles.headerText}>
          <Text style={styles.title}>Tu pedido</Text>
          <Text style={styles.products}>{cantidadProductos} {cantidadProductos === 1 ? 'producto' : 'productos'}</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.total}>${total.toFixed(2)}</Text>
        </View>
        <Text style={styles.arrow}>{abierto ? '▼' : '▲'}</Text>
      </TouchableOpacity>
      {abierto && (
        <View style={styles.content}>
          <View style={styles.separator} />
          <Text style={styles.orderTitle}>🍮 Tu pedido</Text>
          {carrito.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Image source={require('./assets/gifs/pom-pom-purin-sleeping.gif')} style={styles.sleepingPurin} resizeMode="contain" />
              <Text style={styles.emptyText}>Tu pedido está vacío</Text>
              <Text style={styles.emptySubtext}>¡Agrega algo rico! ♡</Text>
            </View>
          ) : (
            <ScrollView style={styles.itemsContainer} showsVerticalScrollIndicator={false}>
              {carrito.map(item => (
                <View key={item.producto.id} style={styles.item}>
                  <View style={styles.itemInfo}><Text style={styles.itemName}>{item.producto.nombre}</Text><Text style={styles.itemPrice}>${item.producto.precio.toFixed(2)}</Text></View>
                  <View style={styles.quantityContainer}><TouchableOpacity style={styles.quantityButton} onPress={() => disminuirCantidad(item.producto.id)}><Text style={styles.quantityButtonText}>−</Text></TouchableOpacity><Text style={styles.quantity}>{item.cantidad}</Text><TouchableOpacity style={styles.quantityButton} onPress={() => aumentarCantidad(item.producto.id)}><Text style={styles.quantityButtonText}>+</Text></TouchableOpacity></View>
                  <Text style={styles.itemTotal}>${(item.producto.precio * item.cantidad).toFixed(2)}</Text>
                  <TouchableOpacity onPress={() => eliminarDelCarrito(item.producto.id)}><Text style={styles.delete}>🗑</Text></TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
          {carrito.length > 0 && (
            <View style={styles.summary}>
              <View style={styles.summaryRow}><Text style={styles.summaryText}>Subtotal</Text><Text style={styles.summaryText}>${subtotal.toFixed(2)}</Text></View>
              <View style={styles.summaryRow}><Text style={styles.summaryText}>IVA</Text><Text style={styles.summaryText}>${impuestos.toFixed(2)}</Text></View>
              <View style={styles.totalRow}><Text style={styles.finalTotalText}>TOTAL</Text><Text style={styles.finalTotal}>${total.toFixed(2)}</Text></View>
              <TouchableOpacity style={styles.orderButton} activeOpacity={0.85} disabled={enviando} onPress={enviarPedido}><Text style={styles.orderButtonText}>{enviando ? 'GUARDANDO...' : '🍮 ENVIAR PEDIDO'}</Text></TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  island: { position: 'absolute', bottom: 0, left: 20, right: 20, backgroundColor: '#F2CE72', borderTopLeftRadius: 32, borderTopRightRadius: 32, borderWidth: 3, borderBottomWidth: 0, borderColor: '#8A5A32', zIndex: 999999, elevation: 20, overflow: 'hidden' },
  islandAbierta: { maxHeight: '75%' }, header: { height: 82, paddingHorizontal: 25, flexDirection: 'row', alignItems: 'center' }, pompompurin: { width: 58, height: 58, marginRight: 15 }, headerText: { flex: 1 }, title: { fontSize: 22, fontWeight: 'bold', color: '#603C19' }, products: { fontSize: 14, color: '#80552D', marginTop: 2 }, totalContainer: { alignItems: 'flex-end', marginRight: 15 }, totalLabel: { fontSize: 12, color: '#80552D' }, total: { fontSize: 20, fontWeight: 'bold', color: '#603C19' }, arrow: { fontSize: 18, color: '#603C19', width: 25, textAlign: 'center' }, content: { paddingHorizontal: 25, paddingBottom: 25 }, separator: { height: 2, backgroundColor: '#C39A55', marginBottom: 15 }, orderTitle: { fontSize: 22, fontWeight: 'bold', color: '#603C19', marginBottom: 12 }, emptyContainer: { alignItems: 'center', paddingVertical: 15 }, sleepingPurin: { width: 90, height: 65 }, emptyText: { fontSize: 18, fontWeight: 'bold', color: '#603C19', marginTop: 5 }, emptySubtext: { fontSize: 14, color: '#80552D', marginTop: 3 }, itemsContainer: { maxHeight: 230 }, item: { minHeight: 65, backgroundColor: '#FFF4D6', borderRadius: 18, borderWidth: 2, borderColor: '#D6AD64', marginBottom: 8, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center' }, itemInfo: { flex: 1 }, itemName: { fontSize: 15, fontWeight: 'bold', color: '#603C19' }, itemPrice: { fontSize: 12, color: '#80552D', marginTop: 2 }, quantityContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }, quantityButton: { width: 27, height: 27, borderRadius: 14, backgroundColor: '#FFE58A', borderWidth: 1, borderColor: '#8A5A32', alignItems: 'center', justifyContent: 'center' }, quantityButtonText: { fontSize: 18, fontWeight: 'bold', color: '#603C19' }, quantity: { fontSize: 15, fontWeight: 'bold', color: '#603C19', marginHorizontal: 8 }, itemTotal: { width: 65, fontSize: 14, fontWeight: 'bold', color: '#603C19', textAlign: 'right' }, delete: { fontSize: 17, marginLeft: 10 }, summary: { marginTop: 12 }, summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }, summaryText: { fontSize: 14, color: '#80552D' }, totalRow: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 2, borderTopColor: '#C39A55', paddingTop: 10, marginTop: 5 }, finalTotalText: { fontSize: 20, fontWeight: 'bold', color: '#603C19' }, finalTotal: { fontSize: 21, fontWeight: 'bold', color: '#603C19' }, orderButton: { height: 48, backgroundColor: '#FFF0A8', borderRadius: 24, borderWidth: 2, borderColor: '#8A5A32', alignItems: 'center', justifyContent: 'center', marginTop: 12 }, orderButtonText: { fontSize: 16, fontWeight: 'bold', color: '#603C19' },
});

export default CartIsland;
