import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Pedido {
  id: number;
  usuarioId: number;
  items: any[];
  subtotal: number;
  costoEnvio: number;
  total: number;
  direccionEntrega: string;
  estado: string;
  fechaPedido: string;
  fechaActualizacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:3000/api/pedidos';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  crearPedido(pedidoData: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl,
      pedidoData,
      { headers: this.getHeaders() }
    );
  }

  getMisPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(
      `${this.apiUrl}/mis-pedidos`,
      { headers: this.getHeaders() }
    );
  }

  getPedidos(): Observable<Pedido[]> {
    return this.getMisPedidos();
  }

  getPedidoById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(
      `${this.apiUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }

  cancelarPedido(id: number): Observable<Pedido> {
    return this.http.post<Pedido>(
      `${this.apiUrl}/${id}/cancelar`,
      {},
      { headers: this.getHeaders() }
    );
  }

  // Métodos para administrador
  obtenerTodosPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(
      `${this.apiUrl}/todos`,
      { headers: this.getHeaders() }
    );
  }

  actualizarEstadoPedido(id: number, estado: string): Observable<Pedido> {
    return this.http.patch<Pedido>(
      `${this.apiUrl}/${id}/estado`,
      { estado },
      { headers: this.getHeaders() }
    );
  }
}
