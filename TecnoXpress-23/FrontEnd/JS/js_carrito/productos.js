// Mouse
const productos = [
    // 
    {
        id_productos: "01",
        nombre: "Mouse 01",
        descripcion: "texto desscripcion del producto, texto desscripcion del producto, texto desscripcion del producto.",
        imagen: "./media/mouse/01.webp",
        categoria: {
            nombre: "Mouses",
            id_categoria_productos: "01"
        },
        precio: 1000,
        stock: 15
    },
    {
        id_productos: "02",
        nombre: "Mouse 02",
        descripcion: "texto desscripcion del producto, texto desscripcion del producto, texto desscripcion del producto.",
        imagen: "./media/mouse/02.webp",
        categoria: {
            nombre: "Mouses",
            id_categoria_productos: "01"
        },
        precio: 1000,
        stock: 15
    },
    {
        id_productos: "03",
        nombre: "Mouse 03",
        descripcion: "texto desscripcion del producto, texto desscripcion del producto, texto desscripcion del producto.",
        imagen: "./media/mouse/03.webp",
        categoria: {
            nombre: "Mouses",
            id_categoria_productos: "01"
        },
        precio: 1000,
        stock: 15
    },
    {
        id_productos: "04",
        nombre: "Mouse 04",
        descripcion: "texto desscripcion del producto, texto desscripcion del producto, texto desscripcion del producto.",
        imagen: "./media/mouse/04.webp",
        categoria: {
            nombre: "Mouses",
            id_categoria_productos: "01"
        },
        precio: 1000,
        stock: 15
    },
    {
        id_productos: "05",
        nombre: "Mouse 05",
        descripcion: "texto desscripcion del producto, texto desscripcion del producto, texto desscripcion del producto.",
        imagen: "./media/mouse/05.webp",
        categoria: {
            nombre: "Mouses",
            id_categoria_productos: "01"
        },
        precio: 1000,
        stock: 15
    },
    // Monitores
    {
        id_productos: "06",
        nombre: "Monitores 01",
        descripcion: "texto desscripcion del producto, texto desscripcion del producto, texto desscripcion del producto.",
        imagen: "./media/monitores/01.webp",
        categoria: {
            nombre: "Monitores",
            id_categoria_productos: "02"
        },
        precio: 1000,
        stock: 15
    },
    {
        id_productos: "07",
        nombre: "Monitores 02",
        descripcion: "texto desscripcion del producto, texto desscripcion del producto, texto desscripcion del producto.",
        imagen: "./media/monitores/02.webp",
        categoria: {
            nombre: "Monitores",
            id_categoria_productos: "02"
        },
        precio: 1000,
        stock: 15
    },
    {
        id_productos: "08",
        nombre: "Monitores 03",
        descripcion: "texto desscripcion del producto, texto desscripcion del producto, texto desscripcion del producto.",
        imagen: "./media/monitores/03.webp",
        categoria: {
            nombre: "Monitores",
            id_categoria_productos: "02"
        },
        precio: 1000,
        stock: 15
    },
    {
        id_productos: "09",
        nombre: "Monitores 04",
        descripcion: "texto desscripcion del producto, texto desscripcion del producto, texto desscripcion del producto.",
        imagen: "./media/monitores/04.webp",
        categoria: {
            nombre: "Monitores",
            id_categoria_productos: "02"
        },
        precio: 1000,
        stock: 15
    },
    {
        id_productos: "10",
        nombre: "Monitores 05",
        descripcion: "texto desscripcion del producto, texto desscripcion del producto, texto desscripcion del producto.",
        imagen: "./media/monitores/05.webp",
        categoria: {
            nombre: "Monitores",
            id_categoria_productos: "02"
        },
        precio: 1000,
        stock: 15
    },
    {
        id_productos: "11",
        nombre: "Monitores 06",
        descripcion: "texto desscripcion del producto, texto desscripcion del producto, texto desscripcion del producto.",
        imagen: "./media/monitores/06.webp",
        categoria: {
            nombre: "Monitores",
            id_categoria_productos: "02"
        },
        precio: 1000,
        stock: 15
    },
    {
        id_productos: "12",
        nombre: "Monitores 07",
        descripcion: "texto desscripcion del producto, texto desscripcion del producto, texto desscripcion del producto.",
        imagen: "./media/monitores/07.webp",
        categoria: {
            nombre: "Monitores",
            id_categoria_productos: "02"
        },
        precio: 1000,
        stock: 15
    },
    {
        id_productos: "13",
        nombre: "Monitores 08",
        descripcion: "texto desscripcion del producto, texto desscripcion del producto, texto desscripcion del producto.",
        imagen: "./media/monitores/08.webp",
        categoria: {
            nombre: "Monitores",
            id_categoria_productos: "02"
        },
        precio: 1000,
        stock: 15
    },
    // Teclados
    {
        id_productos: "14",
        nombre: "Teclado 01",
        descripcion: "texto desscripcion del producto, texto desscripcion del producto, texto desscripcion del producto.",
        imagen: "./media/teclados/01.webp",
        categoria: {
            nombre: "Teclados",
            id_categoria_productos: "03"
        },
        precio: 1000,
        stock: 15
    },
    {
        id_productos: "15",
        nombre: "Teclado 02",
        descripcion: "texto desscripcion del producto, texto desscripcion del producto, texto desscripcion del producto.",
        imagen: "./media/teclados/02.webp",
        categoria: {
            nombre: "Teclados",
            id_categoria_productos: "03"
        },
        precio: 1000,
        stock: 15
    },
    {
        id_productos: "16",
        nombre: "Teclado 03",
        descripcion: "texto desscripcion del producto, texto desscripcion del producto, texto desscripcion del producto.",
        imagen: "./media/teclados/03.webp",
        categoria: {
            nombre: "Teclados",
            id_categoria_productos: "03"
        },
        precio: 1000,
        stock: 15
    },
    {
        id_productos: "17",
        nombre: "Teclado 04",
        descripcion: "texto desscripcion del producto, texto desscripcion del producto, texto desscripcion del producto.",
        imagen: "./media/teclados/04.webp",
        categoria: {
            nombre: "Teclados",
            id_categoria_productos: "03"
        },
        precio: 1000,
        stock: 15
    },
    {
        id_productos: "18",
        nombre: "Teclado 05",
        descripcion: "texto desscripcion del producto, texto desscripcion del producto, texto desscripcion del producto.",
        imagen: "./media/teclados/05.webp",
        categoria: {
            nombre: "Teclados",
            id_categoria_productos: "03"
        },
        precio: 1000,
        stock: 15
    }
];