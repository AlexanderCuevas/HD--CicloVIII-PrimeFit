class User {
  constructor({ id, username, email, password, nombre, apellido, telefono, direccion, role = 'cliente', restauranteId }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password; // debe estar hasheado
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.direccion = direccion;
    this.role = role; // "cliente", "admin", "restaurant_admin"
    this.restauranteId = restauranteId; // Solo para restaurant_admin
    this.fechaRegistro = new Date();
    this.activo = true;
  }

  toJSON() {
    // Excluir password del JSON
    const { password, ...userWithoutPassword } = this;
    return {
      ...userWithoutPassword,
      fechaRegistro: this.fechaRegistro
    };
  }

  toSafeJSON() {
    const safeData = {
      id: this.id,
      username: this.username,
      email: this.email,
      nombre: this.nombre,
      apellido: this.apellido,
      role: this.role
    };
    
    if (this.restauranteId) {
      safeData.restauranteId = this.restauranteId;
    }
    
    return safeData;
  }
}

export default User;
