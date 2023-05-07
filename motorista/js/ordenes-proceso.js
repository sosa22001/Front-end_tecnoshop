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
    document.querySelector(".hola").innerHTML = "";

    ordenes.forEach(orden => {
        if ((orden.status !== "En el destino") && (orden.status !== "Pendiente")) {
 
            document.querySelector(".hola").innerHTML += `
            <div class="card" style="width: 18rem;">
            <img src="./assets/img/aceptada.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Orden tomada</h5>
              <div class="estado-actual">
                <div>Estado actual</div>
                <div>${orden.status}</div>
                <div>Cliente: </div>
                <div>${orden.usuario.cliente}</div>
                <div>Direccion de Entrega</div>
                <div>${orden.usuario.direccion}</div>
                <div>Direccion de Entrega</div>
                <div>${orden.producto.nombre}</div>
                <div>Total</div>
                <div>${orden.total}</div>
                <div>Telefono</div>
                <div>${orden.usuario.telefono}</div
              </div>
              <button  type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Cambiar estado</button>
            </div>
        </div>`;
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

  obtenerOrdenesDisponibles();
