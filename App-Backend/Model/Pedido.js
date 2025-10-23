export default class Pedido {
  constructor({ id, cliente, items = [], fecha = new Date() }) {
    // id será asignado por el servicio de pedidos (contador secuencial)
    this.id = id ?? null;
    this.cliente = cliente || 'Cliente';
    this.items = items; // array de ItemPedido
    this.fecha = new Date(fecha);
  }

  totalPrecio() {
    return this.items.reduce((s, it) => s + it.subtotalPrecio, 0);
  }

  totalMacros() {
    return this.items.reduce((acc, it) => {
      const m = it.subtotalMacros;
      acc.kcal += m.kcal;
      acc.prote += m.prote;
      acc.carb += m.carb;
      acc.grasa += m.grasa;
      return acc;
    }, { kcal: 0, prote: 0, carb: 0, grasa: 0 });
  }
}