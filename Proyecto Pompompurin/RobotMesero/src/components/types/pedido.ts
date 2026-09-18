import { ItemCarrito } from '../context/CartContext';

export type EstadoPedido =
  | 'pendiente'
  | 'preparando'
  | 'listo'
  | 'entregado';

export type Pedido = {
  id: string;
  fecha: string;
  items: ItemCarrito[];
  subtotal: number;
  impuestos: number;
  total: number;
  estado: EstadoPedido;
};