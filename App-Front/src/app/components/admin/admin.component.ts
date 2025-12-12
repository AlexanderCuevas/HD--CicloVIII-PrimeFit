import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PedidoService } from '../../services/pedido.service';
import { PlatoService } from '../../services/plato.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  vistaActual = 'pedidos'; // 'pedidos' o 'platos'
  pedidos: any[] = [];
  loading = false;

  // Formulario de nuevo plato
  nuevoPlato = {
    nombre: '',
    descripcion: '',
    precio: 0,
    restauranteId: 1,
    imagen: '',
    categoria: '',
    disponible: true,
    macros: {
      calorias: 0,
      proteinas: 0,
      carbohidratos: 0,
      grasas: 0
    },
    etiquetas: [] as string[]
  };

  etiquetasDisponibles = [
    'Vegano',
    'Vegetariano',
    'Sin Gluten',
    'Bajo en Calorías',
    'Alto en Proteínas',
    'Keto',
    'Paleo',
    'Sin Lácteos',
    'Orgánico'
  ];

  constructor(
    private authService: AuthService,
    private pedidoService: PedidoService,
    private platoService: PlatoService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (!user || (user.role !== 'admin' && user.role !== 'restaurant_admin')) {
      alert('Acceso denegado. Solo administradores.');
      this.router.navigate(['/']);
      return;
    }
    
    // Si es restaurant_admin, usar su restauranteId
    if (user.role === 'restaurant_admin' && user.restauranteId) {
      this.nuevoPlato.restauranteId = user.restauranteId;
    }
    
    this.cargarPedidos();
  }

  cambiarVista(vista: string) {
    this.vistaActual = vista;
    if (vista === 'pedidos') {
      this.cargarPedidos();
    }
  }

  cargarPedidos() {
    this.loading = true;
    this.pedidoService.obtenerTodosPedidos().subscribe({
      next: (data: any) => {
        this.pedidos = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error al cargar pedidos:', err);
        this.loading = false;
      }
    });
  }

  cambiarEstadoPedido(pedidoId: number, nuevoEstado: string) {
    if (!confirm(`¿Cambiar estado del pedido #${pedidoId} a "${nuevoEstado}"?`)) {
      return;
    }

    this.pedidoService.actualizarEstadoPedido(pedidoId, nuevoEstado).subscribe({
      next: () => {
        alert('Estado actualizado correctamente');
        this.cargarPedidos();
      },
      error: (err: any) => {
        alert('Error al actualizar estado: ' + err.error.error);
      }
    });
  }

  toggleEtiqueta(etiqueta: string) {
    const index = this.nuevoPlato.etiquetas.indexOf(etiqueta);
    if (index > -1) {
      this.nuevoPlato.etiquetas.splice(index, 1);
    } else {
      this.nuevoPlato.etiquetas.push(etiqueta);
    }
  }

  tieneEtiqueta(etiqueta: string): boolean {
    return this.nuevoPlato.etiquetas.includes(etiqueta);
  }

  agregarPlato() {
    if (!this.nuevoPlato.nombre || !this.nuevoPlato.descripcion || this.nuevoPlato.precio <= 0) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    this.loading = true;
    this.platoService.crearPlato(this.nuevoPlato).subscribe({
      next: (response: any) => {
        alert('Plato agregado correctamente');
        this.limpiarFormulario();
        this.loading = false;
      },
      error: (err: any) => {
        alert('Error al agregar plato: ' + err.error.error);
        this.loading = false;
      }
    });
  }

  limpiarFormulario() {
    const user = this.authService.getCurrentUser();
    const restauranteId = (user?.role === 'restaurant_admin' && user.restauranteId) 
      ? user.restauranteId 
      : 1;
      
    this.nuevoPlato = {
      nombre: '',
      descripcion: '',
      precio: 0,
      restauranteId: restauranteId,
      imagen: '',
      categoria: '',
      disponible: true,
      macros: {
        calorias: 0,
        proteinas: 0,
        carbohidratos: 0,
        grasas: 0
      },
      etiquetas: []
    };
  }

  getEstadoClass(estado: string): string {
    const classes: any = {
      'pendiente': 'badge-warning',
      'confirmado': 'badge-info',
      'preparando': 'badge-primary',
      'en_camino': 'badge-success',
      'entregado': 'badge-success',
      'cancelado': 'badge-danger'
    };
    return classes[estado] || 'badge-secondary';
  }

  formatearFecha(fecha: string): string {
    if (!fecha) return 'N/A';
    const date = new Date(fecha);
    if (isNaN(date.getTime())) return 'N/A';
    return date.toLocaleString('es-ES');
  }
}
