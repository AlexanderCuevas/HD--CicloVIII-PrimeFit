export interface Plato {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
  imagen: string;
  categoria: string;
}

export interface ItemCarrito {
  plato: Plato;
  cantidad: number;
}
