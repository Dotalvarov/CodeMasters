document.addEventListener('DOMContentLoaded', () => {
    var pareja = 0;

    var cards = [
        '1', '1', '2', '2',
        '3', '3', '4', '4',
        '5', '5', '6', '6',
        '7', '7', '8', '8',
        '9', '9', '10', '10'
    ];

    // Descripciones de cada pareja 
    var descripciones = {
        "1": "Este es el logotipo oficial de micro:bit. Representa el dispositivo con sus dos botones frontales y se utiliza como símbolo para identificar la placa y sus recursos.",
        "2": "El gato de Scratch es el personaje principal que aparece al comenzar un nuevo proyecto. Sirve como figura base para crear animaciones, juegos e historias, aunque se puede cambiar o reemplazar por otros personajes.",
        "3": "La bandera verde es el botón de inicio en Scratch. Al hacer clic en ella, comienza la ejecución del programa y pone en marcha todas las instrucciones que se hayan configurado para ese evento.",
        "4": "El botón rojo en forma de octágono sirve para detener el proyecto en Scratch. Al hacer clic en él, todas las acciones y bloques en ejecución se paran al instante.",
        "5": "La categoría Sensores en Scratch tiene bloques que detectan lo que pasa en el proyecto, como si se toca una tecla, el movimiento del mouse o la posición de un objeto.",
        "6": "La categoría Apariencia en Scratch tiene bloques para cambiar cómo se ve un personaje o escenario, como mostrar mensajes, cambiar disfraces o modificar colores.",
        "7": "La sección Eventos en Scratch incluye bloques que sirven para arrancar o activar acciones cuando pasa algo, como hacer clic en la bandera verde, presionar una tecla o recibir un mensaje.",
        "8": "La categoría Control en Scratch ofrece bloques que permiten manejar el orden de las acciones, como repetir instrucciones, esperar cierto tiempo o decidir con condiciones qué se ejecuta.",
        "9": "La sección Operadores en Scratch tiene bloques que permiten hacer cálculos, comparar valores o trabajar con texto. Se usan para tomar decisiones y dar más lógica a los proyectos.",
        "10": "La categoría Variables en Scratch permite crear bloques que guardan información, como números, nombres o puntos. Sirven para recordar datos y usarlos durante el proyecto."
    };

    //barajar las imagenes 
    cards.sort(() => 0.5 - Math.random());
    console.log(cards);

    //defiimos el objeto tablero
    var tablero = document.getElementById('tablero');
    var hasFlippedCard = false;
    var lockBoard = true;
    var firstCard, secondCard;

    //crear las cartas en el tablero
    var posicion = 0;
    var i = 0;
    cards.forEach(card => {
        posicion = card[i];
        i++;
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        //Le pone a la carta su número(1, 2, 3...) como id en el HTML
        cardElement.id = card;

        var imagen = "<img src=" + "IMAGENES/Concentrese/" + card + ".png" + ">";

        cardElement.innerHTML = "<div class='front'>" + imagen + "</div>" +
            "<div class='back'></div>";

        tablero.appendChild(cardElement);
        cardElement.addEventListener('click', flipCard);

    });

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            //Primer click
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        //Segundo click
        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        lockBoard = true;
        let isMatch = firstCard.innerHTML === secondCard.innerHTML;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        lockBoard = true;

        // sumo la pareja encontrada
        pareja++;

        // Guarda en la variable id el número de la carta volteada
        var id = firstCard.id;

        Swal.fire({
            title: "¡Pareja encontrada!",
            text: descripciones[id],
            icon: "success",
            customClass: {
                popup: "Contenedor",
                confirmButton: "alerta",
                htmlContainer: "descrip",
            },
            timer: 10000,
            timerProgressBar: true,
            showConfirmButton: false,
            didClose: () => {
                if (pareja === 10) {
                    Swal.fire({
                        title: "¡Ganaste!",
                        text: "Haz completado el concéntrese",
                        icon: "success",
                        timer: 5000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        didClose: () => {
                            window.open("Nivel_5.html", "_self");
                        }
                    });
                }
            }
        });

        resetBoard();
    }

    function unflipCards() {
        //alert("hola");
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    document.querySelectorAll(".card").forEach(card => {
        card.classList.add("flip"); // se muestran todas al inicio
    });



    setTimeout(() => {
        document.querySelectorAll(".card").forEach(card => {
            card.classList.remove("flip"); // se voltean después de 3 segundos
        });
        lockBoard = false;
    }, 5000);


});

