//Documento JAVASCRIPT

function iniciarAyuda() {
    //alert("Estoy en ayuda.js - SOPA DE LETRAS")

    const btnboton = document.getElementById("boton");
    const contenedor = document.getElementById("contenedor");
    const btnclose = document.getElementById("close");
    //contenedor.classlist.add("show");
    btnboton.addEventListener("click", function () {
    contenedor.classList.add("show");
        });

    btnclose.addEventListener("click", () => {
        contenedor.classList.remove("show");
    });

    const btnVer = document.getElementById("botonVer");
    const palabras = document.getElementById("VerPalabras");
    const btnCerrar = document.getElementById("cerrar");
    //contenedor.classlist.add("show");
    btnVer.addEventListener("click", function () {
            palabras.classList.add("show");
        });

    btnCerrar.addEventListener("click", () => {
        palabras.classList.remove("show");
    });
    
}


window.addEventListener("load", iniciarAyuda, false);