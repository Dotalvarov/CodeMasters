var letras = 0;
var palabras = 0;
var palabraSopa = 0;
var i = 0;
var j = 0;
var k = 0;

var filas = 10;
var columnas = 10;
var elemento_respuesta;
var id_respuesta;
var id;

var misPalabras = {};
var misIdLetras = {};
var misLetras = {};
var cuentaLetrasOK = {};
var contarPalabras = {};
var okPalabra = {};
var descripciones = {};


var letras1 = [
"S", "E", "B", "D", "O", "S", "P", "R", "I", "T", "E", "E",
"S", "C", "F", "G", "U", "M", "K", "U", "M", "P", "U", "O",
"E", "S", "R", "G", "F", "Z", "F", "O", "H", "Q", "M", "V",
"R", "B", "E", "A", "H", "V", "W", "R", "O", "I", "I", "B",
"O", "D", "W", "N", "T", "F", "A", "L", "L", "O", "C", "U",
"D", "K", "B", "N", "S", "C", "B", "I", "Y", "U", "R", "C",
"A", "D", "O", "P", "E", "O", "H", "M", "E", "C", "O", "L",
"R", "K", "T", "S", "C", "R", "R", "R", "W", "O", "B", "E",
"E", "T", "O", "H", "I", "G", "H", "E", "B", "D", "I", "H",
"P", "Z", "N", "K", "A", "Z", "Y", "Q", "S", "I", "T", "Q",
"O", "U", "B", "D", "Y", "W", "B", "K", "F", "G", "Y", "V",
"S", "E", "L", "B", "A", "I", "R", "A", "V", "O", "M", "P",

];

var idletras = [
"1", "0", "0", "0", "0", "4", "4", "4", "4", "4", "4", "7",
"2", "1", "0", "0", "0", "0", "0", "0", "0", "0", "7", "0",
"2", "5", "1", "0", "0", "0", "0", "0", "0", "7", "10", "0",
"2", "0", "5", "1", "0", "0", "0", "0", "7", "0", "10", "3",
"2", "0", "0", "5", "1", "0", "0", "7", "0", "0", "10", "3",
"2", "0", "8", "0", "5", "1", "7", "0", "0", "0", "10", "3",
"2", "0", "8", "0", "0", "5", "1", "0", "0", "9", "10", "3",
"2", "0", "8", "0", "0", "0", "5", "0", "0", "9", "10", "3",
"2", "0", "8", "0", "0", "0", "0", "5", "0", "9", "10", "0",
"2", "0", "8", "0", "0", "0", "0", "0", "5", "9", "10", "0",
"2", "0", "0", "0", "0", "0", "0", "0", "0", "9", "0", "0",
"6", "6", "6", "6", "6", "6", "6", "6", "6", "9", "0", "0"
];

var Palabras1 = [
  "VACIO",
  "SCRATCH",
  "OPERADORES",
  "BUCLE",
  "SPRITE",
  "SENSORES",
  "VARIABLES",
  "BLOQUE",
  "BOTON",
  "CODIGO",
  "MICROBIT",
];


var letras2 = [
  "C","O","N","D","I","C","I","O","N","H","W","S",
  "Y","Q","E","W","C","W","W","Y","D","P","F","I",
  "P","C","I","B","A","C","I","G","O","L","I","M",
  "R","O","P","F","L","W","O","E","T","H","N","B",
  "O","Q","I","W","Z","A","Y","L","C","I","A","O",
  "G","S","M","C","J","H","N","V","C","S","T","L",
  "R","N","K","T","I","U","H","I","C","I","D","O",
  "A","Y","C","H","T","N","T","J","M","X","C","N",
  "M","V","W","P","Y","B","I","J","H","R","Y","S",
  "A","N","C","O","N","E","C","T","O","R","E","V",
  "M","T","W","Z","L","W","P","X","C","J","K","T",
  "A","I","C","N","E","U","C","E","S","I","O","T",
];

var idletras2 = [
  "1","1","1","1","1","1","1","1","1","0","0","3",
  "0","0","0","0","0","0","0","0","0","0","9","3",
  "6","0","0","0","7","7","7","7","7","7","9","3",
  "6","8","0","0","2","0","10","0","0","0","9","3",
  "6","0","8","0","0","2","","10","0","0","0","3",
  "6","0","0","8","0","0","2","0","10","0","0","3",
  "6","0","0","0","8","0","0","2","0","10","0","3",
  "6","0","0","0","0","8","0","0","2","0","10","0",
  "6","0","0","0","0","0","8","0","0","2","0","0",
  "6","0","4","4","4","4","4","4","4","4","2","0",
  "0","0","0","0","0","0","0","0","0","0","0","2",
  "5","5","5","5","5","5","5","5","5","0","0","0",
];

var Palabras2 = [
  "VACIO",
  "CONDICION",
  "TERMINAL",
  "SIMBOLO",
  "CONECTOR",
  "SECUENCIA",
  "PROGRAMA",
  "LOGICA",
  "INICIO",
  "FIN",
  "CICLO",
];

function iniciar() {
  btnGeometria = document.getElementById("geometria");
  btnCiudades = document.getElementById("ciudades");
  btnAnimales = document.getElementById("animales");
  btnGeometria.addEventListener("click", geometria, false);
  btnAnimales.addEventListener("click", animales, false);
  document.getElementById("cajas").innerHTML = "";
}

function geometria() {
  descripciones = {
    1: "Lenguaje de programación visual, diseñado para enseñar a programar mediante bloques y de forma sencilla.",
    2: "Bloques en Scratch que permiten hacer operaciones matemáticas, comparaciones o trabajar con texto",
    3: "Instrucción que repite una acción varias veces, como “repetir” o “por siempre”.",
    4: "Personaje u objeto que se puede programar y controlar en Scratch.",
    5: "Bloques que permiten detectar acciones o condiciones, como presionar teclas, tocar un borde o usar la cámara/micrófono.",
    6: "Espacios de memoria que guardan datos, como números o texto, para usarlos dentro del programa.",
    7: "Pieza de código en Scratch que representa una instrucción; se encajan unos con otros como rompecabezas.",
    8: "Elemento interactivo que se puede presionar para ejecutar una acción o comando",
    9: "Conjunto de instrucciones que la computadora sigue para realizar una tarea.",
    10: "Pequeña tarjeta programable que permite crear proyectos interactivos con luces, botones y sensores.",
  };
  misPalabras = Palabras1;
  misLetras = letras1;
  misIdLetras = idletras;
  crearSopa();
}

function animales() {
  descripciones = {
    1: "Regla que debe cumplirse para que una acción se ejecute (ejemplo: “si llueve, abrir el paraguas”).",
    2: "Punto de inicio o fin en un diagrama de flujo; también se usa para dar comandos directamente a una computadora.",
    3: "Representación gráfica usada en diagramas o códigos para identificar acciones, procesos o datos.",
    4: "Figura que une diferentes partes de un diagrama de flujo, facilitando la continuidad.",
    5: "Serie de pasos ordenados que se ejecutan uno tras otro en un programa.",
    6: "Conjunto de instrucciones que la computadora sigue para realizar una tarea.",
    7: "Conjunto de reglas que permite tomar decisiones correctas dentro de un programa.",
    8: "Punto donde empieza un programa o un algoritmo.",
    9: "Punto donde termina un programa o un proceso.",
    10: "Repetición de un conjunto de instrucciones hasta que se cumpla una condición.",
  };
  misPalabras = Palabras2;
  misLetras = letras2;
  misIdLetras = idletras2;
  crearSopa();
}

function crearSopa() {
  palabraSopa = 0; // reset
  contarPalabras = {};
  cuentaLetrasOK = {};
  document.querySelector(".marco-sopa").classList.add("show");
  document.getElementById("cajas").innerHTML = "";
  document.getElementById("temas").innerHTML = "";
  document.getElementById("letras").innerHTML = "";
  for (i = 0; i < misLetras.length; i++) {
    document.getElementById("cajas").innerHTML +=
      "<div class= 'caja' id ='" +
      misIdLetras[i] +
      "'><strong id= '0'>" +
      misLetras[i] +
      "</strong></div>";
  }
  var letras = document.querySelectorAll("#cajas div");

  for (i = 0; i < letras.length; i++) {
    letras[i].addEventListener("click", CambiaColor, false);
    cuentaLetrasOK[i] = 0;
  }
  contarLetrasPalabras();
  llenarListaPalabras();
}

function CambiaColor(e) {
  e.preventDefault();
  elemento_respuesta = e.currentTarget;
  id_respuesta = elemento_respuesta.id;

  if (id_respuesta !== "0") {
    elemento_respuesta.setAttribute("id", "0");
    letras++;
  }
  switch (id_respuesta) {
    case "1":
      elemento_respuesta.style.background = "rgba(36,206,233,0.8)";
      break;
    case "2":
      elemento_respuesta.style.background = "rgba(10, 163, 30, 0.8)";
      break;
    case "3":
      elemento_respuesta.style.background = "rgba(255, 0, 0, 0.8)";
      break;
    case "4":
      elemento_respuesta.style.background = "rgba(197, 252, 0, 0.8)";
      break;
    case "5":
      elemento_respuesta.style.background = "rgba(0, 110, 253, 0.8)";
      break;
    case "6":
      elemento_respuesta.style.background = "rgba(233, 34, 183, 0.8)";
      break;
    case "7":
      elemento_respuesta.style.background = "rgba(182, 28, 187, 0.8)";
      break;
    case "8":
      elemento_respuesta.style.background = "rgba(110, 255, 158, 0.8)";
      break;
    case "9":
      elemento_respuesta.style.background = "rgba(57, 23, 85, 0.8)";
      break;
    case "10":
      elemento_respuesta.style.background = "rgba(15, 165, 224, 0.8)";
      break;
    case "11":
      elemento_respuesta.style.background = "rgba(15, 165, 224, 0.8)";
      break;
  }

  cuentaLetrasOK[id_respuesta] = cuentaLetrasOK[id_respuesta] + 1;
  if (cuentaLetrasOK[id_respuesta] == contarPalabras[id_respuesta]) {
    palabraSopa++; // contador
    tacharPalabra(id_respuesta);
  }

  function tacharPalabra(id) {
    // document.getElementById("letras").innerHTML
    //   "Palabra : " + misPalabras[id] + " completa";
    var okPalabra = "P" + id;
    if (document.getElementById(okPalabra)) {
      document.getElementById(okPalabra).style.color = "red";
      document.getElementById(okPalabra).style.textDecoration = "line-through";
    }

    Swal.fire({
      title: "CORRECTO",
      html: " Palabra : " + misPalabras[id] + "<br><br>" + descripciones[id],
      icon: "success",
      showConfirmButton: false,
      timer: 7000, 
    }).then(() => {
      if (palabraSopa === misPalabras.length - 1) {
        Swal.fire({
          title: "¡Ganaste!",
          icon: "success",
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          window.open("Nivel_4.html", "_self");
        });
      }
    });
  }
}

function contarLetrasPalabras() {
  for (i = 0; i < misIdLetras.length; i++) {
    let ele = misIdLetras[i];
    if (contarPalabras[ele]) {
      contarPalabras[ele] += 1;
    } else {
      contarPalabras[ele] = 1;
    }
  }
}

function llenarListaPalabras() {
  document.getElementById("listaPalabras").innerHTML = "";
  for (i = 1; i < misPalabras.length; i++) {
    var indicePalabra = "P" + i;
    document.getElementById("listaPalabras").innerHTML +=
      "<span id=" + indicePalabra + ">" + misPalabras[i] + "</span> <br> ";
  }
}

window.addEventListener("load", iniciar, false);
