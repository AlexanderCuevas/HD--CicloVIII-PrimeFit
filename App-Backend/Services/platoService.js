import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Plato from '../Model/Plato.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PLATOS_FILE = path.join(__dirname, '../data/platos.json');

// Cargar platos
function loadPlatos() {
  try {
    const data = fs.readFileSync(PLATOS_FILE, 'utf8');
    const platos = JSON.parse(data);
    return platos.map(p => new Plato(p));
  } catch (error) {
    return [];
  }
}

// Guardar platos
function savePlatos(platos) {
  fs.writeFileSync(PLATOS_FILE, JSON.stringify(platos.map(p => p.toJSON()), null, 2));
}

let platos = loadPlatos();

// Obtener todos los platos
export function obtenerPlatos(filtros = {}) {
  let resultado = [...platos];

  // Filtrar por restaurante
  if (filtros.restauranteId) {
    resultado = resultado.filter(p => p.restauranteId === parseInt(filtros.restauranteId));
  }

  // Filtrar por categoría
  if (filtros.categoria) {
    resultado = resultado.filter(p => 
      p.categoria.toLowerCase() === filtros.categoria.toLowerCase()
    );
  }

  // Filtrar por tags
  if (filtros.tag) {
    resultado = resultado.filter(p => 
      p.tags.some(t => t.toLowerCase().includes(filtros.tag.toLowerCase()))
    );
  }

  // Filtrar solo disponibles
  if (filtros.disponible !== false) {
    resultado = resultado.filter(p => p.disponible);
  }

  return resultado.map(p => p.toJSON());
}

// Obtener plato por ID
export function obtenerPlatoPorId(id) {
  const plato = platos.find(p => p.id === id);
  return plato ? plato.toJSON() : null;
}

// Crear plato
export function crearPlato(data) {
  const nuevoPlato = new Plato({
    id: platos.length > 0 ? Math.max(...platos.map(p => p.id)) + 1 : 1,
    ...data
  });

  platos.push(nuevoPlato);
  savePlatos(platos);

  return nuevoPlato.toJSON();
}

// Actualizar plato
export function actualizarPlato(id, data) {
  const index = platos.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error('Plato no encontrado');
  }

  Object.assign(platos[index], data);
  savePlatos(platos);

  return platos[index].toJSON();
}

// Eliminar plato
export function eliminarPlato(id) {
  const index = platos.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error('Plato no encontrado');
  }

  platos.splice(index, 1);
  savePlatos(platos);

  return { message: 'Plato eliminado correctamente' };
}

// Buscar platos
export function buscarPlatos(query) {
  const queryLower = query.toLowerCase();
  const resultado = platos.filter(p => 
    p.nombre.toLowerCase().includes(queryLower) ||
    p.descripcion.toLowerCase().includes(queryLower) ||
    p.tags.some(t => t.toLowerCase().includes(queryLower))
  );

  return resultado.map(p => p.toJSON());
}
