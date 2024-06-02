// producto.model.ts
export interface Categoria {
  nombre: string;
  id_categoria_productos: string;
}

export interface Producto {
<<<<<<< HEAD
  id: number;
=======
  id: string;
>>>>>>> 9c515867649aec1bf9e52c4fa078f74681cca1c7
  nombre: string;
  descripcion: string;
  imagen: string;
  categoria: Categoria;
  precio: number;
  stock: number;
  cantidad:number;
}

