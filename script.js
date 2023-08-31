const btnCarrito = document.querySelector('.btn-carrito');
const mainCards = document.querySelector('.container-card');
const carritoElement = document.querySelector('.carrito');
const itemCart = document.querySelector('.items-cart');

let carrito = [];
function cardsTiendas() {
    tienda.forEach((cardItem, index) => {
        const botonCarrito = `<button class="btn-add-carrito" data-tienda-id="${index}">agregar al carrito</button>`;
        const renderHTML = `         
        <div class="main-card">
            <figure>
                <img src="${cardItem.img}"
                    alt="">
            </figure>
            <div class="main-text">
                <h4 class="nombre">${cardItem.nombre}</h4>
                <span class="precio">${cardItem.precio}</span>
                    ${botonCarrito}
            </div>
        </div>
      `

        mainCards.innerHTML += renderHTML
    });
}
cardsTiendas()

//al darle click al btn se abre o se cierra
btnCarrito.addEventListener('click', abrirCarrito)
function abrirCarrito(e) {
    carritoElement.classList.toggle('hidden-cart')

}

//selecciona toda la card con el btn add carrito
mainCards.addEventListener('click', agregarCarrito)
function agregarCarrito(e) {
    if (e.target.classList.contains('btn-add-carrito')) {
        const idSeleccionado = (e.target.dataset.tiendaId)
        leerDatosCard(idSeleccionado)
    }
}

//extraer los valores de las card mediante las ids
function leerDatosCard(id) {
    const infoCard = tienda[id]


    // aumento en el carrito de compras 
    const existeIndex = carrito.findIndex(product => product.id === infoCard.id); // seleccionamos todas la ids de carrito y compramos infoCard que son los valores extraido para mostrar en el carrito
    if (existeIndex !== -1) {
        carrito[existeIndex].cantidad++;
    } else {
        infoCard.cantidad = 1
        carrito.push(infoCard);
    }
    carritoHTML()
}


//enviar al carrito las card ya seleccionada
function carritoHTML() {
    const tbody = carritoElement.querySelector('tbody');
    tbody.innerHTML = '';
    carrito.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
           <td >  
                   <img  class ='img-tb' src="${product.img}" width='100'>
              </td>
              <td>${product.nombre}</td>
              <td>${product.precio}</td>
              <td>${product.cantidad} </td>
              <td>
              <a href="#" class="far fa-trash-alt borrar-curso" data-id="${product.id}"></a>
          </td>           
         `;
        tbody.appendChild(row);
    });
};

//eliminar item del contenedor del carrito
carritoElement.addEventListener('click', eliminarItem)
function eliminarItem(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const productId = e.target.dataset.id;
        const productIndex = carrito.findIndex(product => product.id === productId);

        carrito.splice(productIndex, 1);
        carritoHTML();

    }
}

//vaciamos el carrito de compras 
carritoElement.addEventListener('click', vaciarCarrito)
function vaciarCarrito(e) {
    if (e.target.classList.contains('button-vaciar')) {
        carrito = []
        itemCart.innerHTML = ''
    }
}