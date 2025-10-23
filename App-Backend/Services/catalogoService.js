import Plato from '../Model/Plato.js';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

//Almacenamiento en memoria para los platos.

// Ruta al archivo JSON relativo a este archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '..', 'data', 'platos.json');

const platos = []; // persistencia en memoria
let nextPlatoId = 1; // contador secuencial para IDs de platos

// Cargar platos desde archivo JSON al arrancar
function cargarDesdeArchivo() {
  try {
    if (!existsSync(DATA_FILE)) return;
    const raw = readFileSync(DATA_FILE, 'utf8');
    const arr = JSON.parse(raw || '[]');
    arr.forEach(obj => {
      // crear instancia de Plato para validar
      const p = new Plato(obj);
      platos.push(p);
    });
    // calcular nextPlatoId como max(id)+1
    const maxId = platos.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0);
    nextPlatoId = maxId + 1;
  } catch (err) {
    console.error('Error al cargar platos desde archivo:', err.message);
  }
}

function guardarEnArchivo() {
  try {
    const data = JSON.stringify(platos, null, 2);
    writeFileSync(DATA_FILE, data, 'utf8');
  } catch (err) {
    console.error('Error al guardar platos en archivo:', err.message);
  }
}

// inicializar
cargarDesdeArchivo();

export const crearPlato = (data) => {
  const id = data.id ?? nextPlatoId++;
  const plato = new Plato({ ...data, id });
  platos.push(plato);
  guardarEnArchivo();
  return plato;
};

export const listarPlatos = () => [...platos];

export const buscarPlatoPorId = (id) => platos.find(p => String(p.id) === String(id));

// helper para tests: reiniciar el catálogo (no exportado por defecto)
export const _resetCatalogo = () => {
  platos.length = 0;
  nextPlatoId = 1;
  guardarEnArchivo();
};