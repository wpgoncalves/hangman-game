import { addCachedWord } from "./cache_functionality.js";

const inputContent = document.querySelector("#input-content");
const btnSave = document.querySelector("#btnSave");

document.addEventListener("DOMContentLoaded", () => {
    if (inputContent !== null) {
        inputContent.oninput = (e) => {
            updateBehavior(e.target, e.target.value)
        };

        btnSave.onclick = addWord;
    }
});

/* (en) Adds new words to the cached word list. (pt-BR) Adiciona novas palavras a lista de palavras em cache. */
function addWord() {
    if (inputContent.validity.valid && inputContent.value !== "") {
        if (addCachedWord(inputContent.value)) {
            let choice = confirm(`A palavra ${inputContent.value} foi incluída com sucesso!\n\nDeseja continuar a incluir palavras? Ok para Sim e Cancelar para Não!\n\nObs.: Ao clicar em cancelar um novo jogo se iniciará.`)

            if (!choice) { window.location.href = "game_play.html"; }
        } else {
            alert("Você está tentando adicionar uma palavra já existente! Tente uma outra palavra.");
        }

        updateBehavior(inputContent, "");
    } else {
        alert("O valor deve conter de 3 a 8 letras maiúsculas exceto acentos e caracteres especiais.");
    }

    inputContent.focus();
}

/* (en) Updates the element according to the defined criteria. (pt-BR) Atualiza o elemento de acordo com os critérios definidos. */
function updateBehavior(element, value) {
    element.value = value.toUpperCase();
    element.style.textTransform = value.toUpperCase().trim() == "" ? "none" : "uppercase";
}