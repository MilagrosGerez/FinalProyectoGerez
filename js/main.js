let productos = [];

fetch("./js/productos.json")
   .then(response => response.json())
   .then(data => {
    productos = data;
    cargarProductos(productos);
    tituloPrincipal.textContent = "Nuestros Productos";
    numerito.textContent = productos.length;
   })
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


function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll('.producto-agregar');

    botonesAgregar.forEach(boton =>{
        boton.addEventListener('click', agregarAlCarrito);
    }  )
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
}else{
    productosEnCarrito = []; 
}

function agregarAlCarrito(e){

    Toastify({
        text: "Has elegido un producto!",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = {...productos.find(producto => producto.id ===idBoton)};
    
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

