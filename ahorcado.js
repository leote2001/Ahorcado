let juego = false;
let pierde;
let palabra;
let cantLetras;
let aciertos = 0;
let errores = 0;
let inputsArray = [];
let correcto;
let btnEmpezar = document.querySelector("#btnEmpezar");
let inputJugador = document.querySelector("#inputJugador");
let btnJugar = document.querySelector("#btnJugar");

btnEmpezar.addEventListener("click", empezar);

btnJugar.addEventListener("click", function () {
    event.preventDefault();
    const parrafoInput = document.querySelector("#parrafoInput");
    if (!inputJugador.validity.valid) {
        parrafoInput.textContent = "Debes ingresar una letra";
    } else {
        parrafoInput.textContent = "";
    }
    jugar();
    verificar();
});

function empezar() {
    var musicaJuego = document.querySelector("#musicaJuego");
    musicaJuego.volume = 0.5;
    btnEmpezar.textContent = "Reiniciar";
    if (juego) {
        reiniciar();
    }
    musicaJuego.play();
    musicaJuego.loop = true;
    let palabras = ["perro", "gato", "mesa", "entrenador", "catedral", "alumnos", "casa", "programa", "guitarra", "promoción", "periodista", "amanecer"];
    let random = Math.floor(Math.random() * palabras.length);
    palabra = palabras[random];
    cantLetras = palabra.length;
    inputJugador.removeAttribute("disabled");
    btnJugar.removeAttribute("disabled");
    const divSpan = document.querySelector("#divSpan");
    const parrafoCantLetras = document.querySelector("#parrafoCantLetras");
    parrafoCantLetras.textContent = `La palabra tiene ${cantLetras} letras`;
    for (let i = 0; i < cantLetras; i++) {
        let span = document.createElement("span");
        span.id = "span" + i;
        span.style.display = "inline-block";
        span.className = "mx-3";
        span.textContent = "*";
        divSpan.appendChild(span);
    }
    juego = true;
}

function reiniciar() {
    musicaJuego.pause();
    musicaJuego.currentTime = 0;
    pierde = false;
    inputsArray = [];
    const imgAhorcado = document.querySelector("#imgAhorcado");
    imgAhorcado.src = "img/0.jpg";
    const figCaption = document.querySelector("figcaption");
    figCaption.textContent = "";
    aciertos = 0;
    errores = 0;
    document.querySelector("#parrafoInput").textContent = "";
    document.querySelector("#parrafoErrores").textContent = "";
    document.querySelectorAll("span").forEach(function (span) {
        span.remove();
    });
    if (document.querySelector("li")) {
        document.querySelectorAll("li").forEach(function (li) {
            li.remove();
        });
    }
}

function jugar() {
    inputJugadorValue = inputJugador.value.toLowerCase();
    correcto = false;
    if (!inputsArray.includes(inputJugadorValue)) {
        inputsArray.push(inputJugadorValue);
        for (let i = 0; i < cantLetras; i++) {
            if (palabra.charAt(i) === inputJugadorValue) {
                const span = document.querySelector("#span" + i);
                span.textContent = palabra.charAt(i);
                correcto = true;
                aciertos++;
            }
        }
        if (correcto) {
            const letraCorrectaAudio = document.querySelector("#letraCorrecta");
            letraCorrectaAudio.currentTime = 0;
            letraCorrectaAudio.play();
        } else {
            const letraEquivocada = document.querySelector("#letraEquivocada");
            letraEquivocada.currentTime = 0;
            letraEquivocada.volume = 0.7;
            letraEquivocada.play();
        }
        const listaErrores = document.querySelector("#listaErrores");
        const parrafoErrores = document.querySelector("#parrafoErrores");
        const imgArray = ["", "img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg", "img/6.jpg", "img/7.jpg", "img/8.jpg", "img/9.jpg"];
        const imgAhorcado = document.querySelector("#imgAhorcado");
        const figCaptionArray = ["", "Se coloca la cabeza del muñeco", "Se coloca el tronco del muñeco", "Se coloca el primer brazo del muñeco", "Se coloca el segundo brazo del muñeco", "Se coloca la primera pierna del muñeco", "Se coloca la segunda pierna del muñeco", "Se colocan los ojos en la cara del muñeco", "Se coloca la boca en la cara del muñeco", "Se muestra el muñeco completo"];
        let figCaption = document.querySelector("figcaption");
        if (!correcto && inputJugador.validity.valid) {
            errores++;
            imgAhorcado.src = imgArray[errores];
            figCaption.textContent = figCaptionArray[errores];
            parrafoErrores.textContent = errores + " errores";
            let li = document.createElement("li");
            li.textContent = inputJugador.value;
            listaErrores.appendChild(li);
        }
    }
    inputJugador.value = "";
}

function verificar() {
    if (errores == 9) {
        pierde = true;
    }
    if (aciertos == cantLetras) {
        musicaJuego.pause();
        const ganaJuego = document.querySelector("#ganaJuego");
        ganaJuego.play();
        inputJugador.setAttribute("disabled", "");
        btnJugar.setAttribute("disabled", "");
        ganaJuego.addEventListener("ended", function () {
            let mensaje = "Ganaste! La palabra es: " + palabra + ". Quiéres volver a jugar?";
            confirmar(mensaje);
        });
    } else if (pierde) {
        musicaJuego.pause();
        const pierdeJuego = document.querySelector("#pierdeJuego");
        pierdeJuego.play();
        inputJugador.setAttribute("disabled", "");
        btnJugar.setAttribute("disabled", "");
        pierdeJuego.addEventListener("ended", function () {
            let mensaje = "Perdiste! La palabra es: " + palabra + ". Quiéres volver a jugar?";
            confirmar(mensaje);
        });
    }
}

function confirmar(mensaje) {
    if (confirm(mensaje)) {
        btnEmpezar.click();
    }
}