import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cuenta',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="cuenta-container">
      <div class="cuenta-card">
        <h1>Mi Cuenta</h1>
        <p class="mensaje">Esta sección estará disponible próximamente.</p>
        <p class="descripcion">
          Aquí podrás gestionar tu perfil, ver tus pedidos anteriores y configurar tus preferencias.
        </p>
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
export class CuentaComponent {}
