import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../Model/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const USERS_FILE = path.join(__dirname, '../data/users.json');

// Cargar usuarios del archivo
function loadUsers() {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    const users = JSON.parse(data);
    return users.map(u => new User(u));
  } catch (error) {
    return [];
  }
}

// Guardar usuarios al archivo
function saveUsers(users) {
  const usersData = users.map(u => ({
    id: u.id,
    username: u.username,
    email: u.email,
    password: u.password, // Guardar password hasheado
    nombre: u.nombre,
    apellido: u.apellido,
    telefono: u.telefono,
    direccion: u.direccion,
    role: u.role,
    fechaRegistro: u.fechaRegistro,
    activo: u.activo
  }));
  fs.writeFileSync(USERS_FILE, JSON.stringify(usersData, null, 2));
}

let users = loadUsers();

// Crear usuario
export async function registrarUsuario(userData) {
  // Verificar si el usuario ya existe
  if (users.find(u => u.username === userData.username || u.email === userData.email)) {
    throw new Error('El usuario o email ya existe');
  }

  // Hash del password
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  
  const nuevoUsuario = new User({
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    ...userData,
    password: hashedPassword
  });

  users.push(nuevoUsuario);
  saveUsers(users);

  return nuevoUsuario.toSafeJSON();
}

// Autenticar usuario
export async function autenticarUsuario(username, password) {
  const user = users.find(u => u.username === username || u.email === username);
  
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const isValid = await bcrypt.compare(password, user.password);
  
  if (!isValid) {
    throw new Error('Contraseña incorrecta');
  }

  // Generar token JWT
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  return {
    token,
    user: user.toSafeJSON()
  };
}

// Verificar token
export function verificarToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
}

// Obtener usuario por ID
export function obtenerUsuarioPorId(id) {
  const user = users.find(u => u.id === id);
  return user ? user.toSafeJSON() : null;
}

// Obtener todos los usuarios (solo admin)
export function obtenerTodosLosUsuarios() {
  return users.map(u => u.toSafeJSON());
}
