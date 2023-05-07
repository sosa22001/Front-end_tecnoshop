let productos = [];
const obtenerProductos = () =>{
    fetch('http://localhost:2000/productos', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(resultado=>{
        return resultado.json();
    })
    .then(resultado=>{
        productos = resultado;
        renderProductos();
    })
    .catch(error=>{
        console.log(error);
    })
}

//AQUI ESTOY TRABAJANDO 6 MAYO 8 PM
const renderProductos = () =>{
    document.getElementById('content-productos').innerHTML = "";
    productos.forEach(Element=>{
        document.getElementById('content-productos').innerHTML +=
        `
        <div class="card" style="width: 18rem;">
            <img src="./assets/img/admin-productos.svg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${Element.nombre}</h5>
                <p class="card-text">${Element.descripcion}</p>
                <p class="card-text">Precio: ${Element.precio}</p>
                <p class="card-text">SubCategoria: ${Element.subCategorias}</p>
                <p class="card-text">Categoria: ${Element.categoria}</p>
                <p class="card-text">Empresa: ${Element.empresa}</p>
                <a href="#" class="btn btn-danger" onclick="eliminarProducto('${Element._id}')">
                      <i class="fa-solid fa-trash"></i>
                </a>
            </div>
        </div>
        `
    })
}

obtenerProductos();