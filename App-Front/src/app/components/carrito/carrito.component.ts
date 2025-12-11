import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';

export interface ItemCarrito {
  id: string;
  platoId: string;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen: string;
  restauranteNombre: string;
  calorias?: number;
  proteinas?: number;
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  items: ItemCarrito[] = [];
  loading = false;
  showLoginPrompt = false;

  constructor(
    private carritoService: CarritoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarCarrito();
  }

  cargarCarrito() {
    // Cargar desde localStorage
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.items = JSON.parse(carritoGuardado);
    }
  }

  get subtotal(): number {
    return this.items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  }

  get impuestos(): number {
    return this.subtotal * 0.18; // 18% IGV
  }

  get envio(): number {
    return this.subtotal > 50 ? 0 : 5.99;
  }

  get total(): number {
    return this.subtotal + this.impuestos + this.envio;
  }

  get totalItems(): number {
    return this.items.reduce((sum, item) => sum + item.cantidad, 0);
  }

  aumentarCantidad(item: ItemCarrito) {
    item.cantidad++;
    this.guardarCarrito();
  }

  disminuirCantidad(item: ItemCarrito) {
    if (item.cantidad > 1) {
      item.cantidad--;
      this.guardarCarrito();
    }
  }

  eliminarItem(index: number) {
    this.items.splice(index, 1);
    this.guardarCarrito();
  }

  vaciarCarrito() {
    if (confirm('¿Estás seguro de vaciar el carrito?')) {
      this.items = [];
      this.guardarCarrito();
    }
  }

  guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.items));
  }

  procederAlPago() {
    // Verificar si está logueado
    if (this.authService.isLoggedIn()) {
      // Ir al checkout
      this.router.navigate(['/checkout']);
    } else {
      // Mostrar prompt de login
      this.showLoginPrompt = true;
    }
  }

  continuarComprando() {
    this.router.navigate(['/']);
  }

  irALogin() {
    this.router.navigate(['/login']);
  }

  cerrarPrompt() {
    this.showLoginPrompt = false;
  }
}
