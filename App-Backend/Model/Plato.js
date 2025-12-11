class Plato {
  constructor({ id, restauranteId, nombre, descripcion, precio, imagen, categoria, macros, tags, disponible = true }) {
    this.id = id;
    this.restauranteId = restauranteId;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.imagen = imagen;
    this.categoria = categoria; // "Desayuno", "Almuerzo", "Cena", "Snacks", "Bebidas"
    this.macros = {
      calorias: macros?.calorias || 0,
      proteinas: macros?.proteinas || 0,
      carbohidratos: macros?.carbohidratos || 0,
      grasas: macros?.grasas || 0
    };
    this.tags = tags || []; // ["vegano", "sin gluten", "alto en proteína", etc.]
    this.disponible = disponible;
    this.fechaCreacion = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      restauranteId: this.restauranteId,
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio,
      imagen: this.imagen,
      categoria: this.categoria,
      macros: this.macros,
      tags: this.tags,
      disponible: this.disponible,
      fechaCreacion: this.fechaCreacion
    };
  }
}

export default Plato;
