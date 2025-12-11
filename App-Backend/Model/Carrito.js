class Carrito {
  constructor({ usuarioId, items = [] }) {
    this.usuarioId = usuarioId;
    this.items = items; // Array de ItemPedido
    this.fechaActualizacion = new Date();
  }

  agregarItem(item) {
    const existente = this.items.find(i => i.platoId === item.platoId);
    if (existente) {
      existente.cantidad += item.cantidad;
    } else {
      this.items.push(item);
    }
    this.fechaActualizacion = new Date();
  }

  eliminarItem(platoId) {
    this.items = this.items.filter(i => i.platoId !== platoId);
    this.fechaActualizacion = new Date();
  }

  actualizarCantidad(platoId, cantidad) {
    const item = this.items.find(i => i.platoId === platoId);
    if (item) {
      if (cantidad <= 0) {
        this.eliminarItem(platoId);
      } else {
        item.cantidad = cantidad;
        this.fechaActualizacion = new Date();
      }
    }
  }

  vaciar() {
    this.items = [];
    this.fechaActualizacion = new Date();
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.getSubtotal(), 0);
  }

  getCantidadItems() {
    return this.items.reduce((sum, item) => sum + item.cantidad, 0);
  }

  toJSON() {
    return {
      usuarioId: this.usuarioId,
      items: this.items.map(item => item.toJSON()),
      total: this.getTotal(),
      cantidadItems: this.getCantidadItems(),
      fechaActualizacion: this.fechaActualizacion
    };
  }
}

export default Carrito;
