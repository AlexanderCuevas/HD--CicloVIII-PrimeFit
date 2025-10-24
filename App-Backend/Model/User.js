export default class User {
  constructor({ username, passwordHash, role = 'user' }) {
    if (!username) throw new Error('username requerido');
    this.username = username;
    this.passwordHash = passwordHash; // hashed password
    this.role = role; // 'admin' | 'user'
  }
}
