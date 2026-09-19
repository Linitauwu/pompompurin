import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import { Pedido } from '../types/pedido';

type PedidoContextType = {
  pedidos: Pedido[];
  agregarPedido: (pedido: Pedido) => void;
  actualizarEstado: (
    pedidoId: string,
    nuevoEstado: Pedido['estado']
  ) => void;
};

const PedidoContext = createContext<PedidoContextType | undefined>(undefined);
const STORAGE_KEY = 'pompompurin_pedidos';

function cargarPedidos(): Pedido[] {
  if (typeof window === 'undefined') return [];

  try {
    const guardados = window.localStorage.getItem(STORAGE_KEY);
    return guardados ? (JSON.parse(guardados) as Pedido[]) : [];
  } catch (error) {
    console.error('No se pudieron cargar los pedidos:', error);
    return [];
  }
}

export function PedidoProvider({ children }: { children: ReactNode }) {
  const [pedidos, setPedidos] = useState<Pedido[]>(cargarPedidos);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(pedidos));
    } catch (error) {
      console.error('No se pudieron guardar los pedidos:', error);
    }
  }, [pedidos]);

  const agregarPedido = (pedido: Pedido) => {
    setPedidos(prev => [...prev, pedido]);
  };

  const actualizarEstado = (
    pedidoId: string,
    nuevoEstado: Pedido['estado']
  ) => {
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
