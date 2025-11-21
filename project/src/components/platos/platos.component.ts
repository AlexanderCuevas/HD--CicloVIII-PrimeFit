import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlatosService } from '../../services/platos.service';
import { CarritoService } from '../../services/carrito.service';
import { Plato } from '../../models/plato.model';

@Component({
  selector: 'app-platos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="platos-container">
      <div class="hero">
        <h1>Comida Fitness que te Encantará</h1>
        <p>Deliciosas opciones saludables entregadas a tu puerta</p>
      </div>

      <div class="platos-grid">
        <div class="plato-card" *ngFor="let plato of platos">
          <div class="plato-imagen" [routerLink]="['/plato', plato.id]">
            <img [src]="plato.imagen" [alt]="plato.nombre">
            <span class="categoria-badge">{{ plato.categoria }}</span>
          </div>

          <div class="plato-content">
            <h3 [routerLink]="['/plato', plato.id]">{{ plato.nombre }}</h3>

            <div class="nutricion-resumen">
              <span class="nutricion-item">
                <span class="nutricion-label">Cal:</span> {{ plato.calorias }}
              </span>
              <span class="nutricion-item">
                <span class="nutricion-label">Prot:</span> {{ plato.proteinas }}g
              </span>
            </div>

            <div class="plato-footer">
              <span class="precio">\${{ plato.precio.toFixed(2) }}</span>
              <button class="btn-agregar" (click)="agregarAlCarrito(plato)">
                Añadir al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .platos-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
    }

    .hero {
      text-align: center;
      margin-bottom: 3rem;
    }

    .hero h1 {
      font-size: 2.5rem;
      color: #2d3748;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }

    .hero p {
      font-size: 1.25rem;
      color: #718096;
    }

    .platos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .plato-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .plato-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    }

    .plato-imagen {
      position: relative;
      height: 220px;
      overflow: hidden;
      cursor: pointer;
    }

    .plato-imagen img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }

    .plato-card:hover .plato-imagen img {
      transform: scale(1.05);
    }

    .categoria-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(72, 187, 120, 0.95);
      color: white;
      padding: 0.375rem 0.75rem;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .plato-content {
      padding: 1.5rem;
    }

    .plato-content h3 {
      font-size: 1.25rem;
      color: #2d3748;
      margin-bottom: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: color 0.2s;
    }

    .plato-content h3:hover {
      color: #48bb78;
    }

    .nutricion-resumen {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 1.25rem;
      padding: 0.75rem;
      background: #f7fafc;
      border-radius: 8px;
    }

    .nutricion-item {
      font-size: 0.95rem;
      color: #4a5568;
      font-weight: 500;
    }

    .nutricion-label {
      color: #718096;
      font-weight: 400;
    }

    .plato-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .precio {
      font-size: 1.5rem;
      font-weight: 700;
      color: #48bb78;
    }

    .btn-agregar {
      background: #48bb78;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 0.95rem;
    }

    .btn-agregar:hover {
      background: #38a169;
      transform: scale(1.02);
    }

    .btn-agregar:active {
      transform: scale(0.98);
    }

    @media (max-width: 768px) {
      .platos-container {
        padding: 1.5rem 1rem;
      }

      .hero h1 {
        font-size: 2rem;
      }

      .hero p {
        font-size: 1.1rem;
      }

      .platos-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }
  `]
})
export class PlatosComponent implements OnInit {
  platos: Plato[] = [];

  constructor(
    private platosService: PlatosService,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {
    this.platosService.getPlatos().subscribe(platos => {
      this.platos = platos;
    });
  }

  agregarAlCarrito(plato: Plato) {
    this.carritoService.agregarAlCarrito(plato);
  }
}
