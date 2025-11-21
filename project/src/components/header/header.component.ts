import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="container">
        <div class="logo" routerLink="/">
          <img src="assets/logo.png" alt="PrimeFit Logo" class="logo-image">
        </div>

        <nav class="nav">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Menú</a>
          <a routerLink="/carrito" routerLinkActive="active" class="cart-link">
            Carrito
            <span class="cart-badge" *ngIf="totalItems > 0">{{ totalItems }}</span>
          </a>
          <a routerLink="/cuenta" routerLinkActive="active">Cuenta</a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: #fff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      cursor: pointer;
    }

    .logo-image {
      width: 170px;
      height: auto;
    }

    .nav {
      display: flex;
      gap: 2rem;
      align-items: center;
    }

    .nav a {
      text-decoration: none;
      color: #4a5568;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      transition: all 0.2s;
      position: relative;
    }

    .nav a:hover {
      color: #48bb78;
      background: #f7fafc;
    }

    .nav a.active {
      color: #48bb78;
    }

    .cart-link {
      position: relative;
    }

    .cart-badge {
      position: absolute;
      top: 0;
      right: 0;
      background: #48bb78;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .container {
        padding: 1rem;
      }

      .nav {
        gap: 1rem;
      }

      .nav a {
        padding: 0.5rem;
        font-size: 0.9rem;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  totalItems = 0;

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.carritoService.getItems().subscribe(() => {
      this.totalItems = this.carritoService.getTotalItems();
    });
  }
}
