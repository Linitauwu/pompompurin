import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

import { Producto } from '../data/productos';
import { Pedido } from '../types/pedido';


// ======================================================
// TIPO DEL PRODUCTO EN EL CARRITO
// ======================================================

export type ItemCarrito = {
  producto: Producto;
  cantidad: number;
};


// ======================================================
// TIPO DEL CONTEXTO
// ======================================================

type CartContextType = {
  carrito: ItemCarrito[];
  agregarAlCarrito: (producto: Producto) => void;
  aumentarCantidad: (productoId: number) => void;
  disminuirCantidad: (productoId: number) => void;
  eliminarDelCarrito: (productoId: number) => void;
  limpiarCarrito: () => void;

  cantidadProductos: number;
  subtotal: number;
  descuento: number;
  impuestos: number;
  total: number;

  crearPedido: () => Pedido;
};

// ======================================================
// CREAR CONTEXTO
// ======================================================

const CartContext =
  createContext<CartContextType | undefined>(
    undefined
  );


// ======================================================
// PROVIDER
// ======================================================

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [carrito, setCarrito] =
    useState<ItemCarrito[]>([]);


  // ====================================================
  // AGREGAR
  // ====================================================

  const agregarAlCarrito = (
    producto: Producto
  ) => {

    setCarrito(prev => {

      const existe = prev.find(
        item =>
          item.producto.id === producto.id
      );


      if (existe) {

        return prev.map(item =>
          item.producto.id === producto.id
            ? {
                ...item,
                cantidad:
                  item.cantidad + 1,
              }
            : item
        );
      }


      return [
        ...prev,
        {
          producto,
          cantidad: 1,
        },
      ];
    });
  };


  // ====================================================
  // AUMENTAR
  // ====================================================

  const aumentarCantidad = (
    productoId: number
  ) => {

    setCarrito(prev =>
      prev.map(item =>
        item.producto.id === productoId
          ? {
              ...item,
              cantidad:
                item.cantidad + 1,
            }
          : item
      )
    );
  };


  // ====================================================
  // DISMINUIR
  // ====================================================

  const disminuirCantidad = (
    productoId: number
  ) => {

    setCarrito(prev =>
      prev
        .map(item =>
          item.producto.id === productoId
            ? {
                ...item,
                cantidad:
                  item.cantidad - 1,
              }
            : item
        )
        .filter(
          item => item.cantidad > 0
        )
    );
  };


  // ====================================================
  // ELIMINAR
  // ====================================================

  const eliminarDelCarrito = (
    productoId: number
  ) => {

    setCarrito(prev =>
      prev.filter(
        item =>
          item.producto.id !== productoId
      )
    );
  };


  // ====================================================
  // LIMPIAR
  // ====================================================

  const limpiarCarrito = () => {

    setCarrito([]);
  };

  const crearPedido = (): Pedido => {
  return {
    id: Date.now().toString(),
    fecha: new Date().toISOString(),
    items: carrito,
    subtotal,
    impuestos,
    total,
    estado: 'pendiente',
  };
};

  // ====================================================
  // CANTIDAD TOTAL
  // ====================================================

  const cantidadProductos =
    carrito.reduce(
      (cantidad, item) =>
        cantidad + item.cantidad,
      0
    );


  // ====================================================
  // SUBTOTAL
  // ====================================================

  const subtotal =
    carrito.reduce(
      (total, item) =>
        total +
        item.producto.precio *
          item.cantidad,
      0
    );


  // ====================================================
  // DESCUENTO
  // ====================================================

  const descuento = 0;


  // ====================================================
  // IMPUESTOS
  // ====================================================

  const impuestos =
    subtotal * 0.16;


  // ====================================================
  // TOTAL
  // ====================================================

  const total =
    subtotal -
    descuento +
    impuestos;


  return (

    <CartContext.Provider
  value={{
    carrito,
    agregarAlCarrito,
    aumentarCantidad,
    disminuirCantidad,
    eliminarDelCarrito,
    limpiarCarrito,
    cantidadProductos,
    subtotal,
    descuento,
    impuestos,
    total,
    crearPedido,
  }}
>

      {children}

    </CartContext.Provider>
  );
}


// ======================================================
// HOOK
// ======================================================

export function useCart() {

  const context =
    useContext(CartContext);


  if (!context) {

    throw new Error(
      'useCart debe utilizarse dentro de CartProvider'
    );
  }


  return context;
}