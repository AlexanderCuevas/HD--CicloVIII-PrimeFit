import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


interface Pedido {
  id: number;
  fecha: string;
  estado: string;
}

interface Usuario {
  nombre: string;
  correo: string;
}


@Component({
  selector: 'app-cuenta',
  standalone: true,

  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="cuenta-container">
      <div class="cuenta-card">
        <h1>Mi Cuenta</h1>
        <!-- Edición de datos personales -->
        <div class="perfil-section">
          <h2>Datos personales</h2>
          <form (ngSubmit)="guardarCambios()">
            <label>
              Nombre:
              <input [(ngModel)]="usuario.nombre" name="nombre" required />
            </label>
            <label>
              Correo:
              <input [(ngModel)]="usuario.correo" name="correo" required type="email" />
            </label>
            <button type="submit" class="btn-guardar">Guardar cambios</button>
          </form>
        </div>
        <!-- Historial de pedidos -->
        <div class="historial-section">
          <h2>Historial de pedidos</h2>
          <ul *ngIf="historialPedidos.length > 0; else sinPedidos">
            <li *ngFor="let pedido of historialPedidos">
              Pedido #{{pedido.id}} - {{pedido.fecha}} - {{pedido.estado}}
            </li>
          </ul>
          <ng-template #sinPedidos>
            <p>No tienes pedidos anteriores.</p>
          </ng-template>
        </div>
        <button class="btn-volver" routerLink="/">Volver al Menú</button>
>>>>>>> 006df0d85ef822523f19efaaa1263df948bf8969
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
export class CuentaComponent {
  usuario: Usuario = {
    nombre: 'Juan Pérez',
    correo: 'juan.perez@email.com'
  };

  historialPedidos: Pedido[] = [
    { id: 101, fecha: '2025-11-01', estado: 'Entregado' },
    { id: 102, fecha: '2025-11-10', estado: 'En camino' }
  ];

  guardarCambios() {
    // Aquí iría la lógica para guardar los cambios del usuario
    alert('Datos actualizados correctamente');

  }
}
