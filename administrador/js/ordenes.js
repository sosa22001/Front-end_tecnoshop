let ordenes = [];
let motoristas = [];
let mot = "";

const obtenerOrdenes = () =>{
    fetch('http://localhost:2000/ordenes', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(resultado=>{
        return resultado.json();
    })
    .then(resultado=>{
        ordenes = resultado;
        renderOrdenes();
    })
    .catch(error=>{
        console.log(error);
    })
}

const renderOrdenes = () =>{

    fetch('http://localhost:2000/motoristas', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(resultado=>{
        return resultado.json();
    })
    .then(resultado=>{
        motoristas = resultado;
        
        
        document.getElementById('contenedor-ordenes').innerHTML = "";
    ordenes.forEach(Element=>{
        document.getElementById('contenedor-ordenes').innerHTML +=
        `
        <div class="orden" style="width: 540px;">          
        <div class="detalle">
            <p class="enunciado">Nombre Cliente: </p>
            <p class="descrp">${Element.usuario.nombre} ${Element.usuario.apellido}</p>
        </div>
        <div class="detalle">
            <p class="enunciado"></p>
            <div class="productos bold">
                <p class="descrp">CANT</p>
                <p class="descrp">DESCR</p>
                <p class="descrp">PRECIO</p>
            </div>
        </div>
        <div class="detalle">
            <p class="enunciado">Carrito:</p>
            <div class="productos">
                <p class="descrp">${Element.cantidad}</p>
                <p class="descrp">${Element.producto.nombre}</p>
                <p class="descrp">${Element.producto.precio}</p>
            </div>
        </div>
        <div class="detalle">
            <p class="enunciado">Impuesto:</p>
            <p class="descrp">${Element.impuesto}</p>
        </div>
        <div class="detalle">
            <p class="enunciado">Total:</p>
            <p class="descrp">${Element.total}</p>
        </div>
        <div class="detalle">
            <p class="enunciado">Fecha:</p>
            <p class="descrp">${Element.fecha}</p>
        </div>
        <div class="detalle">
            <p class="enunciado">Estado:</p>
            <p class="descrp">${Element.status}</p>
        </div>
        <div class="detalle">
            <p class="enunciado">Asignar a motorista:</p>
            <select class="input input2" name="" id="select-motoristas">
                <option value="" hidden selected>...</option>
                
            </select>
        </div>
        <button class="btn btn-primary btn-ordenes" onclick="cambiarEstadoORden('${Element._id}')">Asignar a motorista</button>
    </div>
        `
    })
    document.getElementById('select-motoristas').innerHTML = 
    `
    <option value="" hidden selected>...</option>
    `
    ;
    motoristas.forEach(Element=>{
        document.getElementById('select-motoristas').innerHTML +=
        `
            <option value="${Element._id}">${Element.primerNombre} ${Element.primerApellido}</option>
        `
    })
    const select = document.getElementById('select-motoristas');
    select.addEventListener('change', (event) => {
    const valorSeleccionado = event.target.value;
    //id del motorista:
    localStorage.setItem('idMotoristaSeleccionado', valorSeleccionado);
    console.log(valorSeleccionado);
    
});
    })
    .catch(error=>{
        console.log(error);
    })

    
}


const cambiarEstadoORden = (idOrden) =>{
    //lo que hará es:
    //cambiar el estado de la orden de pendiente a "tomada"

    //añadir esa orden al motorista
    console.log("id de la orden");
    console.log(idOrden);

    fetch(`http://localhost:2000/ordenes/${idOrden}`,{
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            estado: "tomada"
        })
    })
    .then(resultado=>{
        return resultado.json();
    })
    .then(resultado=>{
        console.log("estado en la orden cambiado");
        
    })
    .catch(error=>{
        console.log(error);
    })

    let idMot = localStorage.getItem('idMotoristaSeleccionado')
    console.log("id motorista seleccionado");
    console.log(idMot);

    fetch(`http://localhost:2000/motoristas/${idMot}/${idOrden}`,{
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        }, 
        body: JSON.stringify({
            idProducto: idOrden
        })
    })
    .then(resultado=>{
        return resultado.json();
    })
    .then(resultado=>{
        console.log("estado en la orden cambiado");
        
    })
    .catch(error=>{
        console.log(error);
    })

    location.reload();
}

obtenerOrdenes();