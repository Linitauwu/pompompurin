import React, {
  createContext,
  useContext,
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

const PedidoContext =
  createContext<PedidoContextType | undefined>(undefined);

export function PedidoProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const agregarPedido = (pedido: Pedido) => {
    setPedidos(prev => [
      ...prev,
      pedido,
    ]);
  };

  const actualizarEstado = (
  pedidoId: string,
  nuevoEstado: Pedido['estado']
) => {
  setPedidos(prev =>
    prev.map(pedido =>
      pedido.id === pedidoId
        ? {
            ...pedido,
            estado: nuevoEstado,
          }
        : pedido
    )
  );
};

  return (
    <PedidoContext.Provider
  value={{
    pedidos,
    agregarPedido,
    actualizarEstado,
  }}
>
      {children}
    </PedidoContext.Provider>
  );
}

export function usePedidos() {
  const context = useContext(PedidoContext);

  if (!context) {
    throw new Error(
      'usePedidos debe utilizarse dentro de PedidoProvider'
    );
  }

  return context;
}