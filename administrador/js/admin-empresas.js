let empresas =[];
let categorias = [];
const obtenerEmpresas = () =>{
    fetch('http://localhost:2000/empresas',{
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(resultado =>{
        return resultado.json();
    })
    .then(resultado =>{
        console.log(resultado);
        empresas = resultado;
        renderizarEmpresas();
    })
    .catch(error=>{
        console.log(error);
    })
}

const renderizarEmpresas = () =>{
    document.getElementById('contenedor-empresas').innerHTML = "";
    empresas.forEach(Element=>{
        document.getElementById('contenedor-empresas').innerHTML +=
        `
            <div class="card" style="width: 18rem;">
                <img src="./assets/img/admin-ordenes.svg" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${Element.nombre}</h5>
                  <p class="card-text">${Element.descripcion}</p>
                  <p class="card-text">Región: ${Element.region}</p>
                  <p class="card-text">${Element.telefono}</p>
                  <a href="#" class="btn btn-danger" onclick="eliminarEmpresa('${Element._id}')">
                    <i class="fa-solid fa-trash"></i>
                  </a>
                </div>
            </div>
        `
    })
}
const eliminarEmpresa = (idEmpresa) =>{
    console.log("eliminar");
    fetch(`http://localhost:2000/empresas/${idEmpresa}`,{
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(resultado =>{
        return resultado.json();
    })
    .then(resultado=>{
        console.log("se eliminó la empresa");
    })
    .catch(error=>{
        console.log(error);
    })
}

const obtenerCategorias = () =>{
    fetch('http://localhost:2000/categorias', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(resultado=>{
        return resultado.json();
    })
    .then(resultado=>{
        categorias = resultado;
        renderModalEmpresa();
    })
    .catch(error=>{
        console.log(error);
    })
}

//renderizar modal empresas:
const renderModalEmpresa = () =>{
    document.getElementById('modal-empresas').innerHTML =
    `
    <div class="modal-header">
        <h2 id="staticBackdropLabel">Formulario Empresas</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <main id="admin-main">
            <form action="" id="admin-form">
    
                <div class="campo">
                    <label for="nombre-empresa">Nombre de empresa</label>
                    <input type="text" required id="nombre-empresa" class="input" placeholder="nombre">
                </div>
    
                <div class="campo">
                    <label for="descr-empresa">Descripcion de la empresa</label>
                    <textarea name="descr-empresa" required id="descr-empresa" class="input"
                        placeholder="descripcion aqui"></textarea>
                </div>
    
                <div class="campo">
                    <label for="tel-empresa">Telefono</label>
                    <div class="input-group mb-3">
                        <span class="input-group-text">+504</span>
                        <input type="text" required id="tel-empresa" class="input" placeholder="0000-0000">
                    </div>
                </div>
                <div class="campo">
                    <label for="region-empresa">Region</label>
                    <input type="text" required id="region-empresa" class="input" placeholder="lugar">
                </div>
    
            </form>
        </main>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" onclick="crearEmpresa()">Listo</button>
    </div>
    `;
    
}
const crearEmpresa = () =>{
    let nombre = document.getElementById('nombre-empresa').value;
    let descripcion = document.getElementById('descr-empresa').value;
    let imagen = "";
    let productos = [];
    let telefono = "+504 ";
    telefono += document.getElementById('tel-empresa').value;
    let region = document.getElementById('region-empresa').value;

    fetch('http://localhost:2000/empresas', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre, 
            descripcion: descripcion, 
            imagen: imagen,
            productos: productos,
            telefono: telefono,
            region: region
        })
    })
    .then(resultado=>{
        return resultado.json();
    })
    .then(resultado=>{
        console.log("Empresa creada con éxito");
    })
    .catch(error=>{
        console.log(error);
    })
    limpiarModalEmpresa();
    window.alert("Se creó la empresa");
    location.reload();
}
const limpiarModalEmpresa = () =>{
    document.getElementById('nombre-empresa').value ="";
    document.getElementById('descr-empresa').value ="";
    document.getElementById('tel-empresa').value ="";
    document.getElementById('region-empresa').value ="";
}
obtenerCategorias();
obtenerEmpresas();

