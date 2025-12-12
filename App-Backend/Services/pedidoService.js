import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Pedido from '../Model/Pedido.js';
import { obtenerCarrito, vaciarCarrito } from './carritoService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PEDIDOS_FILE = path.join(__dirname, '../data/pedidos.json');

// Cargar pedidos
function loadPedidos() {
  try {
    const data = fs.readFileSync(PEDIDOS_FILE, 'utf8');
    const pedidos = JSON.parse(data);
    return pedidos.map(p => new Pedido(p));
  } catch (error) {
    return [];
  }
}

// Guardar pedidos
function savePedidos(pedidos) {
  fs.writeFileSync(PEDIDOS_FILE, JSON.stringify(pedidos.map(p => p.toJSON()), null, 2));
}

let pedidos = loadPedidos();

// Crear pedido desde carrito o items directos
export function crearPedido(usuarioId, items, direccionEntrega, costoEnvio = 0, subtotal = 0, total = 0, datosAdicionales = {}) {
  let desdeCarrito = false;
  
  // Si no se pasan items, intentar obtenerlos del carrito
  if (!items || items.length === 0) {
    const carrito = obtenerCarrito(usuarioId);
    if (!carrito.items || carrito.items.length === 0) {
      throw new Error('El carrito está vacío');
    }
    items = carrito.items;
    subtotal = carrito.total;
    total = carrito.total + costoEnvio;
    desdeCarrito = true;
  }

  const nuevoPedido = new Pedido({
    id: pedidos.length > 0 ? Math.max(...pedidos.map(p => p.id)) + 1 : 1,
    usuarioId,
    items,
    subtotal,
    costoEnvio,
    total,
    direccionEntrega,
    estado: 'pendiente',
    ...datosAdicionales // Incluir teléfono, referencia, metodoPago, notas, etc.
  });

  pedidos.push(nuevoPedido);
  savePedidos(pedidos);

  // Vaciar carrito solo si se usó el carrito para crear el pedido
  if (desdeCarrito) {
    try {
      vaciarCarrito(usuarioId);
    } catch (error) {
      // Ignorar error si el carrito no existe
      console.log('No se pudo vaciar el carrito:', error.message);
    }
  }

  return nuevoPedido.toJSON();
}

// Obtener pedidos de un usuario
export function obtenerPedidosUsuario(usuarioId) {
  return pedidos
    .filter(p => p.usuarioId === usuarioId)
    .map(p => p.toJSON())
    .sort((a, b) => new Date(b.fechaPedido) - new Date(a.fechaPedido));
}

// Obtener todos los pedidos (admin)
export function obtenerTodosPedidos(filtros = {}) {
  let resultado = [...pedidos];

  if (filtros.estado) {
    resultado = resultado.filter(p => p.estado === filtros.estado);
  }

  if (filtros.usuarioId) {
    resultado = resultado.filter(p => p.usuarioId === parseInt(filtros.usuarioId));
  }

  // Filtrar por restaurante si se proporciona
  if (filtros.restauranteId) {
    resultado = resultado.filter(p => {
      // Filtrar pedidos que contengan items del restaurante especificado
      return p.items.some(item => item.restauranteId === parseInt(filtros.restauranteId));
    });
  }

  return resultado
    .map(p => p.toJSON())
    .sort((a, b) => new Date(b.fechaPedido) - new Date(a.fechaPedido));
}

// Obtener pedido por ID
export function obtenerPedidoPorId(id, usuarioId = null) {
  const pedido = pedidos.find(p => p.id === id);
  
  if (!pedido) {
    return null;
  }

  // Si se proporciona usuarioId, verificar que el pedido pertenezca al usuario
  if (usuarioId !== null && pedido.usuarioId !== usuarioId) {
    throw new Error('No autorizado para ver este pedido');
  }

  return pedido.toJSON();
}

// Actualizar estado del pedido
export function actualizarEstadoPedido(id, nuevoEstado) {
  const pedido = pedidos.find(p => p.id === id);
  
  if (!pedido) {
    throw new Error('Pedido no encontrado');
  }

  const estadosValidos = ['pendiente', 'confirmado', 'preparando', 'en_camino', 'entregado', 'cancelado'];
  
  if (!estadosValidos.includes(nuevoEstado)) {
    throw new Error('Estado inválido');
  }

  pedido.actualizarEstado(nuevoEstado);
  savePedidos(pedidos);

  return pedido.toJSON();
}

// Cancelar pedido
export function cancelarPedido(id, usuarioId) {
  const pedido = pedidos.find(p => p.id === id);
  
  if (!pedido) {
    throw new Error('Pedido no encontrado');
  }

  if (pedido.usuarioId !== usuarioId) {
    throw new Error('No autorizado para cancelar este pedido');
  }

  if (['entregado', 'cancelado'].includes(pedido.estado)) {
    throw new Error('No se puede cancelar este pedido');
  }

  pedido.actualizarEstado('cancelado');
  savePedidos(pedidos);

  return pedido.toJSON();
}
