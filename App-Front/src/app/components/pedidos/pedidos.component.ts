import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { AuthService } from '../../services/auth.service';

export interface Pedido {
  id: string;
  numeroPedido: string;
  fecha: string;
  estado: 'pendiente' | 'preparando' | 'en-camino' | 'entregado' | 'cancelado';
  items: any[];
  total: number;
  metodoPago: string;
  direccion: string;
}

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  loading = true;
  filtroEstado = 'todos';
  
  estados = [
    { id: 'todos', nombre: 'Todos los Pedidos', icon: '📦' },
    { id: 'pendiente', nombre: 'Pendiente', icon: '⏳' },
    { id: 'preparando', nombre: 'Preparando', icon: '👨‍🍳' },
    { id: 'en-camino', nombre: 'En Camino', icon: '🚚' },
    { id: 'entregado', nombre: 'Entregado', icon: '✅' },
    { id: 'cancelado', nombre: 'Cancelado', icon: '❌' }
  ];

  constructor(
    private pedidoService: PedidoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.pedidoService.getPedidos().subscribe({
      next: (data: any) => {
        // Mapear los pedidos del backend al formato esperado
        this.pedidos = data.map((pedido: any) => ({
          id: pedido.id.toString(),
          numeroPedido: `#${pedido.id.toString().padStart(6, '0')}`,
          fecha: pedido.fechaPedido, // Usar fechaPedido del backend
          estado: pedido.estado,
          items: pedido.items || [],
          total: pedido.total,
          metodoPago: pedido.metodoPago || 'contraentrega',
          direccion: pedido.direccionEntrega
        }));
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error al cargar pedidos:', err);
        this.loading = false;
        // No cargar pedidos demo si hay error, dejar vacío
        this.pedidos = [];
      }
    });
  }

  cargarPedidosDemo() {
    // Pedidos de ejemplo para demo
    this.pedidos = [
      {
        id: '1',
        numeroPedido: '#ORD001',
        fecha: new Date().toISOString(),
        estado: 'preparando',
        items: [
          { nombre: 'Bowl de Pollo a la Parrilla', cantidad: 2, precio: 12.99 },
          { nombre: 'Ensalada de Quinoa', cantidad: 1, precio: 9.99 }
        ],
        total: 35.97,
        metodoPago: 'yape',
        direccion: 'Av. Principal 123, Miraflores'
      },
      {
        id: '2',
        numeroPedido: '#ORD002',
        fecha: new Date(Date.now() - 86400000).toISOString(),
        estado: 'entregado',
        items: [
          { nombre: 'Salmón Teriyaki', cantidad: 1, precio: 15.99 }
        ],
        total: 18.99,
        metodoPago: 'tarjeta',
        direccion: 'Calle Los Olivos 456, San Isidro'
      }
    ];
    this.loading = false;
  }

  get pedidosFiltrados(): Pedido[] {
    if (this.filtroEstado === 'todos') {
      return this.pedidos;
    }
    return this.pedidos.filter(p => p.estado === this.filtroEstado);
  }

  filtrarPorEstado(estado: string) {
    this.filtroEstado = estado;
  }

  getEstadoClass(estado: string): string {
    const classes: any = {
      'pendiente': 'warning',
      'preparando': 'info',
      'en-camino': 'primary',
      'entregado': 'success',
      'cancelado': 'danger'
    };
    return classes[estado] || '';
  }

  getEstadoNombre(estado: string): string {
    const nombres: any = {
      'pendiente': 'Pendiente',
      'preparando': 'Preparando',
      'en-camino': 'En Camino',
      'entregado': 'Entregado',
      'cancelado': 'Cancelado'
    };
    return nombres[estado] || estado;
  }

  verDetalle(pedido: Pedido) {
    // Implementar vista de detalle
    console.log('Ver detalle del pedido:', pedido);
  }

  repetirPedido(pedido: Pedido) {
    // Agregar items al carrito
    console.log('Repetir pedido:', pedido);
    alert('¡Artículos agregados al carrito!');
  }

  formatearFecha(fecha: string): string {
    if (!fecha) return 'Fecha no disponible';
    
    const date = new Date(fecha);
    
    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
      return 'Fecha no disponible';
    }
    
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
