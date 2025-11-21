import { Component } from '@angular/core';
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
      </div>
    </div>
  `,
  styles: [`
    .cuenta-container {
      max-width: 600px;
      margin: 4rem auto;
      padding: 2rem 1.5rem;
    }

    .cuenta-card {
      background: white;
      border-radius: 12px;
      padding: 3rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    h1 {
      font-size: 2.5rem;
      color: #2d3748;
      margin-bottom: 1.5rem;
      font-weight: 700;
    }

    .mensaje {
      font-size: 1.25rem;
      color: #48bb78;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .descripcion {
      font-size: 1.125rem;
      color: #718096;
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .btn-volver {
      background: #48bb78;
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1.125rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-volver:hover {
      background: #38a169;
      transform: scale(1.02);
    }

    @media (max-width: 640px) {
      .cuenta-container {
        padding: 1rem;
        margin: 2rem auto;
      }

      .cuenta-card {
        padding: 2rem 1.5rem;
      }

      h1 {
        font-size: 2rem;
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
