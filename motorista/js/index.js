var loginContainer = document.getElementById(`login-motorista-container`);
var registroContainer = document.getElementById(`registro-motorista-container`);

const obtenerMotorista = () => {
    const motorista = {
        email: document.getElementById("user").value,
        contraseña: document.getElementById("contra").value
    };

    fetch(`http://localhost:2000/motoristas/sesion?email=${encodeURIComponent(motorista.email)}&contraseña=${encodeURIComponent(motorista.contraseña)}&aprobado=${encodeURIComponent(motorista.aprobado)}}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
    })
        .then(result => {
            if (!result.ok) {
                throw new Error('Network response was not ok');
            }
            return result.json();
        })
        .then(usr => {
            document.getElementById("form-login").reset();
            localStorage.setItem("motoristaActual", JSON.stringify(usr));
            window.location.href = "pag-motorista.html";
        })
        .catch(error => {
            document.getElementById("form-login").reset();
            document.getElementById("login-error").innerHTML = "&#9888; No pudimos encontrar tu cuenta de TecnoShop o no has sido aprobado por un administrador"
        });
}

const crearMotorista = () => {
    let n = document.querySelector('input[name="carro"]:checked').value;
    console.log(n);
    let moto = document.querySelector('input[name="moto"]:checked').value;
    console.log(moto);
    const motorista = {
        primerNombre: document.getElementById("inp-nombre").value,
        primerApellido: document.getElementById("inp-apellido").value,
        email: document.getElementById("inp-email").value,
        telefono: document.getElementById("inp-telefono").value,
        añosDeExperiencia:  document.getElementById("inp-años").value,
        contraseña: document.getElementById("inp-contraseña").value,
        carro: document.querySelector('input[name="carro"]:checked').value,
        moto : document.querySelector('input[name="moto"]:checked').value,
        aprobado : false
    }
    
    fetch("http://localhost:2000/motoristas/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(motorista),
        redirect: 'follow'
    })
        .then(result => {
            if (!result.ok) {
                throw new Error('Network response was not ok');
            }
            return result.json();
        })
        .then(usr => {
            console.log(usr);
            window.alert("Tu usuario ha sido creado exitosamente");
            window.alert("Ahora espere a ser aprobado por un administrador");
            document.getElementById("form-login").reset();

            window.location.href = "motorista.html";
         })
        .catch(error => {
            document.getElementById("form-login").reset();
            document.getElementById("registro-error").innerHTML = "&#9888; Intenta de nuevo"
        });
}

const renderizarLogin = () => {
    loginContainer.style.display = `grid`;
    registroContainer.style.display = `none`;
}

renderizarLogin();

const ocultarLogin = () => {
    loginContainer.style.display = `none`;
    registroContainer.style.display = `grid`;
}

const ocultarRegistro= () => {
    loginContainer.style.display = `grid`;
    registroContainer.style.display = `none`;
}

function validacionInputs() {
    let  banderaValidaciones = 0;

    var nombre = document.getElementById('inp-nombre');
    var email = document.getElementById('inp-email');
    var telefono = document.getElementById('inp-telefono');
    var contraseña = document.getElementById('inp-contraseña');
    var contraseña2 = document.getElementById('inp-contraseña-2');

    //expresiones regulares
    var letras = /^[a-zA-Z\s]+$/; //para el nombre
    var email_valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var tel = /\d{4}-\d{4}$/;

    if ((letras.test(nombre.value))) {
        valido(nombre);
    } else {
        error(nombre);
        banderaValidaciones++;
    }

    if (email_valido.test(email.value)) {
        valido(email);
    } else {
        error(email);
        banderaValidaciones++;
    }

    if (tel.test(telefono.value)) {
        valido(telefono);
    } else {
        error(telefono);
        banderaValidaciones++;
    }

    if (banderaValidaciones > 0) {
        mensajeError();
    } else {
        crearMotorista();
    }

    /*aqui luego puede ser que si banderaValidaciones == 0
        significa que no hay errores entonces podemos avanzar, espero entendás jaja.
    */
    banderaValidaciones = 0;
}
function valido(etiqueta) {
    etiqueta.classList.remove('input-error');
    etiqueta.classList.add('input-succes');
};
function error(etiqueta) {
    etiqueta.classList.remove('input-succes');
    etiqueta.classList.add('input-error');
}
function mensajeError() {
    alert("Por favor corrija los inputs en rojo");
}
const limpiezaInicial = () =>{
    document.getElementById('user').value = "";
    document.getElementById('contra').value = "";
}

limpiezaInicial();