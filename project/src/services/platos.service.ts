import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Plato } from '../models/plato.model';

@Injectable({
  providedIn: 'root'
})
export class PlatosService {
  private platos: Plato[] = [
    {
      id: 1,
      nombre: 'Pollo al Grill con Quinoa',
      descripcion: 'Pechuga de pollo a la parrilla acompañada de quinoa orgánica y vegetales asados. Alto en proteínas y bajo en grasas.',
      precio: 12.99,
      calorias: 450,
      proteinas: 45,
      carbohidratos: 35,
      grasas: 12,
      imagen: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      categoria: 'Almuerzo'
    },
    {
      id: 2,
      nombre: 'Ensalada Proteica de Atún',
      descripcion: 'Ensalada fresca con atún, huevo cocido, aguacate, tomate cherry y aderezo ligero de limón.',
      precio: 10.99,
      calorias: 380,
      proteinas: 38,
      carbohidratos: 22,
      grasas: 18,
      imagen: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=800',
      categoria: 'Ensaladas'
    },
    {
      id: 3,
      nombre: 'Bowl de Salmón y Arroz Integral',
      descripcion: 'Salmón al horno sobre arroz integral, edamame, zanahoria rallada y salsa teriyaki light.',
      precio: 14.99,
      calorias: 520,
      proteinas: 42,
      carbohidratos: 48,
      grasas: 16,
      imagen: 'https://images.pexels.com/photos/1630309/pexels-photo-1630309.jpeg?auto=compress&cs=tinysrgb&w=800',
      categoria: 'Bowls'
    },
    {
      id: 4,
      nombre: 'Wrap de Pavo y Vegetales',
      descripcion: 'Tortilla integral rellena de pavo bajo en grasa, lechuga, tomate, pepino y hummus casero.',
      precio: 9.99,
      calorias: 340,
      proteinas: 32,
      carbohidratos: 38,
      grasas: 8,
      imagen: 'https://images.pexels.com/photos/1117862/pexels-photo-1117862.jpeg?auto=compress&cs=tinysrgb&w=800',
      categoria: 'Wraps'
    },
    {
      id: 5,
      nombre: 'Bowl Buddha Vegano',
      descripcion: 'Mezcla de garbanzos especiados, batata asada, kale, hummus y tahini. Completamente plant-based.',
      precio: 11.99,
      calorias: 410,
      proteinas: 18,
      carbohidratos: 55,
      grasas: 14,
      imagen: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=800',
      categoria: 'Vegano'
    },
    {
      id: 6,
      nombre: 'Filete de Res Magra con Brócoli',
      descripcion: 'Filete de res magra acompañado de brócoli al vapor y puré de coliflor. Alto contenido proteico.',
      precio: 15.99,
      calorias: 480,
      proteinas: 52,
      carbohidratos: 28,
      grasas: 16,
      imagen: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=800',
      categoria: 'Cena'
    },
    {
      id: 7,
      nombre: 'Bowl de Yogur Griego y Frutas',
      descripcion: 'Yogur griego natural con granola sin azúcar, fresas, arándanos y miel orgánica.',
      precio: 7.99,
      calorias: 280,
      proteinas: 22,
      carbohidratos: 35,
      grasas: 6,
      imagen: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=800',
      categoria: 'Desayuno'
    },
    {
      id: 8,
      nombre: 'Pasta Integral con Camarones',
      descripcion: 'Pasta de trigo integral con camarones salteados, espinaca fresca, ajo y aceite de oliva.',
      precio: 13.99,
      calorias: 465,
      proteinas: 36,
      carbohidratos: 52,
      grasas: 12,
      imagen: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800',
      categoria: 'Pasta'
    }
  ];

  private platosSubject = new BehaviorSubject<Plato[]>(this.platos);

  getPlatos(): Observable<Plato[]> {
    return this.platosSubject.asObservable();
  }

  getPlatoById(id: number): Plato | undefined {
    return this.platos.find(plato => plato.id === id);
  }
}
