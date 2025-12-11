import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

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

export interface Carrito {
  usuarioId: number;
  items: ItemCarrito[];
  total: number;
  cantidadItems: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'http://localhost:3000/api/carrito';
  private carritoSubject = new BehaviorSubject<ItemCarrito[]>([]);
  public carrito$ = this.carritoSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.loadCarrito();
  }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  loadCarrito(): void {
    // Cargar desde localStorage
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      const items = JSON.parse(carritoGuardado);
      this.carritoSubject.next(items);
    }
  }

  agregarItem(plato: any, restauranteNombre: string): void {
    const items = this.getItems();
    const existente = items.find(item => item.platoId === plato.id);

    if (existente) {
      existente.cantidad++;
    } else {
      const nuevoItem: ItemCarrito = {
        id: Date.now().toString(),
        platoId: plato.id,
        nombre: plato.nombre,
        precio: plato.precio,
        cantidad: 1,
        imagen: plato.imagen,
        restauranteNombre: restauranteNombre,
        calorias: plato.calorias,
        proteinas: plato.proteinas
      };
      items.push(nuevoItem);
    }

    this.guardarCarrito(items);
  }

  getItems(): ItemCarrito[] {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  }

  guardarCarrito(items: ItemCarrito[]): void {
    localStorage.setItem('carrito', JSON.stringify(items));
    this.carritoSubject.next(items);
  }

  getCantidadTotal(): number {
    const items = this.getItems();
    return items.reduce((total, item) => total + item.cantidad, 0);
  }

  // Métodos para cuando el usuario esté logueado (mantener compatibilidad)
  agregarItemAPI(platoId: number, cantidad: number = 1): Observable<Carrito> {
    return this.http.post<Carrito>(
      `${this.apiUrl}/items`,
      { platoId, cantidad },
      { headers: this.getHeaders() }
    ).pipe(
      tap((carrito: Carrito) => this.carritoSubject.next(carrito.items || []))
    );
  }

  actualizarCantidad(platoId: number, cantidad: number): Observable<Carrito> {
    return this.http.put<Carrito>(
      `${this.apiUrl}/items/${platoId}`,
      { cantidad },
      { headers: this.getHeaders() }
    ).pipe(
      tap((carrito: Carrito) => this.carritoSubject.next(carrito.items || []))
    );
  }

  eliminarItem(platoId: number): Observable<Carrito> {
    return this.http.delete<Carrito>(
      `${this.apiUrl}/items/${platoId}`,
      { headers: this.getHeaders() }
    ).pipe(
      tap((carrito: Carrito) => this.carritoSubject.next(carrito.items || []))
    );
  }

  vaciarCarrito(): Observable<Carrito> {
    return this.http.delete<Carrito>(
      this.apiUrl,
      { headers: this.getHeaders() }
    ).pipe(
      tap((carrito: Carrito) => this.carritoSubject.next(carrito.items || []))
    );
  }

  getCantidadItems(): number {
    const items = this.carritoSubject.value;
    return items.reduce((total, item) => total + item.cantidad, 0);
  }
}
