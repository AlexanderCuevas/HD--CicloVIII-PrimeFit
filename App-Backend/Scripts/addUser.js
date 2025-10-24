import promptSync from 'prompt-sync';
import { crearUsuario } from '../Services/authService.js';

const prompt = promptSync({ sigint: true });

async function main() {
  console.log('Crear nuevo usuario');
  const username = prompt('Username: ').trim();
  if (!username) {
    console.log('Username es requerido.');
    process.exit(1);
  }
  // ocultar password en consola
  const password = prompt('Password: ', { echo: '*' });
  if (!password) {
    console.log('\nPassword es requerido.');
    process.exit(1);
  }
  let role = prompt('Role (admin/user) [user]: ').trim().toLowerCase();
  if (!role) role = 'user';
  if (!['admin', 'user'].includes(role)) {
    console.log('Role inválido. Use "admin" o "user".');
    process.exit(1);
  }

  try {
    const created = crearUsuario({ username, password, role });
    console.log('Usuario creado:', created);
    process.exit(0);
  } catch (err) {
    console.error('Error al crear usuario:', err.message);
    process.exit(1);
  }
}

main();
