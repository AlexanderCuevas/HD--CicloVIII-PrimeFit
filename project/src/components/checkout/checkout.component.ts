import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { ItemCarrito } from '../../models/plato.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="checkout-container">
      <div class="checkout-content" *ngIf="items.length > 0">
        <div class="formulario-section">
          <h1>Finalizar Pedido</h1>

          <form class="checkout-form" (ngSubmit)="procesarPedido()">
            <div class="form-section">
              <h2>Información de Contacto</h2>
              <div class="form-group">
                <label for="nombre">Nombre Completo</label>
                <input
                  type="text"
                  id="nombre"
                  [(ngModel)]="datosCheckout.nombre"
                  name="nombre"
                  placeholder="Juan Pérez"
                  required
                >
              </div>

              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  [(ngModel)]="datosCheckout.email"
                  name="email"
                  placeholder="juan@ejemplo.com"
                  required
                >
              </div>

              <div class="form-group">
                <label for="telefono">Teléfono</label>
                <input
                  type="tel"
                  id="telefono"
                  [(ngModel)]="datosCheckout.telefono"
                  name="telefono"
                  placeholder="+34 600 000 000"
                  required
                >
              </div>
            </div>

            <div class="form-section">
              <h2>Dirección de Entrega</h2>
              <div class="form-group">
                <label for="direccion">Calle y Número</label>
                <input
                  type="text"
                  id="direccion"
                  [(ngModel)]="datosCheckout.direccion"
                  name="direccion"
                  placeholder="Calle Principal 123"
                  required
                >
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="ciudad">Ciudad</label>
                  <input
                    type="text"
                    id="ciudad"
                    [(ngModel)]="datosCheckout.ciudad"
                    name="ciudad"
                    placeholder="Madrid"
                    required
                  >
                </div>

                <div class="form-group">
                  <label for="codigoPostal">Código Postal</label>
                  <input
                    type="text"
                    id="codigoPostal"
                    [(ngModel)]="datosCheckout.codigoPostal"
                    name="codigoPostal"
                    placeholder="28001"
                    required
                  >
                </div>
              </div>

              <div class="form-group">
                <label for="notas">Notas de Entrega (Opcional)</label>
                <textarea
                  id="notas"
                  [(ngModel)]="datosCheckout.notas"
                  name="notas"
                  placeholder="Indicaciones adicionales para la entrega..."
                  rows="3"
                ></textarea>
              </div>
            </div>

            <div class="form-section">
              <h2>Método de Pago</h2>
              <div class="metodos-pago">
                <label class="metodo-pago-item">
                  <input
                    type="radio"
                    name="metodoPago"
                    value="tarjeta"
                    [(ngModel)]="datosCheckout.metodoPago"
                    required
                  >
                  <span class="metodo-label">Tarjeta de Crédito/Débito</span>
                </label>

                <label class="metodo-pago-item">
                  <input
                    type="radio"
                    name="metodoPago"
                    value="efectivo"
                    [(ngModel)]="datosCheckout.metodoPago"
                  >
                  <span class="metodo-label">Efectivo en Entrega</span>
                </label>
              </div>

              <div class="tarjeta-info" *ngIf="datosCheckout.metodoPago === 'tarjeta'">
                <div class="form-group">
                  <label for="numeroTarjeta">Número de Tarjeta</label>
                  <input
                    type="text"
                    id="numeroTarjeta"
                    placeholder="1234 5678 9012 3456"
                    maxlength="19"
                  >
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label for="expiracion">Expiración</label>
                    <input
                      type="text"
                      id="expiracion"
                      placeholder="MM/AA"
                      maxlength="5"
                    >
                  </div>

                  <div class="form-group">
                    <label for="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      placeholder="123"
                      maxlength="3"
                    >
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" class="btn-confirmar">
              Confirmar Pedido - \${{ getTotal().toFixed(2) }}
            </button>
          </form>
        </div>

        <div class="resumen-section">
          <div class="resumen-sticky">
            <h2>Resumen del Pedido</h2>

            <div class="items-resumen">
              <div class="item-resumen" *ngFor="let item of items">
                <img [src]="item.plato.imagen" [alt]="item.plato.nombre">
                <div class="item-resumen-info">
                  <span class="item-nombre">{{ item.plato.nombre }}</span>
                  <span class="item-cantidad">Cantidad: {{ item.cantidad }}</span>
                </div>
                <span class="item-precio">\${{ (item.plato.precio * item.cantidad).toFixed(2) }}</span>
              </div>
            </div>

            <div class="resumen-divider"></div>

            <div class="resumen-linea">
              <span>Subtotal</span>
              <span>\${{ getTotal().toFixed(2) }}</span>
            </div>

            <div class="resumen-linea">
              <span>Envío</span>
              <span class="envio-gratis">Gratis</span>
            </div>

            <div class="resumen-divider"></div>

            <div class="resumen-linea total">
              <span>Total</span>
              <span>\${{ getTotal().toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="checkout-vacio" *ngIf="items.length === 0">
        <h2>No hay artículos en tu carrito</h2>
        <button class="btn-menu" routerLink="/">Ver Menú</button>
      </div>
    </div>
  `,
  styles: [`
    .checkout-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
    }

    .checkout-content {
      display: grid;
      grid-template-columns: 1fr 450px;
      gap: 3rem;
      align-items: start;
    }

    .formulario-section h1 {
      font-size: 2.5rem;
      color: #2d3748;
      margin-bottom: 2rem;
      font-weight: 700;
    }

    .checkout-form {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .form-section {
      margin-bottom: 2.5rem;
    }

    .form-section:last-of-type {
      margin-bottom: 0;
    }

    .form-section h2 {
      font-size: 1.5rem;
      color: #2d3748;
      margin-bottom: 1.5rem;
      font-weight: 600;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      font-weight: 600;
      color: #4a5568;
      margin-bottom: 0.5rem;
      font-size: 0.95rem;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 0.875rem;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.2s;
      font-family: inherit;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #48bb78;
      box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.1);
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .metodos-pago {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .metodo-pago-item {
      display: flex;
      align-items: center;
      padding: 1.25rem;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .metodo-pago-item:hover {
      border-color: #48bb78;
      background: #f7fafc;
    }

    .metodo-pago-item input[type="radio"] {
      width: 20px;
      height: 20px;
      margin-right: 1rem;
      accent-color: #48bb78;
      cursor: pointer;
    }

    .metodo-label {
      font-size: 1.125rem;
      color: #2d3748;
      font-weight: 500;
    }

    .tarjeta-info {
      background: #f7fafc;
      padding: 1.5rem;
      border-radius: 8px;
      margin-top: 1rem;
    }

    .btn-confirmar {
      width: 100%;
      background: #48bb78;
      color: white;
      border: none;
      padding: 1.25rem;
      border-radius: 8px;
      font-weight: 700;
      font-size: 1.25rem;
      cursor: pointer;
      transition: all 0.2s;
      margin-top: 2rem;
    }

    .btn-confirmar:hover {
      background: #38a169;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(72, 187, 120, 0.4);
    }

    .resumen-section {
      position: sticky;
      top: 100px;
    }

    .resumen-sticky {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .resumen-sticky h2 {
      font-size: 1.5rem;
      color: #2d3748;
      margin-bottom: 1.5rem;
      font-weight: 600;
    }

    .items-resumen {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .item-resumen {
      display: grid;
      grid-template-columns: 60px 1fr auto;
      gap: 1rem;
      align-items: center;
    }

    .item-resumen img {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 6px;
    }

    .item-resumen-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .item-nombre {
      font-size: 0.95rem;
      color: #2d3748;
      font-weight: 600;
    }

    .item-cantidad {
      font-size: 0.875rem;
      color: #718096;
    }

    .item-precio {
      font-size: 1rem;
      font-weight: 700;
      color: #48bb78;
    }

    .resumen-divider {
      height: 1px;
      background: #e2e8f0;
      margin: 1.5rem 0;
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

    .envio-gratis {
      color: #48bb78;
      font-weight: 600;
    }

    .checkout-vacio {
      text-align: center;
      padding: 4rem 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .checkout-vacio h2 {
      font-size: 1.75rem;
      color: #2d3748;
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

    @media (max-width: 1100px) {
      .checkout-content {
        grid-template-columns: 1fr;
      }

      .resumen-section {
        position: static;
      }
    }

    @media (max-width: 640px) {
      .checkout-container {
        padding: 1rem;
      }

      .formulario-section h1 {
        font-size: 2rem;
      }

      .checkout-form {
        padding: 1.5rem;
      }

      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CheckoutComponent implements OnInit {
  items: ItemCarrito[] = [];

  datosCheckout = {
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    notas: '',
    metodoPago: 'tarjeta'
  };

  constructor(
    private carritoService: CarritoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carritoService.getItems().subscribe(items => {
      this.items = items;
    });
  }

  getTotal(): number {
    return this.carritoService.getTotal();
  }

  procesarPedido() {
    alert('¡Pedido confirmado! Gracias por tu compra. En una aplicación real, aquí se procesaría el pago.');
    this.carritoService.limpiarCarrito();
    this.router.navigate(['/']);
  }
}
