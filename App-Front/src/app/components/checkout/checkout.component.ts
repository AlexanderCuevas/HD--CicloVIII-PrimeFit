import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarritoService, ItemCarrito } from '../../services/carrito.service';
import { PedidoService } from '../../services/pedido.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  items: ItemCarrito[] = [];
  loading = false;
  processingPayment = false;
  showSuccess = false;
  numeroPedido = '';

  metodoPago = '';
  metodosPago = [
    { id: 'yape', nombre: 'Yape', icon: '📱', descripcion: 'Pago instantáneo con Yape' },
    { id: 'plin', nombre: 'Plin', icon: '💳', descripcion: 'Transferencia con Plin' },
    { id: 'tarjeta', nombre: 'Tarjeta', icon: '💳', descripcion: 'Débito o Crédito' },
    { id: 'contraentrega', nombre: 'Contraentrega', icon: '💵', descripcion: 'Pago en efectivo' }
  ];

  constructor(
    private fb: FormBuilder,
    private carritoService: CarritoService,
    private pedidoService: PedidoService,
    private authService: AuthService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      direccion: ['', [Validators.required, Validators.minLength(10)]],
      referencia: [''],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      notas: ['']
    });
  }

  ngOnInit() {
    // Verificar autenticación
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    // Cargar items del carrito
    this.items = this.carritoService.getItems();

    // Si no hay items, redirigir al carrito
    if (this.items.length === 0) {
      this.router.navigate(['/carrito']);
    }

    // Cargar datos del usuario
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    const usuario = this.authService.getCurrentUser();
    if (usuario) {
      this.checkoutForm.patchValue({
        telefono: usuario.telefono || '',
        direccion: usuario.direccion || ''
      });
    }
  }

  get subtotal(): number {
    return this.items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  }

  get impuestos(): number {
    return this.subtotal * 0.18;
  }

  get envio(): number {
    return this.subtotal > 50 ? 0 : 5.99;
  }

  get total(): number {
    return this.subtotal + this.impuestos + this.envio;
  }

  seleccionarMetodoPago(metodo: string) {
    this.metodoPago = metodo;
  }

  async realizarPedido() {
    if (this.checkoutForm.invalid) {
      Object.keys(this.checkoutForm.controls).forEach(key => {
        this.checkoutForm.get(key)?.markAsTouched();
      });
      return;
    }

    if (!this.metodoPago) {
      alert('Por favor selecciona un método de pago');
      return;
    }

    this.processingPayment = true;

    const pedidoData = {
      items: this.items,
      direccionEntrega: this.checkoutForm.value.direccion,
      telefono: this.checkoutForm.value.telefono,
      notas: this.checkoutForm.value.notas,
      referencia: this.checkoutForm.value.referencia,
      metodoPago: this.metodoPago,
      subtotal: this.subtotal,
      costoEnvio: this.envio,
      total: this.total
    };

    // Simular procesamiento de pago
    setTimeout(() => {
      this.pedidoService.crearPedido(pedidoData).subscribe({
        next: (response: any) => {
          this.numeroPedido = response.numeroPedido || '#' + Date.now().toString().slice(-6);
          this.processingPayment = false;
          this.showSuccess = true;
          
          // Limpiar carrito
          localStorage.removeItem('carrito');
          this.carritoService.guardarCarrito([]);
          
          // Redirigir después de 3 segundos
          setTimeout(() => {
            this.router.navigate(['/pedidos']);
          }, 3000);
        },
        error: (err: any) => {
          console.error('Error al crear pedido:', err);
          this.processingPayment = false;
          alert('Error al procesar el pedido. Intenta nuevamente.');
        }
      });
    }, 2000);
  }

  volverAlCarrito() {
    this.router.navigate(['/carrito']);
  }
}
