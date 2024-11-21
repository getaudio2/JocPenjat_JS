// Variables del HTML
const inputParaula = document.getElementById("paraula-input");
const inputImg = document.getElementById("imatge");
const botoComencar = document.getElementById("boto-comencar");
const botoMostrar = document.getElementById("boto-mostrar");
const displayParaulaActual = document.getElementById("paraula-actual");
const displayPuntsActuals = document.getElementById("punts-partides-actuals");
const displayTotalPartides = document.getElementById("total-partides");
const displayPartidesGuanyades = document.getElementById("partides-guanyades");
const displayPartidaHighscore = document.getElementById("partida-highscore");
const displayPuntsActuals2 = document.getElementById("punts-partides-actuals2");
const displayTotalPartides2 = document.getElementById("total-partides2");
const displayPartidesGuanyades2 = document.getElementById("partides-guanyades2");
const displayPartidaHighscore2 = document.getElementById("partida-highscore2");
const panelJugador1 = document.getElementById("jugador1");
const panelJugador2 = document.getElementById("jugador2");
const lletresSection = document.getElementById("container-lletres");

botoMostrar.addEventListener("click", mostrarParaula);
botoComencar.addEventListener("click", comencarPartida);

// Variables locals JS
let paraulaIntroduida;
let paraulaArray;
let paraulaActual = [];
let comptador = 0;

const jugador1 = {
    puntsActuals: 0,
    totalPartides: 0,
    partidesGuanyades: 0,
    highscore: 0,
    dataHighscore: new Date()
}
const jugador2 = {
    puntsActuals: 0,
    totalPartides: 0,
    partidesGuanyades: 0,
    highscore: 0,
    dataHighscore: new Date()
}

let tornJugador = 0;
let puntsJugadors = [0,0];
let comboPunts = 0;

function comencarPartida() {

    netejarPartida();

    paraulaIntroduida = inputParaula.value.toUpperCase();
    if (!validarParaulaIntroduida(paraulaIntroduida)) return;

    paraulaArray = paraulaIntroduida.split("");
    for (let i = 0; i < paraulaArray.length; i++) {
        paraulaActual.push("_");
    }

    displayParaulaActual.textContent = paraulaActual.join("");
    inputParaula.value = "";
    deshabilitarInput(true);

    tornJugador = 0;
    canviColorTorn(tornJugador);
}

function jugarLletra(lletra) {

    deshabilitarLletra(lletra);
    let lletraJugada = lletra.textContent
    
    // Si encerta la lletra
    if (paraulaArray.includes(lletraJugada)) {
        comboPunts++;
        for (let i = 0; i < paraulaArray.length; i++) {
            if (paraulaArray[i] === lletraJugada) {
                paraulaActual[i] = lletraJugada;
                puntsJugadors[tornJugador] += comboPunts;
            }
        }
        displayParaulaActual.textContent = paraulaActual.join(""); // Actualitza la paraula secreta
        
        // Si encerta la paraula secreta
        if (paraulaActual.join("") === paraulaArray.join("")) {
            deshabilitarInput(false);
            document.getElementById("paraula-actual").style.backgroundColor = "#dcfaa6";

            actualitzarHighscore();
            actualitzarPartidesGuanyades();
            actualitzarTotalPartides();
        }
    // Si falla la lletra
    } else {
        comboPunts = 0; // Reiniciar el combo de lletres encertades
        puntsJugadors[tornJugador]--;
        if (puntsJugadors[tornJugador] == -1) puntsJugadors[tornJugador] = 0;

        comptador++; // Actualitzar número d'errors
        inputImg.src = "img/penjat_" + comptador + ".jpg"; // Actualitzar imatge Hangman
        tornJugador = (tornJugador == 0) ? 1 : 0; // Canvi de torn
        canviColorTorn(tornJugador); 
        if (comptador == 10) { // Si ha fallat 10 vegades -> Dibuix de hangman completat
            displayParaulaActual.textContent = paraulaArray.join("");
            document.getElementById("paraula-actual").style.backgroundColor = "#FF0000";

            deshabilitarInput(false);
            actualitzarTotalPartides();
        }
    }

    displayPuntsActuals.textContent = puntsJugadors[0];
    displayPuntsActuals2.textContent = puntsJugadors[1];
}

function canviColorTorn(torn) {
    if (torn == 0) {
        panelJugador1.style.backgroundColor = "#53bc94";
        panelJugador2.style.backgroundColor = "#bc5371";
    } else {
        panelJugador1.style.backgroundColor = "#bc5371";
        panelJugador2.style.backgroundColor = "#53bc94";
    }
}

function validarParaulaIntroduida(paraulaIntroduida) {
    if (!paraulaIntroduida) {
        alert("Has d’afegir una paraula per poder començar a jugar");
        return false;
    } else if (/\d/.test(paraulaIntroduida)) {
        alert("La paraula no pot contenir números"); 
        return false;
    } else if (paraulaIntroduida.length <= 3) {
        alert("La paraula ha de contenir més de 3 caràcters");
        return false;
    } else if (paraulaIntroduida.includes(" ")) {
        alert("La paraula no pot tenir espais");
        return false;
    }
    return true;
}

function mostrarParaula() {

    if (inputParaula.type === "password") {
        inputParaula.type = "text";
    } else {
        inputParaula.type = "password";
    }

}

function actualitzarPartidesGuanyades() {
    if (puntsJugadors[0] > puntsJugadors[1]) {
        jugador1.partidesGuanyades++;
    } else {
        jugador2.partidesGuanyades++;
    }
}

function actualitzarHighscore() {
    if (puntsJugadors[0] > jugador1.highscore) {
        jugador1.highscore = puntsJugadors[0];
        jugador1.dataHighscore = new Date().toLocaleString();
        displayPartidaHighscore.textContent = jugador1.dataHighscore + " - " + jugador1.highscore + " punts";
    }
    if (puntsJugadors[1] > jugador2.highscore) {
        jugador2.highscore = puntsJugadors[1];
        jugador2.dataHighscore = new Date().toLocaleString();
        displayPartidaHighscore2.textContent = jugador2.dataHighscore + " - " + jugador2.highscore + " punts";
    }
}

function netejarPartida() {
    document.getElementById("paraula-actual").style.backgroundColor = "#c8d1f3";
    puntsJugadors = [0,0];
    displayPuntsActuals.textContent = 0;
    displayPuntsActuals2.textContent = 0;
    paraulaActual = [];
    inputImg.src = "img/penjat_0.jpg";
    comptador = 0;
    comboPunts = 0;
}

function actualitzarTotalPartides(){
    jugador1.totalPartides++;
    jugador2.totalPartides++;
    displayTotalPartides.textContent = jugador1.totalPartides;
    displayTotalPartides2.textContent = jugador2.totalPartides;

    let percentatge = (jugador1.partidesGuanyades / jugador1.totalPartides) * 100;
    displayPartidesGuanyades.textContent = jugador1.partidesGuanyades + " (" + percentatge.toFixed(2) + "%)";
    let percentatge2 = (jugador2.partidesGuanyades / jugador2.totalPartides) * 100;
    displayPartidesGuanyades2.textContent = jugador2.partidesGuanyades + " (" + percentatge2.toFixed(2) + "%)";
}

function deshabilitarLletra(lletra) {
    lletra.disabled = true;
    lletra.style.borderColor = "#FF0000";
    lletra.style.color = "#FF0000";
}

function deshabilitarInput(valor) {
    inputParaula.disabled = valor;
    botoComencar.disabled = valor;
    deshabilitarLletres(!valor);
    botoComencar.style.borderColor = (valor == true) ? "#FF0000" : "#000000"
    botoComencar.style.color = (valor == true) ? "#FF0000" : "#000000"
}

function deshabilitarLletres(valor) {

    for (let i = 1; i < 27; i++) {
        let botoId = "boto_" + i;
        let boto = document.getElementById(botoId);
        boto.disabled = valor;

        boto.style.borderColor = (valor == true) ? "#FF0000" : "#000000"
        boto.style.color = (valor == true) ? "#FF0000" : "#000000"
    }

}

deshabilitarLletres(true);