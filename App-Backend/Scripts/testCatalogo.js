import { crearPlato, listarPlatos } from '../Services/catalogoService.js';

console.log('PID:', process.pid);
console.log('Antes, count:', listarPlatos().length);

const p = crearPlato({ nombre: 'Ensalada', kcal: 150, prote: 5, carb: 10, grasa: 8, precio: 12.5 });
console.log('Creado:', p);

console.log('Después, count:', listarPlatos().length);
console.log('Lista completa:', listarPlatos());