import Pedido from '../Model/Pedido.js';
import ItemPedido from '../Model/ItemPedido.js';

const pedidos = [];

export const crearPedido = ({ cliente }) => {
  const pedido = new Pedido({ cliente });
  pedidos.push(pedido);
  return pedido;
};

export const agregarItem = (pedidoId, plato, cantidad) => {
  const pedido = pedidos.find(p => p.id === pedidoId);
  if (!pedido) throw new Error('Pedido no encontrado');
  const item = new ItemPedido(plato, cantidad);
  pedido.items.push(item);
  return item;
};

export const listarPedidos = () => [...pedidos];

export const buscarPedido = (id) => pedidos.find(p => p.id === id);