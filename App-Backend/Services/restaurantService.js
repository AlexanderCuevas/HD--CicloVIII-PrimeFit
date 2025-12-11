import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Restaurante from '../Model/Restaurante.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RESTAURANTES_FILE = path.join(__dirname, '../data/restaurantes.json');

// Cargar restaurantes
function loadRestaurantes() {
  try {
    const data = fs.readFileSync(RESTAURANTES_FILE, 'utf8');
    const restaurantes = JSON.parse(data);
    return restaurantes.map(r => new Restaurante(r));
  } catch (error) {
    return [];
  }
}

// Guardar restaurantes
function saveRestaurantes(restaurantes) {
  fs.writeFileSync(RESTAURANTES_FILE, JSON.stringify(restaurantes.map(r => r.toJSON()), null, 2));
}

let restaurantes = loadRestaurantes();

// Obtener todos los restaurantes
export function obtenerRestaurantes(filtros = {}) {
  let resultado = [...restaurantes];

  // Filtrar solo activos por defecto
  if (filtros.activo !== false) {
    resultado = resultado.filter(r => r.activo);
  }

  // Filtrar por especialidad
  if (filtros.especialidad) {
    resultado = resultado.filter(r => 
      r.especialidad.toLowerCase().includes(filtros.especialidad.toLowerCase())
    );
  }

  return resultado.map(r => r.toJSON());
}

// Obtener restaurante por ID
export function obtenerRestaurantePorId(id) {
  const restaurante = restaurantes.find(r => r.id === id);
  return restaurante ? restaurante.toJSON() : null;
}

// Crear restaurante (admin)
export function crearRestaurante(data) {
  const nuevoRestaurante = new Restaurante({
    id: restaurantes.length > 0 ? Math.max(...restaurantes.map(r => r.id)) + 1 : 1,
    ...data
  });

  restaurantes.push(nuevoRestaurante);
  saveRestaurantes(restaurantes);

  return nuevoRestaurante.toJSON();
}

// Actualizar restaurante (admin)
export function actualizarRestaurante(id, data) {
  const index = restaurantes.findIndex(r => r.id === id);
  if (index === -1) {
    throw new Error('Restaurante no encontrado');
  }

  Object.assign(restaurantes[index], data);
  saveRestaurantes(restaurantes);

  return restaurantes[index].toJSON();
}

// Eliminar restaurante (admin)
export function eliminarRestaurante(id) {
  const index = restaurantes.findIndex(r => r.id === id);
  if (index === -1) {
    throw new Error('Restaurante no encontrado');
  }

  restaurantes.splice(index, 1);
  saveRestaurantes(restaurantes);

  return { message: 'Restaurante eliminado correctamente' };
}
