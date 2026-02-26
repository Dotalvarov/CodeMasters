// Documento JavaScript

window.indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB;

var bd;
var zonadatos;
var cursor;
var cuenta = 0;

function iniciar() {
  txtemail = document.getElementById("email");
  txtUsuario = document.getElementById("usuario");
  txtClave = document.getElementById("clave");
  btnRegistrar = document.getElementById("Registrar");

  btnRegistrar.addEventListener("click", Registrar, false);
}

var solicitud = indexedDB.open("Code_Masters");

solicitud.onsuccess = function (e) {
  bd = e.target.result;
  // alert("La base de datos se conecto con exito");
};

solicitud.onupgradeneeded = function (e) {
  bd = e.target.result;
  bd.createObjectStore("gente", { keyPath: "clave" });
  var tbUsuarios = bd.createObjectStore("usuarios", { keyPath: "usuario" });
  tbUsuarios.createIndex("email", "email", { keyPath: false });
  tbUsuarios.createIndex("usuario", "usuario", { keyPath: false });
  tbUsuarios.createIndex("clave", "clave", { unique: false });
};

function Registrar() {

  var form = document.querySelector("form");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  
  var email = txtemail.value;
  var usuario = txtUsuario.value;
  var clave = txtClave.value;
  var transaccion = bd.transaction(["usuarios"], "readwrite");
  var almacen = transaccion.objectStore("usuarios");

  if (
    txtUsuario.value === "" ||
    txtemail.value === "" ||
    txtClave.value === ""
  ) {
    return;
  }

  // Revisar si el usuario ya existe
  var consultaUsuario = almacen.get(usuario);
  consultaUsuario.onsuccess = function () {
    if (consultaUsuario.result) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "Usuario Repetido",
      });
      return;
    }

    // Revisar si el correo ya existe usando el índice
    var indexEmail = almacen.index("email");
    var consultaEmail = indexEmail.get(email);
    consultaEmail.onsuccess = function () {
      if (consultaEmail.result) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          title: "Correo Repetido",
        });
        return;
      }

      // Si no existe usuario ni correo, se agrega
      var agregar = almacen.add({
        usuario: usuario,
        email: email,
        clave: clave,
      });

      agregar.onsuccess = function () {
        localStorage.setItem("nombreJugador", usuario);
      };

      agregar.onerror = function () {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo registrar el usuario",
        });
      };
      //alert("El registro se realizo con exito");
      window.open("iniciar sesión.html", "_top");
    };
  };
}

window.addEventListener("load", iniciar, false);
