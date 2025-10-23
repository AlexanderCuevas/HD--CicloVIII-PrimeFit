// ItemPedido: referencia a un plato + cantidad + subtotales
export default class ItemPedido {
  constructor(plato, cantidad) {
    if (!plato) throw new Error('plato requerido');
    this.plato = plato;
    this.cantidad = Number(cantidad) || 0;
    if (this.cantidad <= 0) throw new Error('cantidad inválida');
  }

  get subtotalPrecio() {
    return Number((this.plato.precio * this.cantidad).toFixed(2));
  }

  get subtotalMacros() {
    return {
      kcal: this.plato.kcal * this.cantidad,
      prote: this.plato.prote * this.cantidad,
      carb: this.plato.carb * this.cantidad,
      grasa: this.plato.grasa * this.cantidad,
    };
  }
}