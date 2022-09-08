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

    // if (gameBoard.getContext) {
    //     var ctx = gameBoard.getContext("2d");

    //     ctx.fillStyle = "yellow";
    //     ctx.fillRect(618, 400, 1200, 800);

    //     ctx.fillStyle = "black";
    //     ctx.beginPath();
    //     ctx.moveTo(125, 125);
    //     ctx.lineTo(125, 45);
    //     ctx.lineTo(45, 125);
    //     ctx.closePath();
    //     ctx.stroke();


    //     ctx.font = "72px DynaPuff";
    //     ctx.fillStyle = "#052051"
    //     ctx.textBaseline = "middle"
    //     ctx.textAlign = "Center"
    //     ctx.fillText("Teste", 0, 400);
    // }
});

/* (pt-BR) Captura o evento de pressionamento das teclas realizando o tratamento das teclas válidas. (en) Captures the key press event performing the treatment of valid keys. */
document.addEventListener("keypress", (e) => {

    /[A-Z]/gi.test(e.key) ?
        attempts(e.key.toUpperCase()) :
        alert("Devem ser usados apenas letras de A a Z.");

});

/* (pt-BR) Captura o evento de clique do mouse sobre o botão de Novo jogo. (en) Captures the mouse click event on the New Game button. */
btnNewGame.addEventListener("click", () => {
    if (isUndefined(isWinner())) {
        let response = confirm("Confirmar iniciar um novo jogo?");

        if (response === true) { 
            window.onbeforeunload = null;
            document.location.reload();
        }
    }
});

/* (pt-BR) Captura o evento de clique do mouse sobre o botão de Desistir. (en) Capture the mouse click event on the Give up button. */
btnGiveUp.addEventListener("click", () => {

    if (isUndefined(isWinner())) {
        let response = confirm("Confirma desistir da partida?");

        if (response === true) {
            window.onbeforeunload = null;
            document.location.href = "/";
        }
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

        if (!isUndefined(isWinner())) {
            document.dispatchEvent(new KeyboardEvent("keypress", { "key": "Enter" }));
        }

    } else if (isWinner()) {
        console.log("Parabéns!!! Você VENCEU!!!");
        document.location.reload();
    } else {
        console.log("Infelizmente não foi dessa vez! Você PERDEU!!!");
        document.location.reload();
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

/* (pt-BR) Responsável por realizar o sorteio da palavra secreta. (en) Responsible for carrying out the secret word draw. */
function getWordDrawn() {
    let cachedWords = getCachedWordsList();

    return cachedWords[Math.floor(Math.random() * cachedWords.length)];
}