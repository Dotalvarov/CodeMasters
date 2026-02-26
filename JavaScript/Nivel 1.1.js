function iniciar() {
  const radios = document.getElementsByName("respuesta");
  for (let i = 0; i < radios.length; i++) {
    radios[i].onclick = pregunta1;
  }
}

function pregunta1() {
  if (this.value === "C") {
    Swal.fire({
      title: "¡Correcto!",
      text: "El bloque 'distancia a [objeto]' calcula la distancia entre el sprite actual y otro objeto o posición.",
      icon: "success",
      timer: 4000,
      timerProgressBar: true,
      showConfirmButton: false,
      didClose: () => {
        window.open("Nivel_1.2.html", "_self");
      }
    },100);
  } else if (this.value === "A") {
    Swal.fire({
      title: "Incorrecto",
      text: "El bloque no hace desaparecer al personaje, solo mide distancias.",
      icon: "error",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false
    });
  } else if (this.value === "B") {
    Swal.fire({
      title: "Incorrecto",
      text: "Scratch no cuenta pasos que un personaje da; este bloque mide distancias, no pasos.",
      icon: "error",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false
    });
  } else if (this.value === "D") {
    Swal.fire({
      title: "Incorrecto",
      text: "Detectar contacto entre sprites es diferente a medir distancia entre ellos.",
      icon: "error",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false
    });
  }
}

window.addEventListener("load", iniciar, false);
