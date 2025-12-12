class Pedido {
  constructor({ id, usuarioId, items, subtotal, costoEnvio, total, direccionEntrega, estado = 'pendiente', telefono, referencia, metodoPago, notas }) {
    this.id = id;
    this.usuarioId = usuarioId;
    this.items = items; // Array de ItemPedido
    this.subtotal = subtotal;
    this.costoEnvio = costoEnvio || 0;
    this.total = total;
    this.direccionEntrega = direccionEntrega;
    this.estado = estado; // "pendiente", "confirmado", "preparando", "en_camino", "entregado", "cancelado"
    this.telefono = telefono || '';
    this.referencia = referencia || '';
    this.metodoPago = metodoPago || 'contraentrega';
    this.notas = notas || '';
    this.fechaPedido = new Date();
    this.fechaActualizacion = new Date();
  }

  actualizarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
    this.fechaActualizacion = new Date();
  }

  calcularTotal() {
    this.subtotal = this.items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    this.total = this.subtotal + this.costoEnvio;
  }

  toJSON() {
    return {
      id: this.id,
      usuarioId: this.usuarioId,
      items: this.items,
      subtotal: this.subtotal,
      costoEnvio: this.costoEnvio,
      total: this.total,
      direccionEntrega: this.direccionEntrega,
      estado: this.estado,
      telefono: this.telefono,
      referencia: this.referencia,
      metodoPago: this.metodoPago,
      notas: this.notas,
      fechaPedido: this.fechaPedido,
      fechaActualizacion: this.fechaActualizacion
    };
  }
}

export default Pedido;
