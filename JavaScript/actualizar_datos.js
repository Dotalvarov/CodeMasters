window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

var bd;
var cursor;
var cuenta = 0;

var txtUsuario, txtEmail, txtClave;
var btnBuscar, btnActualizar, btnEliminar, btnLimpiar, btnVolver;

function iniciar() {
    txtUsuario = document.getElementById("usuario");
    txtEmail = document.getElementById("email");
    txtClave = document.getElementById("clave");

    btnBuscar = document.getElementById("Buscar");
    btnActualizar = document.getElementById("Actualizar");
    btnEliminar = document.getElementById("Eliminar");
    btnLimpiar = document.getElementById("Limpiar");
    btnVolver = document.getElementById("Volver");

    btnVolver.addEventListener("click", Volver, false);
    btnBuscar.addEventListener("click", Buscar, false);
    btnActualizar.addEventListener("click", Actualizar, false);
    btnEliminar.addEventListener("click", Eliminar, false);
    btnLimpiar.addEventListener("click", Limpiar, false);
}

var solicitud = indexedDB.open("Code_Masters");

solicitud.onsuccess = function (e) {
    bd = e.target.result;
    console.log("Base de datos conectada con éxito");
};

solicitud.onupgradeneeded = function (e) {
    bd = e.target.result;
    bd.createObjectStore("gente", { keyPath: "clave" });
    var tbUsuarios = bd.createObjectStore("usuarios", { keyPath: "usuario" });
    tbUsuarios.createIndex("usuario", "usuario", { unique: false });
    tbUsuarios.createIndex("email", "email", { unique: false });
    tbUsuarios.createIndex("clave", "clave", { unique: false });
}

function Buscar() {
    var bUsuario = txtUsuario.value;
    var bEmail = txtEmail.value;

    if (bUsuario !== "") {
        BuscarUsuario(bUsuario);
    } else if (bEmail !== "") {
        BuscarEmail();
    } else {
        Swal.fire("Atención", "Ingresa un usuario o email para buscar", "warning");
    }
}

var usuarioOriginal = "";

function BuscarUsuario(usuario) {
    var bUsuario = txtUsuario.value;
    var transaccion = bd.transaction(["usuarios"], "readonly");
    var almacen = transaccion.objectStore("usuarios");
    var rango = IDBKeyRange.only(bUsuario);
    var cursor = almacen.openCursor(rango);

    cursor.onsuccess = function (e) {
        var resultado = e.target.result;
        if (resultado) {
            txtUsuario.value = resultado.value.usuario;
            txtEmail.value = resultado.value.email;
            txtClave.value = resultado.value.clave;
            usuarioOriginal = resultado.value.usuario;
        } else {
            Swal.fire("Sin resultados", "No se encontró el usuario", "info");
        }
    };
}

function BuscarEmail() {
    var bEmail = txtEmail.value;
    var transaccion = bd.transaction(["usuarios"], "readonly");
    var almacen = transaccion.objectStore("usuarios");
    var index = almacen.index("email");
    var rango = IDBKeyRange.only(bEmail);
    var cursor = index.openCursor(rango);

    cursor.onsuccess = function (e) {
        var resultado = e.target.result;
        if (resultado) {
            txtUsuario.value = resultado.value.usuario;
            txtEmail.value = resultado.value.email;
            txtClave.value = resultado.value.clave;
            usuarioOriginal = resultado.value.usuario;
        } else {
            Swal.fire("Sin resultados", "No se encontró el email", "info");
        }
    };
}

function Actualizar() {
    if (txtUsuario.value === "" || txtEmail.value === "" || txtClave.value === "") {
        Swal.fire("Atención", "Todos los campos deben estar llenos para actualizar", "warning");
        return;
    }

    var usuarioNuevo = txtUsuario.value;
    var email = txtEmail.value;
    var clave = txtClave.value;

    var transaccion = bd.transaction(["usuarios"], "readwrite");
    var almacen = transaccion.objectStore("usuarios");

    // 1. Eliminar registro antiguo si el usuario cambió
    if (usuarioNuevo !== usuarioOriginal) {
        almacen.delete(usuarioOriginal).onsuccess = function () {
            // 2. Agregar nuevo registro
            almacen.add({
                usuario: usuarioNuevo,
                email: email,
                clave: clave
            }).onsuccess = function () {
                Swal.fire("Éxito", "Se actualizaron los datos correctamente", "success");
                localStorage.setItem("nombreJugador", usuarioNuevo);
                usuarioOriginal = usuarioNuevo;
            };
        };
    } else {

        almacen.put({
            usuario: usuarioOriginal,
            email: email,
            clave: clave
        }).onsuccess = function () {
            localStorage.setItem("nombreJugador", txtUsuario.value);
            Swal.fire("Éxito", "Se actualizaron los datos correctamente", "success");
        };
    }
}

function Eliminar() {
    var bUsuario = txtUsuario.value;

    if (bUsuario === "") {
        Swal.fire("Atención", "Debes ingresar un usuario para eliminar", "warning");
        return;
    }

    Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            var transaccion = bd.transaction(["usuarios"], "readwrite");
            var almacen = transaccion.objectStore("usuarios");
            var borrar = almacen.delete(bUsuario);

            borrar.onsuccess = function () {
                Swal.fire("Eliminado", "El registro ha sido eliminado", "success");
                Limpiar();
            };

            borrar.onerror = function () {
                Swal.fire("Error", "No se pudo eliminar el registro", "error");
            };
        }
    });
}

function Limpiar() {
    txtUsuario.value = "";
    txtEmail.value = "";
    txtClave.value = "";
}

function Volver() {
    window.location.href = ("Registro.html");
}

window.addEventListener("load", iniciar, false);
