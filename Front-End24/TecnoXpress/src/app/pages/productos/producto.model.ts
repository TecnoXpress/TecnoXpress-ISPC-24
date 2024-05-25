// producto.model.ts
export interface Categoria {
  nombre: string;
  id_categoria_productos: string;
}

export interface Producto {
  id_productos: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  categoria: Categoria;
  precio: number;
  stock: number;
}

