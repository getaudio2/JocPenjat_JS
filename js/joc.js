// Variables del HTML
const inputParaula = document.getElementById("paraula-input");
const inputImg = document.getElementById("imatge");
const botoComencar = document.getElementById("boto-comencar");
const botoMostrar = document.getElementById("boto-mostrar");
const displayParaulaActual = document.getElementById("paraula-actual");

// Fem servir querySelectorAll, que ens retorna un array amb
// els objectes (elements) que compleixen la nostra consulta.
// En aquest cas, demanem els elements amb el mateix id "#nom-id".
const displayPuntsActuals = document.querySelectorAll("#punts-partides-actuals");
const displayTotalPartides = document.querySelectorAll("#total-partides");
const displayPartidesGuanyades = document.querySelectorAll("#partides-guanyades");
const displayPartidaHighscore = document.querySelectorAll("#partida-highscore");

const panelJugador1 = document.getElementById("jugador1");
const panelJugador2 = document.getElementById("jugador2");
const lletresSection = document.getElementById("container-lletres");

botoMostrar.addEventListener("click", mostrarParaula);
botoComencar.addEventListener("click", comencarPartida);

// Variables locals JS
const abecedari = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let paraulaIntroduida;
let paraulaArray;
let paraulaActual = [];
let comptador = 0;

const jugador = {
    "puntsActuals": 0,
    "totalPartides": 0,
    "partidesGuanyades": 0,
    "highscore": {
        "punts": 0,
        "data": new Date()
    }
}

const multijugador = [jugador, jugador];

let tornJugador = 0;
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
                multijugador[tornJugador]["puntsActuals"] += comboPunts;
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
        multijugador[tornJugador]["puntsActuals"]--;
        if (multijugador[tornJugador]["puntsActuals"] == -1) multijugador[tornJugador]["puntsActuals"] = 0;

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

    displayPuntsActuals[0].textContent = multijugador[0]["puntsActuals"];
    displayPuntsActuals[1].textContent = multijugador[1]["puntsActuals"];
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
    if (multijugador[0]["puntsActuals"] > multijugador[1]["puntsActuals"]) {
        multijugador[0]["partidesGuanyades"]++;
    } else {
        multijugador[1]["partidesGuanyades"]++;
    }
}

function actualitzarHighscore() {
    for (let i = 0; i < 2; i++) {
        if (multijugador[i]["puntsActuals"] > multijugador[i]["highscore"]) {
            multijugador[i]["highscore"] = multijugador[i]["puntsActuals"];
            multijugador[i]["dataHighscore"] = new Date().toLocaleString();
            displayPartidaHighscore[i].textContent = multijugador[i]["dataHighscore"]
                                                    + " - " + multijugador[i]["highscore"]
                                                    + " punts";
        }
    }
}

function netejarPartida() {
    document.getElementById("paraula-actual").style.backgroundColor = "#c8d1f3";
    //puntsJugadors = [0,0];
    multijugador[0]["puntsActuals"] = 0;
    multijugador[1]["puntsActuals"] = 0;
    displayPuntsActuals[0].textContent = 0;
    displayPuntsActuals[1].textContent = 0;
    paraulaActual = [];
    inputImg.src = "img/penjat_0.jpg";
    comptador = 0;
    comboPunts = 0;
}

function actualitzarTotalPartides(){
    for (let i = 0; i < 2; i++) {
        multijugador[i]["totalPartides"]++;
        displayTotalPartides[i].textContent = multijugador[i]["totalPartides"];
        let percentatge = (multijugador[i]["partidesGuanyades"] / multijugador[i]["totalPartides"]) * 100;
        displayPartidesGuanyades[i].textContent = multijugador[i]["partidesGuanyades"]
                                                + " (" + percentatge.toFixed(2) + "%)";
    }
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

function crearBotons() {

    for (let i = 0; i < abecedari.length; i++) {
        let nouBoto = document.createElement("button");
        nouBoto.textContent = abecedari.charAt(i);
        nouBoto.id = "boto_" + (i + 1);
        nouBoto.addEventListener("click", function () {jugarLletra(this)});
        lletresSection.appendChild(nouBoto);
    }
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

crearBotons();
deshabilitarLletres(true);