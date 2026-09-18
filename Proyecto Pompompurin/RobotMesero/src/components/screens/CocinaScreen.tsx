import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { usePedidos } from '../context/PedidoContext';

import { Pedido } from '../types/pedido';

function CocinaScreen() {
  const {
    pedidos,
    actualizarEstado,
  } = usePedidos();

  // =========================
  // FILTRAR PEDIDOS POR ESTADO
  // =========================

  const pedidosPendientes = pedidos.filter(
    pedido => pedido.estado === 'pendiente'
  );

  const pedidosPreparando = pedidos.filter(
    pedido => pedido.estado === 'preparando'
  );

  const pedidosListos = pedidos.filter(
    pedido => pedido.estado === 'listo'
  );

  const pedidosEntregados = pedidos.filter(
    pedido => pedido.estado === 'entregado'
  );

  // =========================
  // TARJETA DE PEDIDO
  // =========================

  const renderPedido = (
    pedido: Pedido,
    index: number
  ) => {
    return (
      <View
        key={pedido.id}
        style={styles.orderCard}
      >

        {/* ENCABEZADO DEL PEDIDO */}

        <View style={styles.orderHeader}>

          <View>
            <Text style={styles.orderNumber}>
              Pedido #{index + 1}
            </Text>

            <Text style={styles.orderId}>
              ID: {pedido.id}
            </Text>
          </View>

          <View style={styles.status}>
            <Text style={styles.statusText}>
              {pedido.estado.toUpperCase()}
            </Text>
          </View>

        </View>

        {/* SEPARADOR */}

        <View style={styles.separator} />

        {/* PRODUCTOS */}

        {pedido.items.map((item, itemIndex) => (
          <View
            key={`${pedido.id}-${itemIndex}`}
            style={styles.item}
          >

            <View style={styles.itemInfo}>

              <Text style={styles.itemName}>
                {item.producto.nombre}
              </Text>

              <Text style={styles.itemQuantity}>
                Cantidad: {item.cantidad}
              </Text>

            </View>

            <Text style={styles.itemTotal}>
              $
              {(
                item.producto.precio *
                item.cantidad
              ).toFixed(2)}
            </Text>

          </View>
        ))}

        {/* TOTAL */}

        <View style={styles.totalContainer}>

          <Text style={styles.totalLabel}>
            Total
          </Text>

          <Text style={styles.total}>
            ${pedido.total.toFixed(2)}
          </Text>

        </View>

        {/* =========================
            BOTONES SEGÚN ESTADO
           ========================= */}

        {pedido.estado === 'pendiente' && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              actualizarEstado(
                pedido.id,
                'preparando'
              )
            }
          >
            <Text style={styles.actionButtonText}>
              COMENZAR A PREPARAR
            </Text>
          </TouchableOpacity>
        )}

        {pedido.estado === 'preparando' && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              actualizarEstado(
                pedido.id,
                'listo'
              )
            }
          >
            <Text style={styles.actionButtonText}>
              MARCAR COMO LISTO
            </Text>
          </TouchableOpacity>
        )}

        {pedido.estado === 'listo' && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              actualizarEstado(
                pedido.id,
                'entregado'
              )
            }
          >
            <Text style={styles.actionButtonText}>
              MARCAR COMO ENTREGADO
            </Text>
          </TouchableOpacity>
        )}

      </View>
    );
  };

  // =========================
  // PANTALLA
  // =========================

  return (
    <View style={styles.container}>

      {/* HEADER */}

      <View style={styles.header}>

        <Text style={styles.title}>
          Cocina
        </Text>

        <Text style={styles.subtitle}>
          Administración de pedidos
        </Text>

      </View>

      {/* PEDIDOS */}

      <ScrollView
        style={styles.ordersContainer}
        contentContainerStyle={styles.ordersContent}
      >

        {/* =========================
            SIN PEDIDOS
           ========================= */}

        {pedidos.length === 0 ? (

          <View style={styles.emptyContainer}>

            <Text style={styles.emptyTitle}>
              No hay pedidos
            </Text>

            <Text style={styles.emptyText}>
              Los pedidos enviados desde el menú aparecerán aquí.
            </Text>

          </View>

        ) : (

          <>

            {/* =========================
                PENDIENTES
               ========================= */}

            {pedidosPendientes.length > 0 && (
              <View>

                <Text style={styles.sectionTitle}>
                  PENDIENTES ({pedidosPendientes.length})
                </Text>

                {pedidosPendientes.map(
                  (pedido, index) =>
                    renderPedido(pedido, index)
                )}

              </View>
            )}

            {/* =========================
                PREPARANDO
               ========================= */}

            {pedidosPreparando.length > 0 && (
              <View>

                <Text style={styles.sectionTitle}>
                  PREPARANDO ({pedidosPreparando.length})
                </Text>

                {pedidosPreparando.map(
                  (pedido, index) =>
                    renderPedido(pedido, index)
                )}

              </View>
            )}

            {/* =========================
                LISTOS
               ========================= */}

            {pedidosListos.length > 0 && (
              <View>

                <Text style={styles.sectionTitle}>
                  LISTOS ({pedidosListos.length})
                </Text>

                {pedidosListos.map(
                  (pedido, index) =>
                    renderPedido(pedido, index)
                )}

              </View>
            )}

            {/* =========================
                ENTREGADOS
               ========================= */}

            {pedidosEntregados.length > 0 && (
              <View>

                <Text style={styles.sectionTitle}>
                  ENTREGADOS ({pedidosEntregados.length})
                </Text>

                {pedidosEntregados.map(
                  (pedido, index) =>
                    renderPedido(pedido, index)
                )}

              </View>
            )}

          </>

        )}

      </ScrollView>

    </View>
  );
}

// =========================
// ESTILOS
// =========================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFF7DF',
  },

  header: {
    backgroundColor: '#FFE58A',
    paddingVertical: 25,
    paddingHorizontal: 30,
    borderBottomWidth: 3,
    borderBottomColor: '#8A5A32',
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#603C19',
  },

  subtitle: {
    fontSize: 18,
    color: '#80552D',
    marginTop: 5,
  },

  ordersContainer: {
    flex: 1,
  },

  ordersContent: {
    padding: 25,
    paddingBottom: 40,
  },

  // =========================
  // SECCIONES
  // =========================

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#603C19',
    marginBottom: 15,
    marginTop: 10,
  },

  // =========================
  // SIN PEDIDOS
  // =========================

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },

  emptyTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#603C19',
  },

  emptyText: {
    fontSize: 16,
    color: '#80552D',
    textAlign: 'center',
    marginTop: 10,
    maxWidth: 400,
  },

  // =========================
  // TARJETA
  // =========================

  orderCard: {
    backgroundColor: '#FFF4D6',
    borderWidth: 3,
    borderColor: '#8A5A32',
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
  },

  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  orderNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#603C19',
  },

  orderId: {
    fontSize: 12,
    color: '#80552D',
    marginTop: 4,
  },

  status: {
    backgroundColor: '#FFE58A',
    borderWidth: 2,
    borderColor: '#8A5A32',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#603C19',
  },

  separator: {
    height: 2,
    backgroundColor: '#D6AD64',
    marginVertical: 15,
  },

  // =========================
  // PRODUCTOS
  // =========================

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },

  itemInfo: {
    flex: 1,
  },

  itemName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#603C19',
  },

  itemQuantity: {
    fontSize: 14,
    color: '#80552D',
    marginTop: 3,
  },

  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#603C19',
  },

  // =========================
  // TOTAL
  // =========================

  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 2,
    borderTopColor: '#D6AD64',
    marginTop: 10,
    paddingTop: 15,
  },

  totalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#603C19',
  },

  total: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#603C19',
  },

  // =========================
  // BOTÓN
  // =========================

  actionButton: {
    marginTop: 20,
    backgroundColor: '#FFE58A',
    borderWidth: 2,
    borderColor: '#8A5A32',
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: 'center',
  },

  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#603C19',
  },

});

export default CocinaScreen;