const inputContent = document.querySelector("#input-content");
const btnSave = document.querySelector("#btnSave");

window.addEventListener("load", () => {
    if (document.body.innerHTML.search('id="input-content"') >= 0) { prepareCachedWordList(); }
});

document.addEventListener("DOMContentLoaded", () => {
    if (inputContent !== null) {
        inputContent.oninput = (e) => {
            updateBehavior(e.target, e.target.value)
        };

        btnSave.onclick = addWord;
    }
});

function addWord() {

    let wordsList = localStorage.getItem("cachedWords").split(";");

    if (inputContent.validity.valid && inputContent.value !== "") {


        if (!wordsList.includes(inputContent.value)) {
            wordsList.push(inputContent.value);
            localStorage.setItem("cachedWords", wordsList.join(";"));

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

function updateBehavior(element, value) {
    element.value = value.toUpperCase();
    element.style.textTransform = value.toUpperCase().trim() == "" ? "none" : "uppercase";
}

function isNull(content) {
    return content === null;
}

function isEqual(elementA, elementB) {
    return JSON.stringify(elementA) === JSON.stringify(elementB);
}

function prepareCachedWordList() {

    let wordsDefault = ["ALURA", "ONE", "DESAFIO", "ORACLE", "CODAR", "VENCER"];
    let cachedWords = localStorage.getItem("cachedWords");

    if (isNull(cachedWords)) {
        localStorage.setItem("cachedWords", wordsDefault.join(";"));
    } else {
        cachedWords = cachedWords.split(";");

        if (!isEqual(cachedWords, wordsDefault)) {
            let choice = confirm("Foi encontrado uma lista de palavras já definidas para sorteio, para mantê-la clique em Ok, caso contrário clique em Cancelar para reiniciar com as palavras padrão!");

            if (choice == false) {
                localStorage.removeItem("cachedWords");
                localStorage.setItem("cachedWords", wordsDefault.join(";"));
            }
        }
    }
}