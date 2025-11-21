import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id?: string;
  nombre: string;
  email: string;
  telefono?: string;
  direccion?: string;
  ciudad?: string;
}

export interface Pedido {
  id: string;
  fecha: string;
  total: number;
  estado: string;
  items: any[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActual = new BehaviorSubject<User | null>(this.obtenerUsuarioGuardado());
  public usuario$ = this.usuarioActual.asObservable();
  
  private pedidosUser = new BehaviorSubject<Pedido[]>([]);
  public pedidos$ = this.pedidosUser.asObservable();

  constructor() {
    this.cargarPedidosDelUsuario();
  }

  private obtenerUsuarioGuardado(): User | null {
    if (typeof localStorage !== 'undefined') {
      const userData = localStorage.getItem('usuarioActual');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  login(email: string, password: string): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        // Simulación de autenticación
        if (email && password.length >= 6) {
          // En producción, esto sería una llamada HTTP a tu backend
          const usuario: User = {
            id: '1',
            nombre: 'Usuario Demo',
            email: email,
            telefono: '+57 312 123 4567',
            direccion: 'Calle Principal 123',
            ciudad: 'Bogotá'
          };
          localStorage.setItem('usuarioActual', JSON.stringify(usuario));
          localStorage.setItem('token', 'token_demo_' + Date.now());
          this.usuarioActual.next(usuario);
          this.cargarPedidosDelUsuario();
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      }, 1000);
    });
  }

  registrar(userData: User, password: string): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        // Validación básica
        if (userData.email && userData.nombre && password.length >= 6) {
          const nuevoUsuario: User = {
            id: Date.now().toString(),
            ...userData
          };
          localStorage.setItem('usuarioActual', JSON.stringify(nuevoUsuario));
          localStorage.setItem('token', 'token_demo_' + Date.now());
          this.usuarioActual.next(nuevoUsuario);
          this.cargarPedidosDelUsuario();
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      }, 1000);
    });
  }

  logout(): void {
    localStorage.removeItem('usuarioActual');
    localStorage.removeItem('token');
    this.usuarioActual.next(null);
    this.pedidosUser.next([]);
  }

  obtenerUsuarioActual(): User | null {
    return this.usuarioActual.value;
  }

  estaAutenticado(): boolean {
    return this.usuarioActual.value !== null;
  }

  actualizarPerfil(usuario: User): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        localStorage.setItem('usuarioActual', JSON.stringify(usuario));
        this.usuarioActual.next(usuario);
        observer.next(true);
        observer.complete();
      }, 500);
    });
  }

  private cargarPedidosDelUsuario(): void {
    // Simulación de carga de pedidos del usuario
    const usuarioActual = this.usuarioActual.value;
    if (usuarioActual) {
      const pedidosSimulados: Pedido[] = [
        {
          id: '001',
          fecha: '2025-11-15',
          total: 45.99,
          estado: 'Entregado',
          items: [
            { nombre: 'Pizza Margherita', cantidad: 2, precio: 12.99 },
            { nombre: 'Bebida Gaseosa', cantidad: 1, precio: 3.99 }
          ]
        },
        {
          id: '002',
          fecha: '2025-11-10',
          total: 32.50,
          estado: 'Entregado',
          items: [
            { nombre: 'Hamburguesa Premium', cantidad: 1, precio: 15.99 },
            { nombre: 'Papas Fritas', cantidad: 1, precio: 4.99 },
            { nombre: 'Cerveza Artesanal', cantidad: 2, precio: 5.99 }
          ]
        },
        {
          id: '003',
          fecha: '2025-11-08',
          total: 28.75,
          estado: 'En Preparación',
          items: [
            { nombre: 'Ensalada Chef', cantidad: 1, precio: 10.99 },
            { nombre: 'Postre Chocolate', cantidad: 2, precio: 8.99 }
          ]
        }
      ];
      this.pedidosUser.next(pedidosSimulados);
    }
  }

  obtenerPedidos(): Pedido[] {
    return this.pedidosUser.value;
  }
}
