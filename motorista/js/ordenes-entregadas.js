const regresarMenu = () => {
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
        if (orden.status === "En el destino") {
 
            document.querySelector(".hola").innerHTML += `
            <div class="orden">
            <div class="detalle">
                <p class="enunciado">Cliente:</p>
                <p class="descrp">${orden.usuario.nombre}</p>
            </div>
            <div class="detalle">
                <p class="enunciado">Direccion de Entrega:</p>
                <p class="descrp">${orden.usuario.direccion}</p>
            </div>
            <div class="detalle">
                <p class="enunciado">Telefono:</p>
                <p class="descrp">${orden.usuario.telefono}</p>
            </div>
            <div class="detalle">
                <p class="enunciado">Total:</p>
                <p class="descrp">${orden.total}</p>
            </div>
            <div class="detalle">
                <p class="enunciado">Producto:</p>
                <p class="descrp">${orden.producto.nombre}</p>
            </div>
            <div class="detalle">
            <p class="enunciado">Cantidad:</p>
            <p class="descrp">${orden.cantidad}</p>
        </div>
            <div class="btn-motoristas">
                <button class="btn btn-primary btn-ordenes" >ACEPTAR</button>
                <button class="btn btn-secondary btn-ordenes" >DENEGAR</button>
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
