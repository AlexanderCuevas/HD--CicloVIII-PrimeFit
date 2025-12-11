import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestauranteService, Restaurante } from '../../services/restaurante.service';
import { PlatoService, Plato } from '../../services/plato.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-restaurante-detail',
  templateUrl: './restaurante-detail.component.html',
  styleUrls: ['./restaurante-detail.component.css']
})
export class RestauranteDetailComponent implements OnInit {
  restaurante: Restaurante | null = null;
  platos: Plato[] = [];
  platosFiltrados: Plato[] = [];
  categorias: string[] = ['Todos', 'Desayuno', 'Almuerzo', 'Cena', 'Snack', 'Bebida', 'Postre'];
  categoriaSeleccionada: string = 'Todos';
  loading: boolean = true;
  mensajeCarrito: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restauranteService: RestauranteService,
    private platoService: PlatoService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.cargarRestaurante(+id);
    this.cargarPlatos(+id);
  }

  cargarRestaurante(id: number): void {
    this.restauranteService.getRestaurante(id).subscribe({
      next: (data: Restaurante) => {
        this.restaurante = data;
      },
      error: (err: any) => {
        console.error('Error al cargar restaurante:', err);
        this.router.navigate(['/restaurantes']);
      }
    });
  }

  cargarPlatos(restauranteId: number): void {
    this.platoService.getPlatosPorRestaurante(restauranteId).subscribe({
      next: (data: Plato[]) => {
        this.platos = data;
        this.aplicarFiltros();
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error al cargar platos:', err);
        this.loading = false;
      }
    });
  }

  aplicarFiltros(): void {
    if (this.categoriaSeleccionada === 'Todos') {
      this.platosFiltrados = [...this.platos];
    } else {
      this.platosFiltrados = this.platos.filter(p => p.categoria === this.categoriaSeleccionada);
    }
  }

  seleccionarCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    this.aplicarFiltros();
  }

  agregarAlCarrito(plato: Plato): void {
    if (this.restaurante) {
      this.carritoService.agregarItem(plato, this.restaurante.nombre);
      this.mensajeCarrito = `✓ ${plato.nombre} agregado al carrito`;
      setTimeout(() => this.mensajeCarrito = '', 3000);
    }
  }

  volver(): void {
    this.router.navigate(['/restaurantes']);
  }
}
