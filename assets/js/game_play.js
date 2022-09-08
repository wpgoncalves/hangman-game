import { isExistCachedWordsList, setCachedWordsList, getCachedWordsList } from "./cache_functionality.js"
import { isUndefined } from "./functionalities.js";

const wordDrawn = getWordDrawn();
const divWord = document.querySelector("#word");
const divAttempts = document.querySelector("#attempts");
const btnGiveUp = document.querySelector("#give-up");
const btnNewGame = document.querySelector("#new-game");
const canvasGameBoard = document.querySelector("#game-board");

/* (pt-BR) Retorna o número de letras da palavra secreta sem repetição de letras. (en) Returns the number of letters in the secret word without repeating letters. */
const numCorrectLettersWinner = () => {

    let arrLetters = [];

    [...wordDrawn].forEach((l) => {
        if (!arrLetters.includes(l)) { arrLetters.push(l); }
    });

    return arrLetters.length;

};

/* (pt-BR) Retorna verdadeiro se a palavra foi adivinhada, falso caso todas as tentativas já tenham se esgotado e undefined se ainda há tentativas. Returns true if the word has been guessed, false if all trials have run out, and undefined if there are still trials. */
const isWinner = () => {

    if (correctLetters.length >= numCorrectLettersWinner() && wrongLetters.length <= 8) {
        return true;
    }

    if (correctLetters.length < numCorrectLettersWinner() && wrongLetters.length > 8) {
        return false;
    }

};

// if (canvasGameBoard.getContext) { var ctx = canvasGameBoard.getContext("2d"); }
var ctx = canvasGameBoard.getContext ? canvasGameBoard.getContext("2d") : null;
var correctLetters = [];
var wrongLetters = [];

/* (pt-BR) Captura o evento de descarregamento da página, tentiva de sair da página, emitindo um aviso ao usuário que seus dados serão perdidos se continuar. (en) Captures the page unloading event, attempts to exit the page, warning the user that their data will be lost if they continue. */
window.onbeforeunload = (e) => {
    e.preventDefault();
    e.returnValue = "Mensagem de aviso";
    return "Mensagem de aviso";
};

/* (pt-BR) Captura o evento de carregamento completo do documento no DOM. (en) Captures the document complete loading event in the DOM. */
document.addEventListener("DOMContentLoaded", () => {

    if (!isExistCachedWordsList()) { setCachedWordsList(); }

    loadWordTemplate();

});

/* (pt-BR) Captura o evento de pressionamento das teclas realizando o tratamento das teclas válidas. (en) Captures the key press event performing the treatment of valid keys. */
document.addEventListener("keypress", (e) => {

    if (isUndefined(isWinner())) {

        /[A-Z]/gi.test(e.key) && e.key !== "Enter" ?
            attempts(e.key.toUpperCase()) :
            alert("Devem ser usados apenas letras de A a Z.");


    } else if (isWinner()) {
        ctx.font = "72px DynaPuff";
        ctx.fillStyle = "#052051"
        ctx.textBaseline = "middle"
        ctx.textAlign = "Center"
        ctx.shadowBlur = 5;
        ctx.shadowColor = "#343A40";
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
        ctx.fillText("Você Venceu. Parabéns!", 160, 150);
    } else {
        ctx.font = "72px DynaPuff";
        ctx.fillStyle = "#052051"
        ctx.textBaseline = "middle"
        ctx.textAlign = "Center"
        ctx.shadowBlur = 5;
        ctx.shadowColor = "#343A40";
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
        ctx.fillText("Fim de Jogo!", 380, 150);
    }

});

/* (pt-BR) Captura o evento de clique do mouse sobre o botão de Novo jogo. (en) Captures the mouse click event on the New Game button. */
btnNewGame.addEventListener("click", () => {

    let response = confirm("Confirmar iniciar um novo jogo?");

    if (response === true) {
        window.onbeforeunload = null;
        document.location.reload();
    }

});

/* (pt-BR) Captura o evento de clique do mouse sobre o botão de Desistir. (en) Capture the mouse click event on the Give up button. */
btnGiveUp.addEventListener("click", () => {

    let response = confirm("Confirma desistir da partida?");

    if (response === true) {
        window.onbeforeunload = null;
        document.location.href = "/";
    }

});

/* (pt-BR) Responsável por contabilizar e realizar ações referentes as tentativas. (en) Responsible for accounting and performing actions regarding attempts. */
function attempts(letterPressed) {

    /* (pt-BR) Faz uma verificação para saber se a letra digita está correta. Retorna verdadeiro se sim e false se não. (en) Checks to see if the letter you type is correct. Returns true if yes and false if no. */
    const isCorrectLetter = letter => {
        let thereWasOccurrenceLetter = false;

        [...wordDrawn].forEach((l) => {
            if (l === letter) { thereWasOccurrenceLetter = true; }
        });

        return thereWasOccurrenceLetter;
    };

    /* (pt-BR) Adiciona a letra pressionada à matriz indicada sem repeti-la. Retorna verdadeiro se sim e false se não. (en) Adds the pressed letter to the indicated matrix without repeating it. */
    const addPressedLetters = (arr, letter) => {
        if (!arr.includes(letter)) { arr.push(letter); }
    };

    if (isUndefined(isWinner())) {

        if (isCorrectLetter(letterPressed)) {
            addPressedLetters(correctLetters, letterPressed);
        } else {
            addPressedLetters(wrongLetters, letterPressed);
        }

        loadWordTemplate();
        loadGibbetTemplate();

        if (!isUndefined(isWinner())) {
            document.dispatchEvent(new KeyboardEvent("keypress", { "key": "Enter" }));
        }

    }

}

/* (pt-BR) Responsável por realizar o carregamento dos nós no DOM referente as letras pressionadas. (en) Responsible for loading the nodes in the DOM referring to the pressed letters. */
function loadWordTemplate() {

    const removeAllChildrenElement = (element) => {
        if (element.children.length > 0) {
            [...element.children].forEach(child => child.remove());
        }
    };

    const spanLetter = (arr, letter) => {
        let span = document.createElement("span");

        if (arr.includes(letter)) { span.innerHTML = letter; }

        return span;
    };

    let fragmentWord = document.createDocumentFragment();
    let fragmentWrong = document.createDocumentFragment();

    removeAllChildrenElement(divWord);
    [...wordDrawn].forEach((l) => {
        fragmentWord.appendChild(spanLetter(correctLetters, l));
    });
    divWord.appendChild(fragmentWord);

    removeAllChildrenElement(divAttempts);
    wrongLetters.forEach((l) => {
        fragmentWrong.appendChild(spanLetter(wrongLetters, l));
    });
    divAttempts.appendChild(fragmentWrong);

}

/* (pt-BR) Responsável por realizar o desenho da forca no canvas. (en) Responsible for drawing the force on the canvas. */
function loadGibbetTemplate() {

    ctx.fillStyle = "#99280a";
    ctx.lineWidth = 3;
    ctx.lineJoin = "bevel";

    if (wrongLetters.length > 0) {
        // Primeira tentativa
        ctx.fillRect(400, 350, 25, 400);
        ctx.strokeRect(400, 350, 25, 400);
    }

    if (wrongLetters.length > 1) {
        // Segunda tentativa
        ctx.fillRect(400, 350, 300, 25);
        ctx.strokeRect(400, 350, 300, 25);

        ctx.beginPath();
        ctx.moveTo(425, 450);
        ctx.lineTo(500, 375);
        ctx.lineTo(525, 375);
        ctx.lineTo(425, 475);
        ctx.lineTo(425, 450);
        ctx.fill();
        ctx.stroke();
    }

    if (wrongLetters.length > 2) {
        // Terceira tentativa
        ctx.moveTo(675, 375);
        ctx.lineTo(675, 405);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    if (wrongLetters.length > 3) {
        // Quarta tentativa
        ctx.beginPath();
        ctx.fillStyle = "#fae994";
        ctx.arc(675, 445, 40, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }

    if (wrongLetters.length > 4) {
        // Quinta tentativa
        ctx.moveTo(675, 485);
        ctx.lineTo(620, 550);
        ctx.lineTo(610, 550);
        ctx.stroke();
    }

    if (wrongLetters.length > 5) {
        // Sexta tentativa
        ctx.moveTo(675, 485);
        ctx.lineTo(730, 550);
        ctx.lineTo(740, 550);
        ctx.stroke();
    }

    if (wrongLetters.length > 6) {
        // Sétima tentativa
        ctx.moveTo(675, 485);
        ctx.lineTo(675, 600);
        ctx.stroke();
    }

    if (wrongLetters.length > 7) {
        // Oitava tentativa
        ctx.moveTo(675, 600);
        ctx.lineTo(620, 665);
        ctx.moveTo(620, 665);
        ctx.lineTo(610, 665);
        ctx.stroke();
    }

    if (wrongLetters.length > 8) {
        // Nona e última tentativa
        ctx.moveTo(675, 600);
        ctx.lineTo(730, 665);
        ctx.moveTo(730, 665);
        ctx.lineTo(740, 665);
        ctx.closePath();
        ctx.stroke();
    }

}

/* (pt-BR) Responsável por realizar o sorteio da palavra secreta. (en) Responsible for carrying out the secret word draw. */
function getWordDrawn() {
    let cachedWords = getCachedWordsList();

    return cachedWords[Math.floor(Math.random() * cachedWords.length)];
}