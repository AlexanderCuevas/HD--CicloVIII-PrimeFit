import Plato from '../Model/Plato.js';

const platos = []; // persistencia en memoria

export const crearPlato = (data) => {
  const plato = new Plato(data);
  platos.push(plato);
  return plato;
};

export const listarPlatos = () => [...platos];

export const buscarPlatoPorId = (id) => platos.find(p => p.id === id);