import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <div class="login-content">
        <!-- Panel Izquierdo - Bienvenida -->
        <div class="welcome-panel">
          <div class="welcome-content">
            <h1>PrimeFit</h1>
            <p class="tagline">Tu plataforma de pedidos confiable</p>
            <div class="features">
              <div class="feature">
                <span class="icon">🍕</span>
                <span>Deliciosos platillos</span>
              </div>
              <div class="feature">
                <span class="icon">⚡</span>
                <span>Entrega rápida</span>
              </div>
              <div class="feature">
                <span class="icon">💰</span>
                <span>Mejores precios</span>
              </div>
            </div>
            <p class="welcome-text" *ngIf="modo === 'login'">
              ¿No tienes cuenta? Crea una ahora
            </p>
            <p class="welcome-text" *ngIf="modo === 'registro'">
              ¿Ya tienes cuenta? Inicia sesión
            </p>
          </div>
        </div>

        <!-- Panel Derecho - Formulario -->
        <div class="form-panel">
          <div class="form-wrapper">
            <!-- Tabs para cambiar entre login y registro -->
            <div class="tabs">
              <button 
                [class.active]="modo === 'login'" 
                (click)="cambiarModo('login')"
                class="tab-btn"
              >
                🔐 Iniciar Sesión
              </button>
              <button 
                [class.active]="modo === 'registro'" 
                (click)="cambiarModo('registro')"
                class="tab-btn"
              >
                ✏️ Crear Cuenta
              </button>
            </div>

        <!-- Formulario de Login -->
        <div *ngIf="modo === 'login'" class="form-container">
          <h2>Bienvenido a PrimeFit</h2>
          <p class="subtitle">Inicia sesión con tu cuenta</p>
          
          <form [formGroup]="loginForm" (ngSubmit)="enviarLogin()" class="form">
            <div class="form-group">
              <label for="email-login">Correo Electrónico</label>
              <input 
                id="email-login"
                type="email" 
                formControlName="email"
                placeholder="tu@email.com"
                class="form-input"
              >
              <span class="error" *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
                Email inválido
              </span>
            </div>

            <div class="form-group">
              <label for="password-login">Contraseña</label>
              <input 
                id="password-login"
                type="password" 
                formControlName="password"
                placeholder="Mínimo 6 caracteres"
                class="form-input"
              >
              <span class="error" *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
                La contraseña debe tener al menos 6 caracteres
              </span>
            </div>

            <button 
              type="submit" 
              [disabled]="loginForm.invalid || cargando"
              class="btn-submit"
            >
              {{ cargando ? 'Autenticando...' : 'Iniciar Sesión' }}
            </button>

            <div class="error-message" *ngIf="mensajeError">
              {{ mensajeError }}
            </div>

            <div class="success-message" *ngIf="mensajeExito">
              {{ mensajeExito }}
            </div>

            <div class="divider">o</div>

            <p class="switch-text">
              ¿No tienes cuenta? 
              <button type="button" class="link-btn" (click)="cambiarModo('registro')">
                Regístrate aquí
              </button>
            </p>
          </form>
        </div>

        <!-- Formulario de Registro -->
        <div *ngIf="modo === 'registro'" class="form-container">
          <h2>Crear Nueva Cuenta</h2>
          <p class="subtitle">Completa los siguientes datos</p>
          
          <form [formGroup]="registroForm" (ngSubmit)="enviarRegistro()" class="form">
            <div class="form-group">
              <label for="nombre">Nombre Completo</label>
              <input 
                id="nombre"
                type="text" 
                formControlName="nombre"
                placeholder="Tu nombre completo"
                class="form-input"
              >
              <span class="error" *ngIf="registroForm.get('nombre')?.invalid && registroForm.get('nombre')?.touched">
                El nombre es requerido
              </span>
            </div>

            <div class="form-group">
              <label for="email-registro">Correo Electrónico</label>
              <input 
                id="email-registro"
                type="email" 
                formControlName="email"
                placeholder="tu@email.com"
                class="form-input"
              >
              <span class="error" *ngIf="registroForm.get('email')?.invalid && registroForm.get('email')?.touched">
                Email inválido
              </span>
            </div>

            <div class="form-group">
              <label for="telefono">Teléfono (Opcional)</label>
              <input 
                id="telefono"
                type="tel" 
                formControlName="telefono"
                placeholder="+57 312 123 4567"
                class="form-input"
              >
            </div>

            <div class="form-group">
              <label for="ciudad">Ciudad</label>
              <input 
                id="ciudad"
                type="text" 
                formControlName="ciudad"
                placeholder="Tu ciudad"
                class="form-input"
              >
            </div>

            <div class="form-group">
              <label for="direccion">Dirección</label>
              <input 
                id="direccion"
                type="text" 
                formControlName="direccion"
                placeholder="Tu dirección"
                class="form-input"
              >
            </div>

            <div class="form-group">
              <label for="password-registro">Contraseña</label>
              <input 
                id="password-registro"
                type="password" 
                formControlName="password"
                placeholder="Mínimo 6 caracteres"
                class="form-input"
              >
              <span class="error" *ngIf="registroForm.get('password')?.invalid && registroForm.get('password')?.touched">
                La contraseña debe tener al menos 6 caracteres
              </span>
            </div>

            <div class="form-group">
              <label for="confirmar-password">Confirmar Contraseña</label>
              <input 
                id="confirmar-password"
                type="password" 
                formControlName="confirmarPassword"
                placeholder="Confirma tu contraseña"
                class="form-input"
              >
              <span class="error" *ngIf="registroForm.get('confirmarPassword')?.invalid && registroForm.get('confirmarPassword')?.touched">
                Las contraseñas no coinciden
              </span>
            </div>

            <button 
              type="submit" 
              [disabled]="registroForm.invalid || cargando"
              class="btn-submit"
            >
              {{ cargando ? 'Creando cuenta...' : 'Crear Cuenta' }}
            </button>

            <div class="error-message" *ngIf="mensajeError">
              {{ mensajeError }}
            </div>

            <div class="success-message" *ngIf="mensajeExito">
              {{ mensajeExito }}
            </div>

            <div class="divider">o</div>

            <p class="switch-text">
              ¿Ya tienes cuenta? 
              <button type="button" class="link-btn" (click)="cambiarModo('login')">
                Inicia sesión aquí
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #1e3a8a 0%, #065f46 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem 1rem;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .login-content {
      display: flex;
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      width: 100%;
      max-width: 900px;
      overflow: hidden;
      animation: slideUp 0.5s ease-out;
      height: auto;
    }

    .welcome-panel {
      flex: 1;
      background: linear-gradient(135deg, #1e3a8a 0%, #065f46 100%);
      color: white;
      padding: 3rem 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 500px;
    }

    .welcome-content {
      text-align: center;
    }

    .welcome-content h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }

    .tagline {
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 2rem;
    }

    .features {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .feature {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 1rem;
    }

    .feature .icon {
      font-size: 1.8rem;
    }

    .welcome-text {
      font-size: 0.95rem;
      color: rgba(255, 255, 255, 0.8);
      margin-top: 2rem;
      font-style: italic;
    }

    .form-panel {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      min-height: 500px;
    }

    .form-wrapper {
      width: 100%;
    }

    .login-wrapper {
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      width: 100%;
      max-width: 500px;
      overflow: hidden;
      animation: slideUp 0.5s ease-out;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .tabs {
      display: flex;
      background: #f7fafc;
      border-bottom: 2px solid #e2e8f0;
    }

    .tab-btn {
      flex: 1;
      padding: 1rem;
      border: none;
      background: transparent;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      color: #718096;
      transition: all 0.3s ease;
      position: relative;
    }

    .tab-btn:hover {
      color: #2d3748;
    }

    .tab-btn.active {
      color: #667eea;
    }

    .tab-btn.active::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: #667eea;
    }

    .form-container {
      padding: 2rem;
      animation: fadeIn 0.3s ease-in;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    h2 {
      font-size: 1.5rem;
      color: #2d3748;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }

    .subtitle {
      color: #718096;
      margin-bottom: 2rem;
      font-size: 0.95rem;
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    label {
      font-weight: 600;
      color: #2d3748;
      font-size: 0.95rem;
    }

    .form-input {
      padding: 0.75rem 1rem;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
      font-family: inherit;
    }

    .form-input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .form-input:invalid:not(:placeholder-shown) {
      border-color: #f56565;
    }

    .error {
      color: #f56565;
      font-size: 0.85rem;
      font-weight: 500;
    }

    .btn-submit {
      padding: 0.875rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 0.5rem;
    }

    .btn-submit:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }

    .btn-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .error-message {
      background: #fff5f5;
      border: 1px solid #feb2b2;
      color: #c53030;
      padding: 0.875rem 1rem;
      border-radius: 6px;
      font-size: 0.95rem;
      text-align: center;
    }

    .success-message {
      background: #f0fff4;
      border: 1px solid #9ae6b4;
      color: #22543d;
      padding: 0.875rem 1rem;
      border-radius: 6px;
      font-size: 0.95rem;
      text-align: center;
    }

    .divider {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 2rem 0;
      color: #a0aec0;
      font-size: 0.9rem;
    }

    .divider::before,
    .divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: #e2e8f0;
    }

    .switch-text {
      text-align: center;
      color: #718096;
      font-size: 0.9rem;
      margin-top: 1.5rem;
    }

    .link-btn {
      background: none;
      border: none;
      color: #48bb78;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      text-decoration: underline;
    }

    .link-btn:hover {
      color: #38a169;
    }

    @media (max-width: 768px) {
      .login-content {
        flex-direction: column;
        max-width: 100%;
      }

      .welcome-panel {
        min-height: 250px;
        padding: 2rem 1.5rem;
      }

      .welcome-content h1 {
        font-size: 2rem;
      }

      .features {
        gap: 1rem;
        margin-bottom: 1rem;
      }

      .feature {
        font-size: 0.9rem;
      }

      .form-panel {
        min-height: auto;
        padding: 1.5rem 1rem;
      }

      .form-container {
        padding: 1.5rem 1rem;
      }

      h2 {
        font-size: 1.25rem;
      }
    }

    @media (max-width: 640px) {
      .login-content {
        border-radius: 0;
      }

      .welcome-panel {
        display: none;
      }

      .form-panel {
        min-height: 100vh;
      }

      .form-container {
        padding: 1rem;
      }

      h2 {
        font-size: 1.5rem;
      }

      .tabs {
        margin-bottom: 1.5rem;
      }

      .tab-btn {
        padding: 0.75rem !important;
        font-size: 0.85rem !important;
      }
    }
  `]
})
export class LoginComponent {
  modo: 'login' | 'registro' = 'login';
  loginForm: FormGroup;
  registroForm: FormGroup;
  cargando = false;
  mensajeError = '';
  mensajeExito = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', [Validators.required]]
    }, { validators: this.validarContraseñas });
  }

  cambiarModo(nuevoModo: 'login' | 'registro'): void {
    this.modo = nuevoModo;
    this.mensajeError = '';
    this.mensajeExito = '';
  }

  enviarLogin(): void {
    if (this.loginForm.invalid) return;

    this.cargando = true;
    this.mensajeError = '';
    this.mensajeExito = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (exito) => {
        this.cargando = false;
        if (exito) {
          this.mensajeExito = '¡Bienvenido! Redirigiendo...';
          setTimeout(() => {
            this.router.navigate(['/cuenta']);
          }, 1500);
        } else {
          this.mensajeError = 'Correo o contraseña incorrectos';
        }
      },
      error: () => {
        this.cargando = false;
        this.mensajeError = 'Error al iniciar sesión. Intenta nuevamente.';
      }
    });
  }

  enviarRegistro(): void {
    if (this.registroForm.invalid) return;

    this.cargando = true;
    this.mensajeError = '';
    this.mensajeExito = '';

    const { email, password, ...datosUsuario } = this.registroForm.value;

    this.authService.registrar(datosUsuario, password).subscribe({
      next: (exito) => {
        this.cargando = false;
        if (exito) {
          this.mensajeExito = '¡Cuenta creada exitosamente! Redirigiendo...';
          this.registroForm.reset();
          setTimeout(() => {
            this.router.navigate(['/cuenta']);
          }, 1500);
        } else {
          this.mensajeError = 'Error al crear la cuenta. Intenta nuevamente.';
        }
      },
      error: () => {
        this.cargando = false;
        this.mensajeError = 'Error al registrarse. Intenta nuevamente.';
      }
    });
  }

  private validarContraseñas(form: FormGroup): { [key: string]: any } | null {
    const password = form.get('password')?.value;
    const confirmarPassword = form.get('confirmarPassword')?.value;
    return password === confirmarPassword ? null : { 'contraseñasNoCoinciden': true };
  }
}
