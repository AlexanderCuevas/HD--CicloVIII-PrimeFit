import User from '../Model/User.js';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
// Try to load bcryptjs; if not installed, fallback to a light-weight implementation using crypto
let bcrypt = null;
try {
  // top-level await is supported in Node ESM
  bcrypt = (await import('bcryptjs')).default;
} catch (err) {
  const crypto = await import('crypto');
  // fallback: use pbkdf2 with a random salt, store as salt$hash
  bcrypt = {
    genSaltSync: () => Math.random().toString(36).slice(2, 10),
    hashSync: (pwd, salt) => {
      const h = crypto.pbkdf2Sync(pwd, salt, 100000, 64, 'sha512');
      return `${salt}$${h.toString('hex')}`;
    },
    compareSync: (pwd, full) => {
      if (!full || typeof full !== 'string') return false;
      const parts = full.split('$');
      if (parts.length !== 2) return false;
      const [salt, hash] = parts;
      const h = crypto.pbkdf2Sync(pwd, salt, 100000, 64, 'sha512').toString('hex');
      return h === hash;
    }
  };
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '..', 'data', 'users.json');

const users = [];

function guardarEnArchivo() {
  try {
    writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), 'utf8');
  } catch (err) {
    console.error('Error al guardar users.json:', err.message);
  }
}

function cargarDesdeArchivo() {
  try {
    if (!existsSync(DATA_FILE)) {
      // crear archivo vacío más adelante al guardar
      return;
    }
    const raw = readFileSync(DATA_FILE, 'utf8');
    const arr = JSON.parse(raw || '[]');
    arr.forEach(u => users.push(new User(u)));
  } catch (err) {
    console.error('Error al cargar users.json:', err.message);
  }
}

// inicializar
cargarDesdeArchivo();

// Helper: crear usuario (hash password)
export const crearUsuario = ({ username, password, role = 'user' }) => {
  if (!username || !password) throw new Error('username y password son requeridos');
  if (users.find(u => u.username === username)) throw new Error('Usuario ya existe');
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const u = new User({ username, passwordHash: hash, role });
  users.push(u);
  guardarEnArchivo();
  return { username: u.username, role: u.role };
};

export const autenticar = ({ username, password }) => {
  const u = users.find(x => x.username === username);
  if (!u) return null;
  const ok = bcrypt.compareSync(password, u.passwordHash);
  if (!ok) return null;
  // devolver una copia sin passwordHash
  return { username: u.username, role: u.role };
};

export const getUsuario = (username) => {
  const u = users.find(x => x.username === username);
  if (!u) return null;
  return { username: u.username, role: u.role };
};

// helper: ensure default users (admin/user) exist
export const ensureDefaultUsers = () => {
  if (users.length === 0) {
    try {
      crearUsuario({ username: 'admin', password: 'admin', role: 'admin' });
      crearUsuario({ username: 'user', password: 'user', role: 'user' });
      console.log('Usuarios por defecto creados: admin/admin, user/user');
    } catch (err) {
      // ignore if exist
    }
  }
};

// expose for tests
export const _listUsers = () => users.map(u => ({ username: u.username, role: u.role }));
