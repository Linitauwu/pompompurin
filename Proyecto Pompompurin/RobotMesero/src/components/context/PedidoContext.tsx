import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import { supabase } from '../../lib/supabase';
import { Pedido } from '../types/pedido';

type PedidoContextType = {
  pedidos: Pedido[];
  agregarPedido: (pedido: Pedido) => Promise<void>;
  actualizarEstado: (
    pedidoId: string,
    nuevoEstado: Pedido['estado']
  ) => Promise<void>;
};

const PedidoContext = createContext<PedidoContextType | undefined>(undefined);

export function PedidoProvider({ children }: { children: ReactNode }) {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    let activo = true;

    const cargarPedidos = async () => {
      const { data, error } = await supabase
        .from('pedidos')
        .select('id, fecha, items, subtotal, impuestos, total, estado')
        .order('fecha', { ascending: false });

      if (error) {
        console.error('No se pudieron cargar los pedidos desde Supabase:', error);
        return;
      }

      if (activo) setPedidos((data ?? []) as Pedido[]);
    };

    cargarPedidos();

    return () => {
      activo = false;
    };
  }, []);

  const agregarPedido = async (pedido: Pedido) => {
    const { error } = await supabase.from('pedidos').insert({
      id: pedido.id,
      fecha: pedido.fecha,
      items: pedido.items,
      subtotal: pedido.subtotal,
      impuestos: pedido.impuestos,
      total: pedido.total,
      estado: pedido.estado,
    });

    if (error) {
      console.error('No se pudo guardar el pedido en Supabase:', error);
      throw error;
    }

    setPedidos(prev => [pedido, ...prev]);
  };

  const actualizarEstado = async (
    pedidoId: string,
    nuevoEstado: Pedido['estado']
  ) => {
    const { error } = await supabase
      .from('pedidos')
      .update({ estado: nuevoEstado })
      .eq('id', pedidoId);

    if (error) {
      console.error('No se pudo actualizar el pedido en Supabase:', error);
      throw error;
    }

    setPedidos(prev =>
      prev.map(pedido =>
        pedido.id === pedidoId
          ? { ...pedido, estado: nuevoEstado }
          : pedido
      )
    );
  };

  return (
    <PedidoContext.Provider value={{ pedidos, agregarPedido, actualizarEstado }}>
      {children}
    </PedidoContext.Provider>
  );
}

export function usePedidos() {
  const context = useContext(PedidoContext);

  if (!context) {
    throw new Error('usePedidos debe utilizarse dentro de PedidoProvider');
  }

  return context;
}
