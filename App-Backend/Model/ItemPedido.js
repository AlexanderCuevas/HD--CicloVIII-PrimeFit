class ItemPedido {
  constructor({ platoId, restauranteId, nombre, precio, cantidad, imagen, macros }) {
    this.platoId = platoId;
    this.restauranteId = restauranteId;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
    this.imagen = imagen;
    this.macros = macros;
  }

  getSubtotal() {
    return this.precio * this.cantidad;
  }

  toJSON() {
    return {
      platoId: this.platoId,
      restauranteId: this.restauranteId,
      nombre: this.nombre,
      precio: this.precio,
      cantidad: this.cantidad,
      imagen: this.imagen,
      macros: this.macros,
      subtotal: this.getSubtotal()
    };
  }
}

export default ItemPedido;
