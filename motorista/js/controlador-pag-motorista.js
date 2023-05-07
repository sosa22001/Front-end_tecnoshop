//obtenemos el motorista guardado en el localstorage
let motoristaActual = localStorage.getItem("motoristaActual");
motoristaActual = JSON.parse(motoristaActual);
console.log(motoristaActual);

const irOrdenesDisponibles = () =>{
    window.location.href = "ordenes-disponibles.html";
}

const irOrdenesProceso = () =>{
    window.location.href = "ordenes-proceso.html";
}

const irOrdenesEntregadas = () =>{
    window.location.href = "ordenes-entregadas.html";
}

const renderBienvenida = () =>{
    document.getElementById('header-moto').innerHTML =
    `
        <h1>Hola de nuevo ${motoristaActual.primerNombre}</h1>
    `
}
renderBienvenida();
