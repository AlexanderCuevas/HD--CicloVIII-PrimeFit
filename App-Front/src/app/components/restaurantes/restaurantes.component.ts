import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestauranteService, Restaurante } from '../../services/restaurante.service';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css']
})
export class RestaurantesComponent implements OnInit {
  restaurantes: Restaurante[] = [];
  restaurantesFiltrados: Restaurante[] = [];
  categorias: string[] = ['Todas', 'Vegano', 'Alto en Proteína', 'Keto', 'Balanced', 'Low Calorie', 'Paleo', 'Detox', 'Mediterránea', 'Ensaladas', 'Asiática Saludable'];
  categoriaSeleccionada: string = 'Todas';
  searchTerm: string = '';
  ordenamiento: string = 'calificacion';
  loading: boolean = true;

  constructor(
    private restauranteService: RestauranteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarRestaurantes();
  }

  cargarRestaurantes(): void {
    this.loading = true;
    this.restauranteService.getRestaurantes().subscribe({
      next: (data) => {
        this.restaurantes = data;
        this.aplicarFiltros();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar restaurantes:', err);
        this.loading = false;
      }
    });
  }

  aplicarFiltros(): void {
    let resultado = [...this.restaurantes];

    // Filtrar por categoría
    if (this.categoriaSeleccionada !== 'Todas') {
      resultado = resultado.filter(r => r.especialidad === this.categoriaSeleccionada);
    }

    // Filtrar por búsqueda
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      resultado = resultado.filter(r =>
        r.nombre.toLowerCase().includes(term) ||
        r.descripcion.toLowerCase().includes(term) ||
        r.especialidad.toLowerCase().includes(term)
      );
    }

    // Ordenar
    switch (this.ordenamiento) {
      case 'calificacion':
        resultado.sort((a, b) => b.calificacion - a.calificacion);
        break;
      case 'tiempo':
        resultado.sort((a, b) => {
          const tiempoA = parseInt(a.tiempoEntrega.split('-')[0]);
          const tiempoB = parseInt(b.tiempoEntrega.split('-')[0]);
          return tiempoA - tiempoB;
        });
        break;
      case 'envio':
        resultado.sort((a, b) => a.costoEnvio - b.costoEnvio);
        break;
    }

    this.restaurantesFiltrados = resultado;
  }

  seleccionarCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    this.aplicarFiltros();
  }

  onSearchChange(): void {
    this.aplicarFiltros();
  }

  onOrdenamientoChange(): void {
    this.aplicarFiltros();
  }

  verRestaurante(id: number): void {
    this.router.navigate(['/restaurante', id]);
  }
}
