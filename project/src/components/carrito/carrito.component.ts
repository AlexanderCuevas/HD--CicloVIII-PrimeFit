import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { ItemCarrito } from '../../models/plato.model';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="carrito-container">
      <h1>Tu Carrito</h1>

      <div class="carrito-vacio" *ngIf="items.length === 0">
        <div class="vacio-content">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <h2>Tu carrito está vacío</h2>
          <p>Agrega algunos platos deliciosos para comenzar</p>
          <button class="btn-menu" routerLink="/">Ver Menú</button>
        </div>
      </div>

      <div class="carrito-content" *ngIf="items.length > 0">
        <div class="items-list">
          <div class="item-card" *ngFor="let item of items">
            <img [src]="item.plato.imagen" [alt]="item.plato.nombre">

            <div class="item-info">
              <h3>{{ item.plato.nombre }}</h3>
              <p class="item-nutricion">
                {{ item.plato.calorias }} cal • {{ item.plato.proteinas }}g proteínas
              </p>
            </div>

            <div class="item-cantidad">
              <button class="btn-cantidad" (click)="actualizarCantidad(item, item.cantidad - 1)">−</button>
              <span class="cantidad">{{ item.cantidad }}</span>
              <button class="btn-cantidad" (click)="actualizarCantidad(item, item.cantidad + 1)">+</button>
            </div>

            <div class="item-precio">
              <span class="precio">\${{ (item.plato.precio * item.cantidad).toFixed(2) }}</span>
              <button class="btn-eliminar" (click)="eliminarItem(item.plato.id)">
                Eliminar
              </button>
            </div>
          </div>
        </div>

        <div class="resumen-card">
          <h2>Resumen del Pedido</h2>

          <div class="resumen-linea">
            <span>Subtotal</span>
            <span>\${{ getTotal().toFixed(2) }}</span>
          </div>

          <div class="resumen-linea">
            <span>Envío</span>
            <span>Gratis</span>
          </div>

          <div class="resumen-divider"></div>

          <div class="resumen-linea total">
            <span>Total</span>
            <span>\${{ getTotal().toFixed(2) }}</span>
          </div>

          <button class="btn-checkout" routerLink="/checkout">
            Proceder al Pago
          </button>

          <button class="btn-continuar" routerLink="/">
            Continuar Comprando
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .carrito-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
    }

    h1 {
      font-size: 2.5rem;
      color: #2d3748;
      margin-bottom: 2rem;
      font-weight: 700;
    }

    .carrito-vacio {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 500px;
    }

    .vacio-content {
      text-align: center;
      max-width: 400px;
    }

    .vacio-content svg {
      color: #cbd5e0;
      margin-bottom: 1.5rem;
    }

    .vacio-content h2 {
      font-size: 1.75rem;
      color: #2d3748;
      margin-bottom: 0.75rem;
    }

    .vacio-content p {
      font-size: 1.125rem;
      color: #718096;
      margin-bottom: 2rem;
    }

    .btn-menu {
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

    .btn-menu:hover {
      background: #38a169;
      transform: scale(1.02);
    }

    .carrito-content {
      display: grid;
      grid-template-columns: 1fr 400px;
      gap: 2rem;
      align-items: start;
    }

    .items-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .item-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      display: grid;
      grid-template-columns: 120px 1fr auto auto;
      gap: 1.5rem;
      align-items: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.2s;
    }

    .item-card:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .item-card img {
      width: 120px;
      height: 120px;
      object-fit: cover;
      border-radius: 8px;
    }

    .item-info h3 {
      font-size: 1.25rem;
      color: #2d3748;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    .item-nutricion {
      font-size: 0.95rem;
      color: #718096;
    }

    .item-cantidad {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: #f7fafc;
      padding: 0.5rem;
      border-radius: 8px;
    }

    .btn-cantidad {
      background: white;
      border: 1px solid #e2e8f0;
      color: #4a5568;
      width: 32px;
      height: 32px;
      border-radius: 6px;
      font-size: 1.25rem;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btn-cantidad:hover {
      background: #48bb78;
      color: white;
      border-color: #48bb78;
    }

    .cantidad {
      font-size: 1.125rem;
      font-weight: 600;
      color: #2d3748;
      min-width: 30px;
      text-align: center;
    }

    .item-precio {
      text-align: right;
    }

    .item-precio .precio {
      display: block;
      font-size: 1.5rem;
      font-weight: 700;
      color: #48bb78;
      margin-bottom: 0.5rem;
    }

    .btn-eliminar {
      background: transparent;
      border: none;
      color: #e53e3e;
      cursor: pointer;
      font-size: 0.95rem;
      font-weight: 500;
      transition: color 0.2s;
    }

    .btn-eliminar:hover {
      color: #c53030;
      text-decoration: underline;
    }

    .resumen-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 100px;
    }

    .resumen-card h2 {
      font-size: 1.5rem;
      color: #2d3748;
      margin-bottom: 1.5rem;
      font-weight: 600;
    }

    .resumen-linea {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      font-size: 1.125rem;
      color: #4a5568;
    }

    .resumen-linea.total {
      font-size: 1.5rem;
      font-weight: 700;
      color: #2d3748;
    }

    .resumen-divider {
      height: 1px;
      background: #e2e8f0;
      margin: 1.5rem 0;
    }

    .btn-checkout {
      width: 100%;
      background: #48bb78;
      color: white;
      border: none;
      padding: 1rem;
      border-radius: 8px;
      font-weight: 700;
      font-size: 1.125rem;
      cursor: pointer;
      transition: all 0.2s;
      margin-bottom: 1rem;
    }

    .btn-checkout:hover {
      background: #38a169;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(72, 187, 120, 0.4);
    }

    .btn-continuar {
      width: 100%;
      background: transparent;
      color: #48bb78;
      border: 2px solid #48bb78;
      padding: 1rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-continuar:hover {
      background: #f0fdf4;
    }

    @media (max-width: 968px) {
      .carrito-content {
        grid-template-columns: 1fr;
      }

      .resumen-card {
        position: static;
      }

      .item-card {
        grid-template-columns: 100px 1fr;
        gap: 1rem;
      }

      .item-cantidad {
        grid-column: 1 / -1;
        justify-content: center;
      }

      .item-precio {
        grid-column: 1 / -1;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      }
    }
  `]
})
export class CarritoComponent implements OnInit {
  items: ItemCarrito[] = [];

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.carritoService.getItems().subscribe(items => {
      this.items = items;
    });
  }

  actualizarCantidad(item: ItemCarrito, nuevaCantidad: number) {
    if (nuevaCantidad > 0) {
      this.carritoService.actualizarCantidad(item.plato.id, nuevaCantidad);
    }
  }

  eliminarItem(platoId: number) {
    this.carritoService.eliminarDelCarrito(platoId);
  }

  getTotal(): number {
    return this.carritoService.getTotal();
  }
}
