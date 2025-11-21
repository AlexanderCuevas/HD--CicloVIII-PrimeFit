import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlatosService } from '../../services/platos.service';
import { CarritoService } from '../../services/carrito.service';
import { Plato } from '../../models/plato.model';

@Component({
  selector: 'app-plato-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="detalle-container" *ngIf="plato">
      <button class="btn-volver" routerLink="/">
        ← Volver al Menú
      </button>

      <div class="detalle-content">
        <div class="imagen-section">
          <img [src]="plato.imagen" [alt]="plato.nombre">
          <span class="categoria-badge">{{ plato.categoria }}</span>
        </div>

        <div class="info-section">
          <h1>{{ plato.nombre }}</h1>
          <p class="descripcion">{{ plato.descripcion }}</p>

          <div class="precio-section">
            <span class="precio">\${{ plato.precio.toFixed(2) }}</span>
          </div>

          <div class="nutricion-completa">
            <h2>Información Nutricional</h2>
            <div class="nutricion-grid">
              <div class="nutricion-card">
                <span class="nutricion-valor">{{ plato.calorias }}</span>
                <span class="nutricion-nombre">Calorías</span>
              </div>
              <div class="nutricion-card">
                <span class="nutricion-valor">{{ plato.proteinas }}g</span>
                <span class="nutricion-nombre">Proteínas</span>
              </div>
              <div class="nutricion-card">
                <span class="nutricion-valor">{{ plato.carbohidratos }}g</span>
                <span class="nutricion-nombre">Carbohidratos</span>
              </div>
              <div class="nutricion-card">
                <span class="nutricion-valor">{{ plato.grasas }}g</span>
                <span class="nutricion-nombre">Grasas</span>
              </div>
            </div>
          </div>

          <button class="btn-agregar-grande" (click)="agregarAlCarrito()">
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>

    <div class="no-encontrado" *ngIf="!plato">
      <h2>Plato no encontrado</h2>
      <button class="btn-volver" routerLink="/">Volver al Menú</button>
    </div>
  `,
  styles: [`
    .detalle-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
    }

    .btn-volver {
      background: #f7fafc;
      border: 1px solid #e2e8f0;
      color: #4a5568;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      margin-bottom: 2rem;
      font-size: 1rem;
    }

    .btn-volver:hover {
      background: #edf2f7;
      border-color: #cbd5e0;
    }

    .detalle-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .imagen-section {
      position: relative;
      height: 600px;
    }

    .imagen-section img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .categoria-badge {
      position: absolute;
      top: 20px;
      right: 20px;
      background: rgba(72, 187, 120, 0.95);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 1rem;
      font-weight: 600;
    }

    .info-section {
      padding: 2.5rem;
      display: flex;
      flex-direction: column;
    }

    .info-section h1 {
      font-size: 2.25rem;
      color: #2d3748;
      margin-bottom: 1.5rem;
      font-weight: 700;
    }

    .descripcion {
      font-size: 1.125rem;
      color: #4a5568;
      line-height: 1.7;
      margin-bottom: 2rem;
    }

    .precio-section {
      margin-bottom: 2.5rem;
    }

    .precio {
      font-size: 2.5rem;
      font-weight: 700;
      color: #48bb78;
    }

    .nutricion-completa {
      margin-bottom: 2.5rem;
    }

    .nutricion-completa h2 {
      font-size: 1.5rem;
      color: #2d3748;
      margin-bottom: 1.5rem;
      font-weight: 600;
    }

    .nutricion-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .nutricion-card {
      background: #f7fafc;
      padding: 1.25rem;
      border-radius: 10px;
      text-align: center;
      border: 2px solid #e2e8f0;
      transition: all 0.2s;
    }

    .nutricion-card:hover {
      border-color: #48bb78;
      transform: translateY(-2px);
    }

    .nutricion-valor {
      display: block;
      font-size: 1.75rem;
      font-weight: 700;
      color: #2d3748;
      margin-bottom: 0.5rem;
    }

    .nutricion-nombre {
      display: block;
      font-size: 0.95rem;
      color: #718096;
      font-weight: 500;
    }

    .btn-agregar-grande {
      background: #48bb78;
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 10px;
      font-weight: 700;
      font-size: 1.125rem;
      cursor: pointer;
      transition: all 0.2s;
      margin-top: auto;
    }

    .btn-agregar-grande:hover {
      background: #38a169;
      transform: scale(1.02);
    }

    .btn-agregar-grande:active {
      transform: scale(0.98);
    }

    .no-encontrado {
      max-width: 600px;
      margin: 4rem auto;
      text-align: center;
      padding: 3rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .no-encontrado h2 {
      font-size: 2rem;
      color: #2d3748;
      margin-bottom: 2rem;
    }

    @media (max-width: 968px) {
      .detalle-content {
        grid-template-columns: 1fr;
        gap: 0;
      }

      .imagen-section {
        height: 400px;
      }

      .info-section {
        padding: 2rem;
      }

      .info-section h1 {
        font-size: 1.75rem;
      }

      .precio {
        font-size: 2rem;
      }

      .nutricion-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 640px) {
      .detalle-container {
        padding: 1rem;
      }

      .imagen-section {
        height: 300px;
      }

      .info-section {
        padding: 1.5rem;
      }

      .nutricion-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PlatoDetalleComponent implements OnInit {
  plato: Plato | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private platosService: PlatosService,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.plato = this.platosService.getPlatoById(id);
  }

  agregarAlCarrito() {
    if (this.plato) {
      this.carritoService.agregarAlCarrito(this.plato);
      this.router.navigate(['/carrito']);
    }
  }
}
