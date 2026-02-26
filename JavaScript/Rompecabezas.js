// Archivo JavaScript - Rompecabezas.js
// Compatible con mouse y pantallas táctiles

var n1 = Math.floor(Math.random() * 2) + 1;
var x = n1.toString(10);
var imagen = ""; // Clase de las piezas (movil1 o movil2)
var sitio = "";  // ID del SVG visible (entorno1 o entorno2)
var lugar = "";  // Clase de los contenedores (padre1 o padre2)
var ubicada = 0;

// Selecciona el rompecabezas según el número aleatorio
switch (n1) {
  case 1:
    imagen = "movil1";
    sitio = "entorno1";
    lugar = "padre1";
    break;
  case 2:
    imagen = "movil2";
    sitio = "entorno2";
    lugar = "padre2";
    break;
}

var piezas = document.getElementsByClassName(imagen);

// Muestra el SVG correspondiente al cargar la página
window.addEventListener("load", () => {
  document.getElementById(sitio).style.display = "block";
});

// Dimensiones reales de cada pieza (ancho, alto)
var tamWidht = [134, 192, 134, 163, 134, 163, 134, 192, 134];
var tamheight = [163, 134, 163, 134, 192, 134, 163, 134, 163];

// Inicializar piezas: tamaño, posición aleatoria y eventos
for (var i = 0; i < piezas.length; i++) {
  piezas[i].setAttribute("width", tamWidht[i]);
  piezas[i].setAttribute("height", tamheight[i]);
  piezas[i].setAttribute("x", Math.floor(Math.random() * 8 + 1));
  piezas[i].setAttribute("y", Math.floor(Math.random() * 259 + 80));

  // --- Eventos para MOUSE ---
  piezas[i].setAttribute("onmousedown", "seleccionarElemento(evt)");

  // --- Eventos para TÁCTIL (celular/tablet) ---
  piezas[i].setAttribute("ontouchstart", "seleccionarElemento(evt)");
}

// Variables globales para el arrastre
var elementSelect = 0;   // Elemento (image) que se está moviendo
var currentX = 0;        // Última posición X del puntero/dedo
var currentY = 0;        // Última posición Y del puntero/dedo
var currentPosX = 0;     // Posición X actual del elemento (atributo x)
var currentPosY = 0;     // Posición Y actual del elemento (atributo y)

// ------------------------------------------------------------
// Función que obtiene las coordenadas clientX/clientY
// Funciona tanto para mouse como para táctil
function getClientCoords(evt) {
  if (evt.touches) {
    // Evento táctil: usamos el primer punto de contacto
    return {
      x: evt.touches[0].clientX,
      y: evt.touches[0].clientY
    };
  } else {
    // Evento de mouse
    return {
      x: evt.clientX,
      y: evt.clientY
    };
  }
}

// ------------------------------------------------------------
// Inicia la selección/arrastre de una pieza
function seleccionarElemento(evt) {
  // Prevenir comportamientos por defecto (zoom, scroll, menú contextual)
  evt.preventDefault();

  elementSelect = reordenar(evt); // Clona y trae la pieza al frente

  var coords = getClientCoords(evt);
  currentX = coords.x;
  currentY = coords.y;

  currentPosX = parseFloat(elementSelect.getAttribute("x"));
  currentPosY = parseFloat(elementSelect.getAttribute("y"));

  // Asignar eventos de movimiento y fin de arrastre para MOUSE
  elementSelect.setAttribute("onmousemove", "moverElemento(evt)");
  elementSelect.setAttribute("onmouseout", "deseleccionarElemento(evt)");
  elementSelect.setAttribute("onmouseup", "deseleccionarElemento(evt)");

  // Asignar eventos de movimiento y fin de arrastre para TÁCTIL
  elementSelect.setAttribute("ontouchmove", "moverElemento(evt)");
  elementSelect.setAttribute("ontouchcancel", "deseleccionarElemento(evt)");
  elementSelect.setAttribute("ontouchend", "deseleccionarElemento(evt)");
}

// ------------------------------------------------------------
// Mueve la pieza mientras se arrastra
function moverElemento(evt) {
  // Fundamental en táctil: evita que la página se desplace
  evt.preventDefault();

  var coords = getClientCoords(evt);
  var dx = coords.x - currentX;
  var dy = coords.y - currentY;

  currentPosX = currentPosX + dx;
  currentPosY = currentPosY + dy;

  elementSelect.setAttribute("x", currentPosX);
  elementSelect.setAttribute("y", currentPosY);

  // Actualizar coordenadas del puntero para el próximo movimiento
  currentX = coords.x;
  currentY = coords.y;

  // Efecto imán: si está cerca de su posición correcta, salta a ella
  iman();
}

// ------------------------------------------------------------
// Finaliza el arrastre (se suelta la pieza o sale del área)
function deseleccionarElemento(evt) {
  if (elementSelect != 0) {
    // Eliminar eventos de MOUSE
    elementSelect.removeAttribute("onmousemove");
    elementSelect.removeAttribute("onmouseout");
    elementSelect.removeAttribute("onmouseup");

    // Eliminar eventos de TÁCTIL
    elementSelect.removeAttribute("ontouchmove");
    elementSelect.removeAttribute("ontouchcancel");
    elementSelect.removeAttribute("ontouchend");

    elementSelect = 0;
  }

  // Verificar cuántas piezas están bien ubicadas
  chequeo();

  // Si las 9 piezas están en su lugar, mostramos felicitaciones
  if (ubicada == 9) {
    Swal.fire({
      title: "¡Correcto!",
      text: "Has completado el rompecabezas",
      icon: "success",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false,
      didClose: () => {
        window.open("Ganaste.html", "_self");
      }
    }, 100);
  }
}

// ------------------------------------------------------------
// Clona el contenedor (g) y lo reenvía al frente del SVG
// Esto permite que la pieza arrastrada se vea sobre las demás
var entorno = document.getElementById(sitio);

function reordenar(evt) {
  var padre = evt.target.parentNode;          // <g> contenedor
  var clone = padre.cloneNode(true);          // Copia profunda
  var id = padre.getAttribute("id");

  entorno.removeChild(document.getElementById(id));
  entorno.appendChild(clone);

  // Retornamos la etiqueta <image> dentro del nuevo <g>
  return entorno.lastChild.firstChild;
}

// ------------------------------------------------------------
// Coordenadas exactas donde debe ir cada pieza (esquinas)
var origX = [200, 304, 466, 200, 333, 437, 200, 304, 466];
var origY = [100, 100, 100, 233, 204, 233, 337, 366, 337];

// Efecto "imán": si la pieza está a menos de 15px de su lugar, salta
function iman() {
  for (var i = 0; i < piezas.length; i++) {
    if (
      Math.abs(currentPosX - origX[i]) < 15 &&
      Math.abs(currentPosY - origY[i]) < 15
    ) {
      elementSelect.setAttribute("x", origX[i]);
      elementSelect.setAttribute("y", origY[i]);
    }
  }
}

// ------------------------------------------------------------
// Cuenta cuántas piezas están colocadas correctamente
function chequeo() {
  ubicada = 0;
  var padres = document.getElementsByClassName(lugar);

  for (var i = 0; i < piezas.length; i++) {
    var posx = parseFloat(padres[i].firstChild.getAttribute("x"));
    var posy = parseFloat(padres[i].firstChild.getAttribute("y"));
    var idFig = padres[i].getAttribute("id");

    // Extraer número de la pieza (ej: "10" -> "0", "11" -> "1", etc.)
    if (idFig.length == 2) {
      idFig = idFig.charAt(1);
    } else {
      idFig = padres[i].getAttribute("id");
    }

    if (origX[idFig] == posx && origY[idFig] == posy) {
      ubicada = ubicada + 1;
    }
  }
}