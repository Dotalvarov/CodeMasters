function iniciar() {
  const radios = document.getElementsByName("respuesta");
  for (let i = 0; i < radios.length; i++) {
    radios[i].onclick = pregunta1;
  }
}

function pregunta1() {
  if (this.value === "D") {
    Swal.fire({
      title: "¡Correcto!",
      text: "El bloque cambia la orientación del personaje a una dirección específica en el escenario.",
      icon: "success",
      timer: 4000,
      timerProgressBar: true,
      showConfirmButton: false,
      didClose: () => {
        window.open("Nivel_1.1.html", "_self");
      }
    },100);
  } else if (this.value === "A") {
    Swal.fire({
      title: "Incorrecto",
      text: "Revisa si el bloque usa una dirección relativa o absoluta. ¿Se basa en la dirección anterior o fija un valor?",
      icon: "error",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false
    });
  } else if (this.value === "B") {
    Swal.fire({
      title: "Incorrecto",
      text: "Este bloque no ejecuta una animación progresiva. Piensa si cambia algo de forma inmediata.",
      icon: "error",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false
    });
  } else if (this.value === "C") {
    Swal.fire({
      title: "Incorrecto",
      text: "Reflexiona sobre qué eje utiliza Scratch al establecer direcciones: ¿vertical u horizontal?",
      icon: "error",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false
    });
  }
}

window.addEventListener("load", iniciar, false);