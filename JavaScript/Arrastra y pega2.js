var id;
var src;
var id_respuesta;
var solucion;
var encontro;
var rBuenas = 0;
var elemento_respuesta;
var texto_original = {};
var touchDragActive = false;
var touchClone = null;
var touchStartId = null;
var touchStartSrc = null;
var touchStartElement = null;

function iniciar() {
    solucion = ["15", "21", "34", "43", "52"];
    var consola = document.getElementById("consola");

    var zonas = document.querySelectorAll(".zonadestino");
    zonas.forEach(z => {
        texto_original[z.id] = z.innerHTML;
    });

    var imagenes = document.querySelectorAll("#cajaimagenes img");
    for (var i = 0; i < imagenes.length; i++) {
        imagenes[i].addEventListener("dragstart", inicia_arrastre, false);
        imagenes[i].addEventListener("dragend", terminado, false);
        imagenes[i].addEventListener("touchstart", touchInicia, { passive: false });
        imagenes[i].addEventListener("touchmove", touchMueve, { passive: false });
        imagenes[i].addEventListener("touchend", touchTermina, { passive: false });
        imagenes[i].addEventListener("touchcancel", touchCancela, { passive: false });
    }

    var respuestas = document.querySelectorAll("#respuestas section");
    for (var i = 0; i < respuestas.length; i++) {
        respuestas[i].addEventListener("dragenter", function (e) { e.preventDefault(); }, false);
        respuestas[i].addEventListener("dragover", entrando, false);
        respuestas[i].addEventListener("drop", soltado, false);
        respuestas[i].addEventListener("dragleave", saliendo, false);
    }
    
    document.addEventListener("touchmove", function (e) {
        if (touchDragActive) {
            e.preventDefault();
        }
    }, { passive: false });
    
    document.addEventListener("contextmenu", function (e) {
        if (e.target.closest("#cajaimagenes img")) {
            e.preventDefault();
        }
    });
}

function inicia_arrastre(e) {
    var elemento = e.target;
    id = elemento.id;
    src = elemento.src;
}

function entrando(e) {
    e.preventDefault();
    elemento_respuesta = e.currentTarget;
    id_respuesta = elemento_respuesta.id;

    var buscar = id + id_respuesta;
    encontro = 0;

    for (var i = 0; i < solucion.length; i++) {
        if (buscar == solucion[i]) {
            encontro = 1;
        }
    }
}

function saliendo(e) {
    e.preventDefault();
    elemento_respuesta = e.currentTarget;

    encontro = 0;

    if (!elemento_respuesta.querySelector("img")) {
        elemento_respuesta.innerHTML = texto_original[elemento_respuesta.id];
    }
}

function terminado(e) {
    var elemento = e.target;
    if (encontro == 1) {
        elemento.style.visibility = "hidden";
    }
}

function soltado(e) {
    e.preventDefault();
    elemento_respuesta = e.currentTarget;
    
    if (elemento_respuesta.querySelector("img")) {
        Swal.fire({
            title: "Zona ocupada",
            text: "Esta zona ya tiene una imagen",
            icon: "warning",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
        });
        return;
    }

    let descripciones = {
        "1": "Detecta el inicio del programa. Este bloque se activa cuando se hace clic en la bandera verde y marca el punto de partida del código.",
        "2": "Cambia la dirección del objeto. Este bloque gira el objeto hacia la derecha la cantidad de grados indicada (en este caso, 15°).",
        "3": "Desplaza el objeto hacia adelante. Este bloque mueve el objeto en la dirección en la que está apuntando, avanzando la cantidad de pasos indicada (en este caso, 10).",
        "4": "Este bloque permite que el objeto muestre un mensaje en pantalla. En este caso, el personaje dice “¡Hola!”, lo cual sirve para comunicarse con el usuario o dar información..",
        "5": "Ejecuta una acción varias veces. Este bloque repite el código que contiene la cantidad de veces indicada (en este caso, 10)."
    };

    if (encontro == 1) {
        elemento_respuesta.innerHTML = "<img src='" + src + "' draggable='false' style='width: 100%; height: 100%; object-fit: contain;'>";
        rBuenas = rBuenas + 1;

       Swal.fire({
            title: "¡Correcto!",
            text: descripciones[id],
            icon: "success",
            customClass: {
                popup: "Contenedor",
                confirmButton: "alerta",
                htmlContainer: "descrip",
            },
            timer: 7000,
            timerProgressBar: true,
            showConfirmButton: false,
            didClose: () => {
                if (rBuenas == 5) {
                    console.log("PASÓ A OTRO NIVEL!!!");
                    Swal.fire({
                        title: "Haz completado el nivel",
                        icon: "success",
                         html: "<br>",
                        timer: 5000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        didClose: () => {
                            window.open("Nivel_3.html", "_self");
                        }
                    });
                }
            }
        });

    } else {
        Swal.fire({
            title: "Incorrecto",
            text: "Esa imagen no corresponde con la función",
            icon: "error",
            customClass: {
                popup: "Contenedor",
                confirmButton: "alerta",
                htmlContainer: "desc"
            },
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false
        });
    }
}

function touchInicia(e) {
    e.preventDefault();
    var touch = e.touches[0];
    var elemento = e.currentTarget;

    touchStartElement = elemento;
    touchStartId = elemento.id;
    touchStartSrc = elemento.src;

    touchClone = elemento.cloneNode(true);
    touchClone.id = "clone-" + Date.now();
    touchClone.style.position = "absolute";
    touchClone.style.left = touch.clientX - 40 + "px";
    touchClone.style.top = touch.clientY - 40 + "px";
    touchClone.style.width = "80px";
    touchClone.style.height = "80px";
    touchClone.style.opacity = "0.7";
    touchClone.style.pointerEvents = "none";
    touchClone.style.zIndex = "9999";
    document.body.appendChild(touchClone);

    touchDragActive = true;
    
    id = touchStartId;
    src = touchStartSrc;
}

function touchMueve(e) {
    if (!touchDragActive || !touchClone) return;
    e.preventDefault();

    var touch = e.touches[0];
    touchClone.style.left = touch.clientX - 40 + "px";
    touchClone.style.top = touch.clientY - 40 + "px";
}

function touchTermina(e) {
    if (!touchDragActive || !touchClone) {
        touchCancela(e);
        return;
    }
    e.preventDefault();

    var touch = e.changedTouches[0];
    var elementoAbajo = document.elementFromPoint(touch.clientX, touch.clientY);
    var zonaDestino = elementoAbajo ? elementoAbajo.closest(".zonadestino") : null;

    if (touchClone) {
        touchClone.remove();
        touchClone = null;
    }

    if (!zonaDestino) {
        touchDragActive = false;
        return;
    }

    if (zonaDestino.querySelector("img")) {
        Swal.fire({
            title: "Zona ocupada",
            text: "Esta zona ya tiene una imagen",
            icon: "warning",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
        });
        touchDragActive = false;
        return;
    }

    var buscar = touchStartId + zonaDestino.id;
    var correcto = false;
    for (var i = 0; i < solucion.length; i++) {
        if (buscar == solucion[i]) {
            correcto = true;
            break;
        }
    }

    let descripciones = {
        "1": "Detecta el inicio del programa. Este bloque se activa cuando se hace clic en la bandera verde y marca el punto de partida del código.",
        "2": "Cambia la dirección del objeto. Este bloque gira el objeto hacia la derecha la cantidad de grados indicada (en este caso, 15°).",
        "3": "Desplaza el objeto hacia adelante. Este bloque mueve el objeto en la dirección en la que está apuntando, avanzando la cantidad de pasos indicada (en este caso, 10).",
        "4": "Este bloque permite que el objeto muestre un mensaje en pantalla. En este caso, el personaje dice “¡Hola!”, lo cual sirve para comunicarse con el usuario o dar información..",
        "5": "Ejecuta una acción varias veces. Este bloque repite el código que contiene la cantidad de veces indicada (en este caso, 10)."
    };

    if (correcto) {
        zonaDestino.innerHTML = "<img src='" + touchStartSrc + "' draggable='false' style='width: 100%; height: 100%; object-fit: contain;'>";
        if (touchStartElement) {
            touchStartElement.style.visibility = "hidden";
        }
        rBuenas = rBuenas + 1;

        Swal.fire({
            title: "¡Correcto!",
            text: descripciones[touchStartId],
            icon: "success",
            customClass: {
                popup: "Contenedor",
                confirmButton: "alerta",
                htmlContainer: "descrip",
            },
            timer: 7000,
            timerProgressBar: true,
            showConfirmButton: false,
            didClose: () => {
                if (rBuenas == 5) {
                    console.log("PASÓ A OTRO NIVEL!!!");
                    Swal.fire({
                        title: "Haz completado el nivel",
                        icon: "success",
                        html: "<br>",
                        timer: 5000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        didClose: () => {
                            window.open("Nivel_3.html", "_self");
                        }
                    });
                }
            }
        });
    } else {
        Swal.fire({
            title: "Incorrecto",
            text: "Esa imagen no corresponde con la función",
            icon: "error",
            customClass: {
                popup: "Contenedor",
                confirmButton: "alerta",
                htmlContainer: "desc"
            },
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false
        });
    }

    touchDragActive = false;
}

function touchCancela(e) {
    if (touchClone) {
        touchClone.remove();
        touchClone = null;
    }
    touchDragActive = false;
}

window.addEventListener("load", iniciar, false);