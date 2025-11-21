import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
          
          <!-- Si está autenticado -->
          <div *ngIf="usuarioAutenticado" class="user-menu">
            <span class="usuario-nombre">👤 {{ nombreUsuario }}</span>
            <a routerLink="/cuenta" routerLinkActive="active">Mi Cuenta</a>
          </div>

          <!-- Si no está autenticado -->
          <a *ngIf="!usuarioAutenticado" routerLink="/login" routerLinkActive="active" class="btn-login">
            Iniciar Sesión
          </a>
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

    .user-menu {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .usuario-nombre {
      color: #2d3748;
      font-weight: 600;
      font-size: 0.95rem;
    }

    .btn-login {
      background: linear-gradient(135deg, #1e3a8a 0%, #065f46 100%);
      color: white !important;
      padding: 0.75rem 1.5rem !important;
      border-radius: 8px !important;
      font-weight: 600 !important;
    }

    .btn-login:hover {
      background: linear-gradient(135deg, #1a2f70 0%, #054d37 100%) !important;
      color: white !important;
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

      .usuario-nombre {
        display: none;
      }

      .user-menu {
        gap: 0.5rem;
      }
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  totalItems = 0;
  usuarioAutenticado = false;
  nombreUsuario = '';
  private destroy$ = new Subject<void>();

  constructor(
    private carritoService: CarritoService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.carritoService.getItems().subscribe(() => {
      this.totalItems = this.carritoService.getTotalItems();
    });

    // Verificar estado de autenticación
    this.authService.usuario$
      .pipe(takeUntil(this.destroy$))
      .subscribe(usuario => {
        this.usuarioAutenticado = usuario !== null;
        this.nombreUsuario = usuario?.nombre ? usuario.nombre.split(' ')[0] : '';
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

