var loginContainer = document.getElementById(`login-usuario-container`);
var registroContainer = document.getElementById(`registro-usuario-container`);
var anclaRegistro = document.getElementById(`ancla-registro`);

const obtenerUsuario = () => {
    const usuario = {
        email: document.getElementById("input-usuario").value,
        contraseña: document.getElementById("input-password").value
    };

    fetch(`http://localhost:2000/usuarios/?email=${usuario.email}&contrasenia=${encodeURIComponent(usuario.contraseña)}`, {
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
            localStorage.setItem("usrActual", JSON.stringify(usr));
            window.location.href = "../categorias/index.html";
        })
        .catch(error => {
            document.getElementById("form-login").reset();
            document.getElementById("login-error").innerHTML = "&#9888; No pudimos encontrar tu cuenta de TecnoShop, intenta de nuevo."
        });
}

const crearUsuario = () => {
    const usuario = {
        primerNombre: document.getElementById("inp-nombre").value,
        PrimerAppelido: document.getElementById("inp-apellido").value,
        email: document.getElementById("inp-email").value,
        contraseña: document.getElementById("inp-contraseña").value,
        direccion: document.getElementById("inp-direccion").value,
        telefono: document.getElementById("inp-telefono").value,
        tarjetaDeCredito: document.getElementById("inp-tarjeta").value
    }

    fetch("http://localhost:2000/usuarios/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
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
            document.getElementById("form-login").reset();
            window.alert("Tu usuario ha sido creado exitosamente");
            window.location.href = "../categorias/index.html";
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

const ocultarRegistro = () => {
    loginContainer.style.display = `grid`;
    registroContainer.style.display = `none`;
}

function validacionInputs() {
    let banderaValidaciones = 0;

    var nombre = document.getElementById('inp-nombre');
    var email = document.getElementById('inp-email');
    var telefono = document.getElementById('inp-telefono');
    var contraseña = document.getElementById('inp-contraseña');

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
    }

    /*aqui luego puede ser que si banderaValidaciones == 0
        significa que no hay errores entonces podemos avanzar, espero entendás jaja.
    */
    if (banderaValidaciones == 0) {
        crearUsuario();
    }
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