// Clase Plato - Model con validaciones básicas
export default class Plato {
  constructor({ id, nombre, kcal, prote, carb, grasa, precio }) {
    if (!nombre || typeof nombre !== 'string') throw new Error('nombre requerido');
    this.id = id ?? Date.now().toString();
    this.nombre = nombre;
    this.kcal = Number(kcal) || 0;
    this.prote = Number(prote) || 0;
    this.carb = Number(carb) || 0;
    this.grasa = Number(grasa) || 0;
    this.precio = Number(precio);
    if (Number.isNaN(this.precio)) throw new Error('precio inválido');
  }
}