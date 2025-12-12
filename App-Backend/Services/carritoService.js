import Carrito from '../Model/Carrito.js';
import ItemPedido from '../Model/ItemPedido.js';
import { obtenerPlatoPorId } from './platoService.js';

// Almacenar carritos en memoria (en producción usar base de datos)
const carritos = new Map();

// Obtener o crear carrito para un usuario
export function obtenerCarrito(usuarioId) {
  if (!carritos.has(usuarioId)) {
    carritos.set(usuarioId, new Carrito({ usuarioId }));
  }
  return carritos.get(usuarioId).toJSON();
}

// Agregar item al carrito
export function agregarItemCarrito(usuarioId, { platoId, cantidad }) {
  const plato = obtenerPlatoPorId(platoId);
  
  if (!plato) {
    throw new Error('Plato no encontrado');
  }

  if (!plato.disponible) {
    throw new Error('Plato no disponible');
  }

  let carrito = carritos.get(usuarioId);
  if (!carrito) {
    carrito = new Carrito({ usuarioId });
    carritos.set(usuarioId, carrito);
  }

  const item = new ItemPedido({
    platoId: plato.id,
    restauranteId: plato.restauranteId,
    nombre: plato.nombre,
    precio: plato.precio,
    cantidad: cantidad || 1,
    imagen: plato.imagen,
    macros: plato.macros
  });

  carrito.agregarItem(item);
  return carrito.toJSON();
}

// Actualizar cantidad de un item
export function actualizarCantidadItem(usuarioId, platoId, cantidad) {
  const carrito = carritos.get(usuarioId);
  
  if (!carrito) {
    throw new Error('Carrito no encontrado');
  }

  carrito.actualizarCantidad(platoId, cantidad);
  return carrito.toJSON();
}

// Eliminar item del carrito
export function eliminarItemCarrito(usuarioId, platoId) {
  const carrito = carritos.get(usuarioId);
  
  if (!carrito) {
    throw new Error('Carrito no encontrado');
  }

  carrito.eliminarItem(platoId);
  return carrito.toJSON();
}

// Vaciar carrito
export function vaciarCarrito(usuarioId) {
  const carrito = carritos.get(usuarioId);
  
  if (!carrito) {
    // Crear un carrito vacío si no existe
    carritos.set(usuarioId, new Carrito({ usuarioId }));
    return carritos.get(usuarioId).toJSON();
  }

  carrito.vaciar();
  return carrito.toJSON();
}
