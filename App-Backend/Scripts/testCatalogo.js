import { crearPlato, listarPlatos } from '../Services/catalogoService.js';

const p = crearPlato({ nombre: 'Ensalada', kcal: 150, prote: 5, carb: 10, grasa: 8, precio: 12.5 });
console.log('Creado:', p);
console.log('Todos:', listarPlatos());