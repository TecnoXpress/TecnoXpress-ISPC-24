
const contenedorDeProductos = document.querySelector("#contenedor-de-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar")
const numerito = document.querySelector("#numerito");
const contenedorProductoSingle = document.querySelector("#producto-single")




botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))

function cargarProductos(productosElegidos){
    contenedorDeProductos.innerHTML="";
    productosElegidos.forEach(producto => {
        const div = document.createElement("div"); 
        div.classList.add("productos");
        div.innerHTML=`
        <img class="producto-imagen img-fliud" src="${producto.imagen}" alt="${producto.imagen}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.nombre}</h3>
            <div class="producto-estilo-categoria">
                <p class="tit-cat"> Categoria:<span class="nombre-categoria">${producto.categoria.nombre}</span></p>
            </div>
            <p class="producto-precio">$ ${producto.precio}</p>
            <div class="producto-botones">
                <button class="producto-ver-info mi-boton-tt" onclick="verProducto(${producto.id_productos})"  title="Ver más .." id="${producto.id_productos}"><i class="bi bi-eye"></i></i></button>
                <button class="producto-agregar mi-boton-tt" title="Agregar al Carrito" id="${producto.id_productos}"><i class="bi bi-cart-plus"></i></button>
            </div>
         </div>
        `;
        contenedorDeProductos.append(div);
    })

    actualizarBotonesAgregar();
}
//crea una variable div y la asigna a un elem html div

// Alt + 96 comilla francesa para template string
cargarProductos(productos)

const botonVerMas = document.querySelector(".producto-ver-info");

   



botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
        
        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id_categoria_productos === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id_categoria_productos === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    })
 });

 function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    //botonesAgregar queda como un array que tiene asignado todos los elementos con la clase producto-agregar
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
    //recorre 
 }
 let productosEnCarrito;

 let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
 
 if (productosEnCarritoLS) {
     productosEnCarrito = JSON.parse(productosEnCarritoLS);
     actualizarNumerito();
 } else {
     productosEnCarrito = [];
 } 
 


 function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id_productos === idBoton);
    if (productosEnCarrito.some(producto => producto.id_productos === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id_productos === idBoton);
        productosEnCarrito[index].cantidad++;
    }else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito()
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

 }
 function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acum, producto) => acum + producto.cantidad, 0);
    numerito.innerText=nuevoNumerito;
}


function verProducto(productoId){
    console.log(productoId);
       
        let productoSolo = productos.filter(producto => producto.id_productos == productoId);
        localStorage.setItem("producto-solo", JSON.stringify(productoSolo));
        contenedorDeProductos.innerHTML="";
        contenedorProductoSingle.classList.remove("disabled");
        tituloPrincipal.classList.add("disabled");
        // const div = document.createElement("div"); 
        //     div.classList.add("producto-sing");
        let productoSingle=localStorage.getItem("producto-solo");
        productoSingle = JSON.parse(productoSingle);
        productoSingle.forEach(producto => {
        contenedorProductoSingle.classList.add("producto-single");
        contenedorProductoSingle.innerHTML=`
        <div class="titulo-single">
         <h2 class="titulo-principal" align="center">${producto.nombre}</h2>
        </div>
        <div class="producto-single-wrapper">    
            <div class="producto-single-imagen">
            <img class="producto-s-imagen img-fluid" src="${producto.imagen}" alt="${producto.nombre}">
        </div>
         <div class="producto-single-detalles">
        
             <div class="producto-single-caracteristicas">
                     <h3 >Descripción del Producto: </h3>
                    <span class="txt">Categoria:</span>
                    <p class="producto-precio"> ${producto.categoria.nombre}</p>
                    <span class="txt">Precio Unitario:</span>
                    <p class="producto-precio">$ ${producto.precio}</p>
                    <h4>Caracteristicas:</h4>
                    <p class="producto-single-descripcion">
                  ${producto.descripcion};
                </p>
            </div>
            <div class="producto-single-agregar-carrito">
            <button class="producto-agregar mi-boton-tt boton-single" title="Agregar al Carrito"  id="${producto.id_productos}">Agregar al Carrito de Compras <i class="bi bi-cart-plus"></i></button>
         </div>
         </div
        `});
       
        contenedorDeProductos.append(contenedorProductoSingle);
        actualizarBotonesAgregar();
} 

