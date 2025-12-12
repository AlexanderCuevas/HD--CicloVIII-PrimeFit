import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Plato {
  id: number;
  restauranteId: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  categoria: string;
  macros: {
    calorias: number;
    proteinas: number;
    carbohidratos: number;
    grasas: number;
  };
  tags: string[];
  disponible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PlatoService {
  private apiUrl = 'http://localhost:3000/api/platos';

  constructor(private http: HttpClient) { }

  getPlatos(filtros?: any): Observable<Plato[]> {
    let queryParams = '';
    if (filtros) {
      const params = new URLSearchParams(filtros).toString();
      queryParams = params ? `?${params}` : '';
    }
    return this.http.get<Plato[]>(`${this.apiUrl}${queryParams}`);
  }

  getPlatoById(id: number): Observable<Plato> {
    return this.http.get<Plato>(`${this.apiUrl}/${id}`);
  }

  buscarPlatos(query: string): Observable<Plato[]> {
    return this.http.get<Plato[]>(`${this.apiUrl}/buscar/${query}`);
  }

  getPlatosPorRestaurante(restauranteId: number): Observable<Plato[]> {
    return this.http.get<Plato[]>(`${this.apiUrl}/restaurante/${restauranteId}`);
  }

  // Métodos para administrador
  crearPlato(platoData: any): Observable<Plato> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post<Plato>(this.apiUrl, platoData, { headers });
  }

  actualizarPlato(id: number, platoData: any): Observable<Plato> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.put<Plato>(`${this.apiUrl}/${id}`, platoData, { headers });
  }

  eliminarPlato(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
