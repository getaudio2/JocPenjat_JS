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
const lletresSection = document.getElementById("container-lletres");

botoMostrar.addEventListener("click", mostrarParaula);
botoComencar.addEventListener("click", comencarPartida);

// Variables locals JS
let paraulaIntroduida;
let paraulaArray;
let paraulaActual = [];
let comptador = 0;
let puntsActuals = 0;
let totalPartides = 0;
let partidesGuanyades = 0;
let highscore = 0;
let tornJugador = 0;
let puntsJugadors = [0,0];

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
}

function jugarLletra(lletra) {

    deshabilitarLletra(lletra);
    let lletraJugada = lletra.textContent
    
    // Si encerta la lletra
    if (paraulaArray.includes(lletraJugada)) {
        for (let i = 0; i < paraulaArray.length; i++) {
            if (paraulaArray[i] === lletraJugada) {
                paraulaActual[i] = lletraJugada;
                puntsActuals++;
            }
        }
        displayParaulaActual.textContent = paraulaActual.join("");
        
        // Si encerta la paraula secreta
        if (paraulaActual.join("") === paraulaArray.join("")) {
            deshabilitarInput(false);
            document.getElementById("paraula-actual").style.backgroundColor = "#dcfaa6";

            actualitzarHighscore();
            actualitzarTotalPartides();
            actualitzarPartidesGuanyades();
        }
    // Si falla la lletra
    } else {
        puntsActuals--;
        if (puntsActuals == -1) puntsActuals = 0;

        comptador++;
        if (comptador == 10) { // Si ha fallat 10 vegades -> Dibuix de hangman completat
            displayParaulaActual.textContent = paraulaArray.join("");
            document.getElementById("paraula-actual").style.backgroundColor = "#FF0000";

            deshabilitarInput(false);
            actualitzarTotalPartides();
        }
        inputImg.src = "img/penjat_" + comptador + ".jpg";
    }

    displayPuntsActuals.textContent = puntsActuals;

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
    partidesGuanyades++;
    displayPartidesGuanyades.textContent = partidesGuanyades;
}

function actualitzarHighscore() {
    if (puntsActuals > highscore) {
        highscore = puntsActuals;
        displayPartidaHighscore.textContent = new Date().toLocaleString() + " - " + highscore + " punts";
    }
}

function netejarPartida() {
    document.getElementById("paraula-actual").style.backgroundColor = "#c8d1f3";
    puntsActuals = 0;
    displayPuntsActuals.textContent = puntsActuals;
    paraulaActual = [];
    inputImg.src = "img/penjat_0.jpg";
    comptador = 0;
}

function actualitzarTotalPartides(){
    totalPartides++;
    displayTotalPartides.textContent = totalPartides;
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