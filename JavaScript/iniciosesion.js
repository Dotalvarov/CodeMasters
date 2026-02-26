// Codigo JavaScript 
// Documento JavaScript 

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

var txtUsuario;
var txtClave;
var bd;

function iniciar() {
  //  alert("Se inicia login");
    console.log("Se inicia el login");

    //1. Definir los elementos de la página
    txtUsuario = document.getElementById("usuario");
    txtClave = document.getElementById("clave");
    btnLogin = document.getElementById("login");

    //1.2 definimos botones
    btnLogin.addEventListener("click", Login, false);
}

// 2. Creamos la base de datos
var solicitud = indexedDB.open("Code_Masters");

//onsuccess: evento q verifica la creacion de la base de datos
//onupgradaneeded: evento de actualizar la base de datos
solicitud.onsuccess = function (e) {
    //guardamos la Base de datos en la variable (bd)
    bd = e.target.result;
   // alert("La base de datos se conecto con exito");
}

function Login() {
    // alert("Buscar Usuario: " + txtUsuario.value);
    cuenta = 0;

    var transaccion = bd.transaction(["usuarios"], "readonly");
    var almacen = transaccion.objectStore("usuarios");
    var buscaras = txtUsuario.value;
    var ver = IDBKeyRange.only(buscaras);
    var cursor = almacen.openCursor(ver, "next");

    cursor.onsuccess = function (e) {
        var cursor = e.target.result;

        if (cursor) {
            var SisUsuario = cursor.value.usuario;
            var SisClave = cursor.value.clave;
        }

        if (SisUsuario = txtUsuario.value && SisClave == txtClave.value) {
            //alert
            window.open("Pantalla Principal.html", "_top")
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: "El usuario o clave son incorrectos",
            })
        }
    }
}

//keyPath hace que algo no pueda repetirse
window.addEventListener("load", iniciar, false)
