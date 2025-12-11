import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Restaurante {
  id: number;
  nombre: string;
  descripcion: string;
  especialidad: string;
  logo: string;
  banner: string;
  calificacion: number;
  tiempoEntrega: string;
  costoEnvio: number;
  activo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {
  private apiUrl = 'http://localhost:3000/api/restaurantes';

  constructor(private http: HttpClient) { }

  getRestaurantes(filtros?: any): Observable<Restaurante[]> {
    let queryParams = '';
    if (filtros) {
      const params = new URLSearchParams(filtros).toString();
      queryParams = params ? `?${params}` : '';
    }
    return this.http.get<Restaurante[]>(`${this.apiUrl}${queryParams}`);
  }

  getRestauranteById(id: number): Observable<Restaurante> {
    return this.http.get<Restaurante>(`${this.apiUrl}/${id}`);
  }

  getRestaurante(id: number): Observable<Restaurante> {
    return this.http.get<Restaurante>(`${this.apiUrl}/${id}`);
  }
}
