const productos = [
    {
        id: 'Cardigan',
        titulo: 'Cardigan',
        precio: 30000,
        cantidad: 6,
        talle: "único",
        imagen: '../public/images/cardigan.jpg.jpg',
     
    },
    {
        id: 'Campera de cuero',
        titulo: 'Campera de cuero',
        precio: 25000,
        cantidad: 2,
        talle: "M",
        imagen: '../public/images/campera.jpg.jpg',
      
    },
    {
        id: 'sweater',
        titulo: 'sweater',
        precio: 15000,
        cantidad: 6,
        talle: "XL",
        imagen: '../public/images/sweater.jpg.jpg',
       
    },
    {
        id: 'zapatillas',
        titulo: 'zapatillas',
        precio: 10000,
        cantidad: 30,
        talle: 42,
        imagen: '../public/images/zapas.jpg.jpg',
        
    }
];
const contenedorProductos = document.querySelector("#contenedor-productos")
const tituloPrincipal = document.querySelector('#titulo-principal');
let botonesAgregar = document.querySelectorAll('.producto-agregar');
const numerito = document.querySelector('#numero');
function cargarProductos(){
    productos.forEach(producto =>{
        
        let div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
                       <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                       <div class="producto-detalles">
                          <h3 class="producto-titulo">"${producto.titulo}" </h3>
                          <p class="producto-precio">"${producto.precio}"</p>
                          <button class="producto-agregar" id="${producto.id}">Agregar</button>
                       </div>
                       `;

                       contenedorProductos.append(div);
        

    })

    actualizarBotonesAgregar();
};

cargarProductos(productos);

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll('.producto-agregar');

    botonesAgregar.forEach(boton =>{
        boton.addEventListener('click', agregarAlCarrito);
    }  )
}

const productosEnCarrito = [];
function agregarAlCarrito(e){

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id ===idBoton);
    

    if(productosEnCarrito.some(producto=> producto.id === idBoton))  {
        const index = productosEnCarrito.findIndex(producto => producto.id ===idBoton);
        productosEnCarrito[index].cantidad++;
    }else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);

    }
    actualizarNumerito();
    
    localStorage.setItem('productos-en-carrito' , JSON.stringify(productosEnCarrito));
}

function actualizarNumerito (){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}