import { ensureDefaultUsers, _listUsers, autenticar } from '../Services/authService.js';

ensureDefaultUsers();
console.log('Usuarios actuales:');
console.log(_listUsers());

console.log('\nPruebas de autenticación:');
console.log('admin/admin =>', autenticar({ username: 'admin', password: 'admin' }));
console.log('user/user =>', autenticar({ username: 'user', password: 'user' }));
console.log('user/wrong =>', autenticar({ username: 'user', password: 'wrong' }));
