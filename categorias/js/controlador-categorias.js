document.getElementById('ejemplo').style.display = "none";
document.getElementById('productos').style.display = "none";
var usuario;

var radios = document.querySelectorAll('input[type="radio"]');
for (var i = 0; i < radios.length; i++) {
  radios[i].addEventListener("click", productosFiltrados(idEmpresa));
};

/* CONSUMIMOS SERVICIOS */
const obtenerCategoria = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:2000/categorias/${id}`, {
      method: 'GET',
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        console.log('error', error);
        reject(error);
      });
  });
};

const obtenerCategorias = () => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:2000/categorias", {
      method: 'GET',
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        console.log('error', error);
        reject(error);
      });
  });
};

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

const obtenerOrden = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:2000/ordenes/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow'
    })
      .then(res => res.json())
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        console.log('error', error);
        reject(error);
      });
  });
};

const obtenerEmpresa = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:2000/empresas/${id}`, {
      method: 'GET',
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
};

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

const obtenerProductos = () => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:2000/productos", {
      method: 'GET',
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const limpiarCarrito = () => {
  fetch(`http://localhost:2000/usuarios/${usuario._id}/eliminar-carrito`, {
    method: 'PUT',
    redirect: 'follow'
  })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

const limpiarOrdenes = () => {
  fetch(`http://localhost:2000/usuarios/${usuario._id}/eliminar-ordenes`, {
    method: 'PUT',
    redirect: 'follow'
  })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

const obtenerProductosPorCategoria = (idCategoria) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:2000/productos/categoria/${idCategoria}`, {
      method: 'GET',
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
};

const removerProductoCarrito = (idProducto) => {
  console.log(usuario._id)
  console.log(idProducto)
  fetch(`http://localhost:2000/usuarios/${usuario._id}/eliminar-de-carrito`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idProducto: idProducto }),
    redirect: 'follow'
  })
    .then(response => response.json())
    .then(result => renderizarCarrito())
    .catch(error => console.log('error', error));
};

const removerProductoListaDeseos = (idProducto) => {
  fetch(`http://localhost:2000/usuarios/${usuario._id}/eliminar-de-lista-deseos`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idProducto: idProducto }),
    redirect: 'follow'
  })
    .then(response => response.json())
    .then(result => renderizarListaDeseos())
    .catch(error => console.log('error', error));

};

const obtenerProductosPorCategoriaEmpresa = (idCategoria, idEmpresa) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:2000/productos/${idCategoria}/${idEmpresa}`, {
      method: 'GET',
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const añadirOrden = (idProducto) => {
  let cantidadInput = document.getElementById("inp-unidades").value;
  console.log(document.getElementById("inp-unidades").value);

  if (document.getElementById("inp-unidades").value) {
    obtenerProducto(idProducto)
      .then(producto => {
        const orden = {
          producto: producto._id,
          total: producto.precio,
          cantidad: cantidadInput,
          usuario: usuario._id
        }

        fetch("http://localhost:2000/ordenes/", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orden),
          redirect: 'follow'
        })
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));

          obtenerUsuario(usuario._id)
          .then(usr => {
            document.getElementById("pedido-total").innerHTML = orden.total*orden.cantidad;
            document.getElementById("pedido-tarjeta-credito").innerHTML = usr.tarjetaDeCredito;
            document.getElementById("pedido-direccion").innerHTML = usr.direccion;
            document.getElementById("Hora").innerHTML = new Date().toLocaleTimeString();

          })

          document.getElementById("inp-unidades").value = null;

    
      })
      .catch(error => console.log(error));

      


    const modal2 = new bootstrap.Modal(document.getElementById("modalPedido"));
    modal2.show();
    const modal1 = new bootstrap.Modal(document.getElementById("comprarProducto"));
    modal1.hide();
  } else {
    window.alert("seleccione cantidad")
  }


};

const obtenerOrdenesDeUsuario = () => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:2000/ordenes/usuario/${usuario._id}`, {
      method: 'GET',
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(ordenes => {
        renderizarOrdenes(ordenes);
        resolve(ordenes);
      })
      .catch(error => reject(error));
  });
};


const renderizarOrdenes = (ordenes) => {
  console.log("entre");
  console.log(ordenes)
  document.getElementById("listaCarrito").innerHTML = "";
  if (ordenes.length > 0) {
    document.getElementById("listaCarrito").classList.add("body-carrito");
    document.getElementById("listaCarrito").classList.remove("body-carrito");

    ordenes.forEach(orden => {
      obtenerProducto(orden.producto)
        .then(producto => {
          document.getElementById("listaCarrito").innerHTML +=
            `<div class="card mb-3" style="max-width: 540px;">
              <div class="row g-0">
                  <div class="col-md-4">
                  <img src="assets/img/productos/${producto.imagen}" class="img-fluid rounded-start" alt="...">
            </div>
        <div class="col-md-8">
          <div class="card-body" id="body-carrito">
          <div style="display:flex; justify-content: space-between"><h5 class="card-title">${producto.nombre}</h5>
        </div>
            <div>
            <p class="card-text"><small class="text-body-secondary">${producto.descripcion}</small></p>
            <p class="card-text">Precio: ${producto.precio}</p>
            <p class="card-text">Unidades: ${orden.cantidad}</p>
            <p class="card-text">Impuesto: ${orden.impuesto}</p>
            <p class="card-text">Total: ${orden.total}</p>
            <p class="card-text">Status: ${orden.status}</p>
            </div></div>
      </div>
    </div>
  </div>`;
        })
        .catch(error => console.log(error));
    })

  } else {
    document.getElementById("listaCarrito").innerHTML = `<img style="width:90%" src="assets/img/vacio.svg"/><h2 style="display: flex; margin: 2rem 0;
    justify-content: center;">VACIO</h2>`;
    document.getElementById("listaCarrito").classList.add("body-carrito");
  }

};

const añadirProductoDeseos = (idProducto) => {
  fetch(`http://localhost:2000/usuarios/${usuario._id}/lista-deseos`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idProducto }),
    redirect: 'follow'
  })
    .then(result => {
      if (!result.ok) {
        throw new Error('Network response was not ok');
      }
      return result.json();
    })
    .then(result => {
      console.log(result);
    })
    .catch(error => console.log(error));
};

/* RENDERIZACION */
const renderizarProductos = (idCategoria) => {
  document.getElementById("articulos").innerHTML = "";
  document.getElementById("filtro-abajo").innerHTML = `<div>Marcas</div>
  <label><input type="radio" name="empresa" onclick="renderizarProductos('${JSON.parse(localStorage.getItem("categoriaActual"))._id}')">Todos</label>`

  let stackEmpresas = [];
  let contador = 0;

  obtenerProductos()
    .then(productos => {
      productos.forEach((producto, i) => {
        if (producto.categoria === idCategoria) {
          obtenerEmpresa(producto.empresa)
            .then(empresa => {
              if (!stackEmpresas.includes(empresa.nombre)) {
                stackEmpresas.push(empresa.nombre);
                document.getElementById("filtro-abajo").innerHTML += `<label><input type="radio" name="empresa" onclick="saberCheckboxSeleccionado('${producto.empresa}')">${empresa.nombre}</label>`;
              }
            })
            .catch(e => console.log(e));
        }
      })
    })
    .catch(e => console.log(e));

  obtenerProductosPorCategoria(idCategoria)
    .then(productos => {
      productos.forEach(producto => {
        document.getElementById("articulos").innerHTML += `
        <div id="pa-vender">
        <img src="assets/img/productos/${producto.imagen}" alt="">
        <div id="der-pa-vender">
            <div id="info">
                <div id="titulo-info">${producto.nombre}</div>
                <div id="especificaciones">${producto.descripcion}</div>
            </div>
            <div id="precio-corazon">
                <div id="precio">L. ${producto.precio}</div>
                <div>
                    <button id="comprar" class="hover" data-bs-toggle="modal" data-bs-target="#comprarProducto" onclick="llenarModalProducto('${producto._id}')">
                        DETALLES
                    </button>
                    <i class="fa-regular fa-heart hover" onclick="añadirProductoDeseos('${producto._id}'); marcarMeGusta(this)"></i>
                </div>
            </div>
        </div>
        </div>`;
      })
    })
};

const renderizarListaDeseos = () => {
  document.getElementById("listaDeseos").innerHTML = "";

  obtenerUsuario(usuario._id)
    .then(usr => {
      usr.miListaDeseos.forEach(idProducto => {
        obtenerProducto(idProducto)
          .then(producto => {
            document.getElementById("listaDeseos").innerHTML +=
              `<div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="assets/img/productos/${producto.imagen}" class="img-fluid rounded-start" alt="...">
            </div>
              <div class="col-md-8">
                <div class="card-body">
                <div style="display:flex; justify-content: space-between"><h5 class="card-title">${producto.nombre}</h5>
                <i class="fa-solid fa-xmark" onclick="removerProductoListaDeseos('${producto._id}')"></i>                  
              </div>
                  <p class="card-text">${producto.descripcion}</p>
                  <p class="card-text"><small class="text-body-secondary">${producto.precio}</small></p>
              </div>
            </div>
          </div>
        </div>`;
          })
          .catch(e => console.log(e));
      })
      if (usr.miListaDeseos.length > 0) {
        document.getElementById("listaDeseos").classList.add("body-carrito");
        document.getElementById("listaDeseos").classList.remove("body-carrito");
      } else {
        document.getElementById("listaDeseos").innerHTML = `<img style="width:90%" src="assets/img/vacio.svg"/><h2 style="display: flex; margin: 2rem 0;
        justify-content: center;">VACIO</h2>`;
        document.getElementById("listaDeseos").classList.add("body-carrito");
      }

    })
    .catch(error => console.log(error));
};

const renderizarCategorias = () => {
  let categoriaContainer = document.querySelector(".categorias");

  obtenerCategorias()
    .then(categorias => {
      categorias.forEach(categoria => {
        categoriaContainer.innerHTML +=
          `<div class="caja" onclick="irCategoria('${categoria._id}')">
            ${categoria.nombre}
            <img src="assets/img/imagenes-categorias/${categoria.imagen}" alt="logo">
        </div>`;
      });

    })
    .catch(e => console.log(e));
};

const llenarModalProducto = (idProducto) => {
  let categoriaActual = JSON.parse(localStorage.getItem("categoriaActual"));

  obtenerProducto(idProducto)
    .then(producto => {
      obtenerEmpresa(producto.empresa)
        .then(empresa => {
          document.querySelector(".comprar").setAttribute("onclick", `añadirOrden('${producto._id}')`);
          document.getElementById("detalle-nombre").innerHTML = producto.nombre;
          document.getElementById("detalle-precio").innerHTML = producto.precio;
          document.getElementById("detalle-empresa").innerHTML = empresa.nombre;
          document.getElementById("detalle-descripcion").innerHTML = producto.descripcion;
          document.getElementById("detalle-sub-categoria").innerHTML = producto.subCategorias;
          document.getElementById("btn-favoritos").setAttribute("onclick", `añadirProductoDeseos('${producto._id}')`);
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
};

const irCategoria = (idCategoria) => {
  console.log(idCategoria);
  obtenerCategoria(idCategoria)
    .then(categoria => {
      document.getElementById("ejemplo").innerHTML = categoria.nombre;
      document.getElementById("ejemplo").innerHTML += '<button id="regresar" onclick="regresarCategorias()">REGRESAR</button>';
      localStorage.setItem("categoriaActual", JSON.stringify(categoria));
      renderizarProductos(idCategoria);
    })
    .catch(error => console.log(error));

  document.getElementById('ejemplo').style.display = "block";
  document.getElementById('productos').style.display = "block";
  document.getElementById('productos').style.display = "flex";
  document.getElementById('contenido-1').style.display = "none";
};

const saberCheckboxSeleccionado = (idProducto) => {
  console.log(1);
  productosFiltrados(idProducto);

};

const productosFiltrados = (idEmpresa) => {
  document.getElementById("articulos").innerHTML = "";
  console.log(JSON.parse(localStorage.getItem("categoriaActual"))._id);
  console.log(idEmpresa);


  obtenerProductosPorCategoriaEmpresa(JSON.parse(localStorage.getItem("categoriaActual"))._id, idEmpresa)
    .then(productos => {
      productos.forEach(producto => {
        document.getElementById("articulos").innerHTML += `
      <div id="pa-vender">
      <img src="assets/img/productos/${producto.imagen}" alt="">
      <div id="der-pa-vender">
          <div id="info">
              <div id="titulo-info">${producto.nombre}</div>
              <div id="especificaciones">${producto.descripcion}</div>
          </div>
          <div id="precio-corazon">
              <div id="precio">${producto.precio}</div>
              <div>
                  <button id="comprar" class="hover" data-bs-toggle="modal" data-bs-target="#comprarProducto" onclick="llenarModalProducto('${producto._id}')">
                      DETALLES
                  </button>
                  <i class="hover fa-regular fa-heart" onclick="añadirProductoDeseos('${producto._id}'); marcarMeGusta(this)"></i>
              </div>
          </div>
      </div>
      </div>`;
      })
    })
    .catch(e => console.log(e));
};

const marcarMeGusta = (etiqueta) => {
  etiqueta.classList.remove("fa-regular");
  etiqueta.classList.add("fa-solid");
};

const regresarCategorias = () => {
  document.getElementById('ejemplo').style.display = "none";
  document.getElementById('productos').style.display = "none";
  document.getElementById('contenido-1').style.display = "block";
};

const renderizarEntorno = () => {
  usuario = JSON.parse(localStorage.getItem("usrActual"));
  document.getElementById("nombre-usuario").innerHTML = `${usuario.nombre} ${usuario.apellido}`;
  renderizarCategorias();
};

renderizarEntorno();