import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestauranteService, Restaurante } from '../../services/restaurante.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  restaurantes: Restaurante[] = [];
  restaurantesFiltrados: Restaurante[] = [];
  loading = true;
  searchTerm = '';
  categoriaSeleccionada = '';

  categorias = [
    { id: 'vegano', nombre: 'Vegano', icon: '🌱' },
    { id: 'proteina', nombre: 'Alto en Proteína', icon: '💪' },
    { id: 'keto', nombre: 'Keto', icon: '🥑' },
    { id: 'balanceado', nombre: 'Balanceado', icon: '⚖️' },
    { id: 'paleo', nombre: 'Paleo', icon: '🥩' },
    { id: 'mediterraneo', nombre: 'Mediterráneo', icon: '🫒' }
  ];

  constructor(
    private restauranteService: RestauranteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarRestaurantes();
  }

  cargarRestaurantes() {
    this.restauranteService.getRestaurantes().subscribe({
      next: (data: Restaurante[]) => {
        this.restaurantes = data;
        this.restaurantesFiltrados = data;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar restaurantes:', error);
        this.loading = false;
      }
    });
  }

  buscarRestaurantes() {
    this.filtrarRestaurantes();
  }

  filtrarPorCategoria(categoria: string) {
    this.categoriaSeleccionada = this.categoriaSeleccionada === categoria ? '' : categoria;
    this.filtrarRestaurantes();
  }

  filtrarRestaurantes() {
    let resultados = this.restaurantes;

    // Filtrar por búsqueda
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      resultados = resultados.filter(r => 
        r.nombre.toLowerCase().includes(term) ||
        r.descripcion.toLowerCase().includes(term)
      );
    }

    // Filtrar por categoría
    if (this.categoriaSeleccionada) {
      resultados = resultados.filter(r => 
        r.especialidad?.toLowerCase().includes(this.categoriaSeleccionada.toLowerCase())
      );
    }

    this.restaurantesFiltrados = resultados;
  }

  verRestaurante(id: number | string) {
    this.router.navigate(['/restaurante', id]);
  }
}
