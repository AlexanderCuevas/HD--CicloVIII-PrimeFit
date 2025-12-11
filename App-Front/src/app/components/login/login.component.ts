import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="auth-container">
      <div class="auth-box">
        <h2>Iniciar Sesión</h2>
        <form (ngSubmit)="login()">
          <input type="text" [(ngModel)]="username" name="username" placeholder="Usuario" class="form-input">
          <input type="password" [(ngModel)]="password" name="password" placeholder="Contraseña" class="form-input">
          <button type="submit" class="btn btn-primary btn-block">Entrar</button>
        </form>
        <p>¿No tienes cuenta? <a routerLink="/register">Regístrate</a></p>
        <div class="demo-credentials">
          <p><strong>Demo:</strong> admin / admin123</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container { min-height: calc(100vh - 70px); display: flex; align-items: center; justify-content: center; padding: 20px; }
    .auth-box { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
    h2 { margin-bottom: 30px; text-align: center; color: var(--gray-800); }
    .form-input { width: 100%; padding: 12px; border: 1px solid var(--gray-300); border-radius: 8px; margin-bottom: 15px; }
    .btn-block { width: 100%; }
    p { text-align: center; margin-top: 20px; }
    a { color: var(--primary-color); text-decoration: none; }
    .demo-credentials { background: var(--gray-50); padding: 15px; border-radius: 8px; margin-top: 20px; text-align: center; font-size: 14px; }
  `]
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => alert('Error al iniciar sesión: ' + err.error.error)
    });
  }
}
