var ordenesContainer = document.getElementById(`ordenes-container`);

//const ordenesDisponibles = require(`../data/ordenesDisponibles.json`);

//console.log(ordenesDisponibles);

/* CONSUMIMOS SERVICIOS */
let empresas = [];
let categorias = [];
let aceptar = [];
let ordenes = [];
const irAdminEmpresas = () => {
    window.location.href = "administrar-empresas.html";
}

const irAdminProductos = () => {
    window.location.href = "administrar-productos.html";
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
        //renderModalProductos();
    })
    .catch(error=>{
        console.log(error);
    })
}

const obtenerEmpresas = () => {
    fetch('http://localhost:2000/empresas', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(resultado=>{
        return resultado.json();
    })
    .then(resultado=>{
        empresas = resultado;
        //renderModalProductos();
    })
    .catch(error=>{
        console.log(error);
    })
};

obtenerCategorias();
obtenerEmpresas();


/*
const renderModalProductos = () =>{
    
    //let cat = "";
    categorias.forEach(Element=>{
        cat +=
        `
        <div>
            <input type="radio" name="categoria-producto" id="${Element._id}" class="form-check-input">
            <label for="">${Element.nombre}</label>
        </div>
        `
    });

    let empre ="";

    empresas.forEach(Element=>{
        empre +=
        `
            <option value="">${Element.nombre}</option>
        `
    })
    document.getElementById('modal-productos').innerHTML =
    `
        <div class="modal-header">
            <h2 id="staticBackdropLabel">Formulario Productos</h2>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <main id="admin-main">
                <form action="" id="admin-form">

                    <div class="campo">
                        <label for="nombre-empresa">Nombre de producto</label>
                        <input type="text" required id="nombre-empresa" class="input" placeholder="nombre">
                    </div>

                    <div class="campo">
                        <label for="descr-prod">Descripcion tecnica</label>
                        <textarea name="descr-prod" id="descr-prod" class="input"
                            placeholder="descripcion aqui"></textarea>
                    </div>

                    <div class="campo">
                        <label for="precio-prod">Precio</label>
                        <div class="input-group mb-3">
                            <span class="input-group-text">L.</span>
                            <input type="text" id="precio-prod" class="input" placeholder="0.00">
                        </div>
                    </div>

                    <div class="campo">
                        <label for="empresa-prod">Empresa a la que pertenece</label>
                        <select class="input" name="empresa-prod" id="empresa-prod">
                            <option selected hidden>empresa</option>
                            ${empre}
                        </select>
                    </div>


                    <label for="id">Categorias a la que pertenece
                        <div id="checkbox">
                            ${cat}
                        </div>
                    </label>

                    <div class="campo" id="sub-categorias">
                        <label for="empresa-prod">subcategoria</label>
                        <select class="input" name="empresa-prod" id="empresa-prod">
                            <option selected hidden>Elija subcategoria</option>
                            <option value="educacion">Educación</option>
                            <option value="salud">Salud y bienestar</option>
                            <option value="entretenimiento">Entretenimiento</option>
                            <option value="familiar">Familiar</option>
                            <option value="tecnologia">Tecnologia</option>
                        </select>
                    </div>

                </form>
            </main>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary">Listo</button>
        </div>
    `
//}
*/


const renderizarVisualizarMotoristas = () =>{
    document.getElementById('modal-vis-moto').innerHTML = "";
    fetch('http://localhost:2000/motoristas/moto/pen',{
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        } 
    })

    .then(resultado=>{
        return resultado.json();
    })
    .then(resultado=>{
        console.log(resultado);
        
        aceptar = resultado;
        aceptar.forEach(element=>{
            document.getElementById('modal-vis-moto').innerHTML +=
        `
        <div class="orden">
            <div class="detalle">
                <p class="enunciado">Nombre:</p>
                <p class="descrp">${element.primerNombre} ${element.primerApellido}</p>
            </div>
            <div class="detalle">
                <p class="enunciado">Años de experiencia:</p>
                <p class="descrp">${element.añosDeExperiencia}</p>
            </div>
            <div class="detalle">
                <p class="enunciado">Edad:</p>
                <p class="descrp">50</p>
            </div>
            <div class="detalle">
                <p class="enunciado">Posee carro</p>
                <p class="descrp">${element.carro}</p>
            </div>
            <div class="detalle">
                <p class="enunciado">Posee moto:</p>
                <p class="descrp">${element.moto}</p>
            </div>
            <div class="btn-motoristas">
                <button class="btn btn-primary btn-ordenes" onclick="cambiarEstado('${element._id}', true); location.reload();">ACEPTAR</button>
                <button class="btn btn-secondary btn-ordenes" onclick="cambiarEstado('${element._id}', false); location.reload();">DENEGAR</button>
            </div>
        </div>
        `
        })
        
    })
    .catch(error=>{
        console.log(error);
    })
}


const cambiarEstado = (idMotorista, booleano) =>{
    fetch(`http://localhost:2000/motoristas/estado/${idMotorista}`,{
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        } ,
        body: JSON.stringify({
            estado: booleano
        })
    })
    .then(resultado=>{
        return resultado.json();
    })
    .then(resultado=>{
        console.log(`se cambió el estado del motorista a: ${booleano}` );
    })
    .catch(error=>{
        console.log(error);
    })
    if(booleano){
        alert("Se ha aceptado al motorista correctamente");
    }else{
        alert("Se ha denegado al motorista");
    }
}


//hice esto yo:



const irOrdenes = () =>{
    window.location.href = "ordenes-asignar.html";
}




//


