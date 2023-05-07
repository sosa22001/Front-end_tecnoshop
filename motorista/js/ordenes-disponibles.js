const regresarMenu = () =>{
    window.location.href = "pag-motorista.html";
}

const obtenerOrdenesDisponibles = () => {
fetch("http://localhost:2000/ordenes", {
        method: 'GET',
        redirect: 'follow'
      })
      .then(response => response.json())
      .then(result => renderizarOrdenes(result))
      .catch(error => console.log('error', error));
}

const renderizarOrdenes = (ordenes) => {
    document.querySelector(".row").innerHTML = ""
console.log(ordenes);
    ordenes.forEach(orden => {
        if(orden.status === "Pendiente"){
            document.querySelector(".row").innerHTML += `
            <div class="col-xl-3 col-md-6 col-12 card" style="width: 18rem;">
            <img src="./assets/img/esperando.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Este pedido te espera...</h5>
              <p>Cliente: ${orden.usuario.nombre}</p>
              <p>Producto: ${orden.producto.nombre}</p>
              <p>${orden.cantidad}</p>
              <button type="button"  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="llenarModal('${orden.usuario._id}', '${orden.producto._id}', ${orden.total}, ${orden.cantidad})">Ver Detalles</button>
            </div>
        </div>
`;

        }
        
    });
}

const obtenerProducto = (id) => {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:2000/productos/${id}`, {
        method: 'GET',
        redirect: 'follow'
      })
        .then(response => response.json())
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }

const obtenerUsuario = (id) => {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:2000/usuarios/${id}`, {
        method: 'GET',
        redirect: 'follow'
      })
        .then(response => response.json())
        .then(result => {
          usuario = result;
          resolve(result)
        })
        .catch(error => reject(error));
    });
  };

const llenarModal = (idUsuario, idProducto, total, cantidad) => {

    obtenerUsuario(idUsuario)
    .then(usr => {
        obtenerProducto(idProducto)
        .then(producto => {
            document.getElementById("nombre").innerHTML = usr.nombre;
            document.getElementById("direccion").innerHTML = usr.direccion;
            document.getElementById("telefono").innerHTML = usr.telefono;
            document.getElementById("total").innerHTML = total;
            document.getElementById("producto").innerHTML = producto.nombre;
            document.getElementById("cantidad").innerHTML = cantidad;
        })
    })
}

obtenerOrdenesDisponibles();