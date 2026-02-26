function iniciar() {
  const radios = document.getElementsByName("respuesta");
  for (let i = 0; i < radios.length; i++) {
    radios[i].onclick = pregunta3;
  }
}

function pregunta3() {
  if (this.value === "A") {
    Swal.fire({
      title: "¡Correcto!",
      text: "El bloque 'si ... entonces ... si no' permite que el programa elija entre dos opciones según la condición, ejecutando diferentes acciones según sea verdadera o falsa.",
      icon: "success",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false,
      didClose: () => {
        window.open("Nivel_2.html", "_self");
      }
    }, 100);
  } else if (this.value === "B") {
    Swal.fire({
      title: "Incorrecto",
      text: "No es correcto. Aunque el bloque 'si ... entonces ... si no' ejecuta instrucciones según condiciones, la opción B está formulada de forma ambigua y no es la mejor respuesta aquí.",
      icon: "error",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false
    });
  } else if (this.value === "C") {
    Swal.fire({
      title: "Incorrecto",
      text: "Incorrecto. Repetir acciones hasta que una condición deje de cumplirse corresponde a un bloque de repetición, no a un condicional 'si ... entonces ... si no'.",
      icon: "error",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false
    });
  } else if (this.value === "D") {
    Swal.fire({
      title: "Incorrecto",
      text: "No es correcto. El bloque 'si ... entonces ... si no' depende de una condición para ejecutar acciones, no cambia el estado automáticamente sin condiciones.",
      icon: "error",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false
    });
  }
}

window.addEventListener("load", iniciar, false);
