import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemCarrito, Plato } from '../models/plato.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private items: ItemCarrito[] = [];
  private itemsSubject = new BehaviorSubject<ItemCarrito[]>(this.items);

  getItems(): Observable<ItemCarrito[]> {
    return this.itemsSubject.asObservable();
  }

  agregarAlCarrito(plato: Plato): void {
    const itemExistente = this.items.find(item => item.plato.id === plato.id);

    if (itemExistente) {
      itemExistente.cantidad++;
    } else {
      this.items.push({ plato, cantidad: 1 });
    }

    this.itemsSubject.next(this.items);
  }

  eliminarDelCarrito(platoId: number): void {
    this.items = this.items.filter(item => item.plato.id !== platoId);
    this.itemsSubject.next(this.items);
  }

  actualizarCantidad(platoId: number, cantidad: number): void {
    const item = this.items.find(item => item.plato.id === platoId);
    if (item && cantidad > 0) {
      item.cantidad = cantidad;
      this.itemsSubject.next(this.items);
    }
  }

  limpiarCarrito(): void {
    this.items = [];
    this.itemsSubject.next(this.items);
  }

  getTotalItems(): number {
    return this.items.reduce((total, item) => total + item.cantidad, 0);
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + (item.plato.precio * item.cantidad), 0);
  }
}
