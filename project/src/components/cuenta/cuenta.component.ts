import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, User, Pedido } from '../../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cuenta',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="cuenta-container">
      <!-- Si no está autenticado -->
      <div *ngIf="!usuarioActual" class="no-autenticado">
        <div class="mensaje-box">
          <h2>Inicia sesión para acceder a tu cuenta</h2>
          <p>Necesitas estar autenticado para ver tu perfil y pedidos</p>
          <button class="btn-primary" routerLink="/login">Ir al Login</button>
        </div>
      </div>

      <!-- Si está autenticado -->
      <div *ngIf="usuarioActual" class="cuenta-contenido">
        <!-- Header -->
        <div class="header-cuenta">
          <h1>Mi Cuenta</h1>
          <button class="btn-logout" (click)="cerrarSesion()">Cerrar Sesión</button>
        </div>

        <!-- Tabs de navegación -->
        <div class="tabs">
          <button 
            [class.active]="tabActiva === 'perfil'" 
            (click)="cambiarTab('perfil')"
            class="tab-btn"
          >
            📋 Perfil
          </button>
          <button 
            [class.active]="tabActiva === 'pedidos'" 
            (click)="cambiarTab('pedidos')"
            class="tab-btn"
          >
            🛒 Mis Pedidos
          </button>
        </div>

        <!-- Tab de Perfil -->
        <div *ngIf="tabActiva === 'perfil'" class="tab-content">
          <div class="perfil-section">
            <h2>Mi Perfil</h2>
            
            <div *ngIf="!editandoPerfil" class="perfil-view">
              <div class="perfil-item">
                <span class="label">Nombre:</span>
                <span class="valor">{{ usuarioActual.nombre }}</span>
              </div>
              <div class="perfil-item">
                <span class="label">Email:</span>
                <span class="valor">{{ usuarioActual.email }}</span>
              </div>
              <div class="perfil-item">
                <span class="label">Teléfono:</span>
                <span class="valor">{{ usuarioActual.telefono || 'No registrado' }}</span>
              </div>
              <div class="perfil-item">
                <span class="label">Ciudad:</span>
                <span class="valor">{{ usuarioActual.ciudad || 'No registrado' }}</span>
              </div>
              <div class="perfil-item">
                <span class="label">Dirección:</span>
                <span class="valor">{{ usuarioActual.direccion || 'No registrado' }}</span>
              </div>
              <button class="btn-editar" (click)="iniciarEdicion()">✏️ Editar Perfil</button>
            </div>

            <div *ngIf="editandoPerfil" class="perfil-edit">
              <form [formGroup]="perfilForm" (ngSubmit)="guardarCambios()" class="form-edicion">
                <div class="form-group">
                  <label>Nombre Completo</label>
                  <input type="text" formControlName="nombre" class="form-input">
                </div>
                <div class="form-group">
                  <label>Teléfono</label>
                  <input type="tel" formControlName="telefono" class="form-input">
                </div>
                <div class="form-group">
                  <label>Ciudad</label>
                  <input type="text" formControlName="ciudad" class="form-input">
                </div>
                <div class="form-group">
                  <label>Dirección</label>
                  <input type="text" formControlName="direccion" class="form-input">
                </div>
                <div class="botones-edicion">
                  <button type="submit" class="btn-guardar">Guardar Cambios</button>
                  <button type="button" class="btn-cancelar" (click)="cancelarEdicion()">Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Tab de Pedidos -->
        <div *ngIf="tabActiva === 'pedidos'" class="tab-content">
          <div class="pedidos-section">
            <h2>Mis Pedidos</h2>
            
            <div *ngIf="pedidos.length === 0" class="sin-pedidos">
              <p>No tienes pedidos aún</p>
              <button class="btn-ir-menu" routerLink="/">Ir al Menú</button>
            </div>

            <div *ngIf="pedidos.length > 0" class="pedidos-lista">
              <div *ngFor="let pedido of pedidos" class="pedido-card">
                <div class="pedido-header">
                  <div class="pedido-info">
                    <span class="pedido-id">Pedido #{{ pedido.id }}</span>
                    <span class="pedido-fecha">{{ pedido.fecha }}</span>
                  </div>
                  <span 
                    [class.estado-entregado]="pedido.estado === 'Entregado'"
                    [class.estado-preparacion]="pedido.estado === 'En Preparación'"
                    class="pedido-estado"
                  >
                    {{ pedido.estado }}
                  </span>
                </div>

                <div class="pedido-items">
                  <div *ngFor="let item of pedido.items" class="item">
                    <span class="item-nombre">{{ item.nombre }}</span>
                    <span class="item-cantidad">x{{ item.cantidad }}</span>
                    <span class="item-precio">\${{ (item.precio).toFixed(2) }}</span>
                  </div>
                </div>

                <div class="pedido-total">
                  <span class="label">Total:</span>
                  <span class="monto">\${{ (pedido.total).toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cuenta-container {
      max-width: 1000px;
      margin: 2rem auto;
      padding: 2rem 1.5rem;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      min-height: calc(100vh - 200px);
    }

    .no-autenticado {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 500px;
    }

    .mensaje-box {
      background: white;
      border-radius: 12px;
      padding: 3rem;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .mensaje-box h2 {
      font-size: 1.75rem;
      color: #2d3748;
      margin-bottom: 1rem;
    }

    .mensaje-box p {
      color: #718096;
      font-size: 1.125rem;
      margin-bottom: 2rem;
    }

    .header-cuenta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 2px solid #e2e8f0;
    }

    .header-cuenta h1 {
      font-size: 2.5rem;
      color: #2d3748;
      margin: 0;
    }

    .btn-logout {
      background: #f56565;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-logout:hover {
      background: #e53e3e;
      transform: translateY(-2px);
    }

    .tabs {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      border-bottom: 2px solid #e2e8f0;
    }

    .tab-btn {
      padding: 1rem 1.5rem;
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      color: #718096;
      transition: all 0.3s;
      position: relative;
      border-bottom: 3px solid transparent;
      margin-bottom: -2px;
    }

    .tab-btn:hover {
      color: #2d3748;
    }

    .tab-btn.active {
      color: #48bb78;
      border-bottom-color: #48bb78;
    }

    .tab-content {
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

    /* Sección Perfil */
    .perfil-section {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .perfil-section h2 {
      font-size: 1.5rem;
      color: #2d3748;
      margin-bottom: 1.5rem;
    }

    .perfil-view {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .perfil-item {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      background: #f7fafc;
      border-radius: 8px;
      align-items: center;
    }

    .perfil-item .label {
      font-weight: 600;
      color: #2d3748;
      width: 120px;
    }

    .perfil-item .valor {
      color: #4a5568;
      text-align: right;
      flex: 1;
    }

    .btn-editar {
      align-self: flex-start;
      margin-top: 1rem;
      background: #48bb78;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-editar:hover {
      background: #38a169;
      transform: translateY(-2px);
    }

    .perfil-edit {
      background: #f7fafc;
      border-radius: 8px;
      padding: 1.5rem;
    }

    .form-edicion {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-group label {
      font-weight: 600;
      color: #2d3748;
    }

    .form-input {
      padding: 0.75rem;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s;
      font-family: inherit;
    }

    .form-input:focus {
      outline: none;
      border-color: #48bb78;
      box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.1);
    }

    .botones-edicion {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .btn-guardar {
      flex: 1;
      background: #48bb78;
      color: white;
      border: none;
      padding: 0.875rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-guardar:hover {
      background: #38a169;
    }

    .btn-cancelar {
      flex: 1;
      background: #cbd5e0;
      color: #2d3748;
      border: none;
      padding: 0.875rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-cancelar:hover {
      background: #a0aec0;
    }

    /* Sección Pedidos */
    .pedidos-section {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .pedidos-section h2 {
      font-size: 1.5rem;
      color: #2d3748;
      margin-bottom: 1.5rem;
    }

    .sin-pedidos {
      text-align: center;
      padding: 3rem;
      color: #718096;
    }

    .sin-pedidos p {
      font-size: 1.125rem;
      margin-bottom: 1.5rem;
    }

    .btn-ir-menu {
      background: #48bb78;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-ir-menu:hover {
      background: #38a169;
    }

    .pedidos-lista {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .pedido-card {
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      padding: 1.5rem;
      transition: all 0.3s;
    }

    .pedido-card:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border-color: #48bb78;
    }

    .pedido-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e2e8f0;
    }

    .pedido-info {
      display: flex;
      gap: 2rem;
    }

    .pedido-id {
      font-weight: 700;
      color: #2d3748;
      font-size: 1.1rem;
    }

    .pedido-fecha {
      color: #718096;
      font-size: 0.95rem;
    }

    .pedido-estado {
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
    }

    .pedido-estado.estado-entregado {
      background: #c6f6d5;
      color: #22543d;
    }

    .pedido-estado.estado-preparacion {
      background: #feebc8;
      color: #7c2d12;
    }

    .pedido-items {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 1rem;
      padding: 1rem;
      background: #f7fafc;
      border-radius: 6px;
    }

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.95rem;
    }

    .item-nombre {
      flex: 1;
      color: #2d3748;
      font-weight: 500;
    }

    .item-cantidad {
      color: #718096;
      width: 60px;
      text-align: center;
    }

    .item-precio {
      color: #48bb78;
      font-weight: 600;
      width: 80px;
      text-align: right;
    }

    .pedido-total {
      display: flex;
      justify-content: space-between;
      font-size: 1.1rem;
      font-weight: 700;
      color: #2d3748;
    }

    .pedido-total .monto {
      color: #48bb78;
    }

    .btn-primary {
      background: #48bb78;
      color: white;
      border: none;
      padding: 0.875rem 2rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-primary:hover {
      background: #38a169;
      transform: translateY(-2px);
    }

    @media (max-width: 640px) {
      .cuenta-container {
        padding: 1rem;
      }

      .header-cuenta {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .header-cuenta h1 {
        font-size: 1.75rem;
      }

      .tabs {
        flex-wrap: wrap;
      }

      .tab-btn {
        flex: 1;
        min-width: 150px;
      }

      .perfil-item {
        flex-direction: column;
        align-items: flex-start;
      }

      .perfil-item .label {
        width: 100%;
      }

      .perfilo-item .valor {
        text-align: left;
      }

      .pedido-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }

      .item {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
    }
  `]
})
export class CuentaComponent implements OnInit, OnDestroy {
  usuarioActual: User | null = null;
  pedidos: Pedido[] = [];
  tabActiva: 'perfil' | 'pedidos' = 'perfil';
  editandoPerfil = false;
  perfilForm: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.perfilForm = this.fb.group({
      nombre: ['', Validators.required],
      telefono: [''],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Verificar si el usuario está autenticado
    if (!this.authService.estaAutenticado()) {
      this.router.navigate(['/login']);
      return;
    }

    // Suscribirse al usuario actual
    this.authService.usuario$
      .pipe(takeUntil(this.destroy$))
      .subscribe(usuario => {
        this.usuarioActual = usuario;
        if (usuario && this.editandoPerfil) {
          this.perfilForm.patchValue(usuario);
        }
      });

    // Suscribirse a los pedidos
    this.authService.pedidos$
      .pipe(takeUntil(this.destroy$))
      .subscribe(pedidos => {
        this.pedidos = pedidos;
      });

    // Cargar datos iniciales
    this.usuarioActual = this.authService.obtenerUsuarioActual();
    this.pedidos = this.authService.obtenerPedidos();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cambiarTab(tab: 'perfil' | 'pedidos'): void {
    this.tabActiva = tab;
  }

  iniciarEdicion(): void {
    if (this.usuarioActual) {
      this.editandoPerfil = true;
      this.perfilForm.patchValue(this.usuarioActual);
    }
  }

  cancelarEdicion(): void {
    this.editandoPerfil = false;
    this.perfilForm.reset();
  }

  guardarCambios(): void {
    if (this.perfilForm.invalid || !this.usuarioActual) return;

    const datosActualizados: User = {
      ...this.usuarioActual,
      ...this.perfilForm.value
    };

    this.authService.actualizarPerfil(datosActualizados).subscribe({
      next: (exito) => {
        if (exito) {
          this.editandoPerfil = false;
          this.usuarioActual = datosActualizados;
          alert('Perfil actualizado correctamente');
        }
      },
      error: () => {
        alert('Error al actualizar el perfil');
      }
    });
  }

  cerrarSesion(): void {
    if (confirm('¿Deseas cerrar sesión?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}
