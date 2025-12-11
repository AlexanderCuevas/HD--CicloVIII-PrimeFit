class Restaurante {
  constructor({ id, nombre, descripcion, especialidad, logo, banner, calificacion, tiempoEntrega, costoEnvio, activo = true }) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.especialidad = especialidad; // ej: "Vegano", "Keto", "Proteico", "Low Carb"
    this.logo = logo;
    this.banner = banner;
    this.calificacion = calificacion || 4.5;
    this.tiempoEntrega = tiempoEntrega || "30-45 min";
    this.costoEnvio = costoEnvio || 0;
    this.activo = activo;
    this.fechaCreacion = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      especialidad: this.especialidad,
      logo: this.logo,
      banner: this.banner,
      calificacion: this.calificacion,
      tiempoEntrega: this.tiempoEntrega,
      costoEnvio: this.costoEnvio,
      activo: this.activo,
      fechaCreacion: this.fechaCreacion
    };
  }
}

export default Restaurante;
