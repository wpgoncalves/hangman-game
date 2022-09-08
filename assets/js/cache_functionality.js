import { isNull } from "./functionalities.js"

const key = "cachedWords";
const wordsListDefault = ["ALURA", "ONE", "DESAFIO", "ORACLE", "CODAR", "VENCER"];

/* (en) Returns true if the cached word list exists and false otherwise. (pt-BR) Retorna verdadeiro caso exista a lista de palavras em cache e falso caso contrário. */
function isExistCachedWordsList() {
    return !isNull(localStorage.getItem(key));
}

/* (en) Adds new words to the cached words list. (pt-BR) Adiciona novas palavras a lista palavras em cache. */
function addCachedWord(word) {
    let cachedWords = getCachedWordsList();

    if (!cachedWords.includes(word)) {
        cachedWords.push(word);
        setCachedWordsList(cachedWords);
        return true;
    }

    return false;
}

/* (en) Returns an array containing the words already in cache, if there are no words in cache the function will create them and return them. (pt-BR) Devolve um array contendo as palavras já em cache, caso não haja palavras em cache a função às criará e às retornará. */
function getCachedWordsList() {
    if (isExistCachedWordsList()) {
        return localStorage.getItem(key).split(";");
    } else {
        setCachedWordsList();
        return getCachedWordsList();
    }
}

/* (en) Caches a default list of words or a new list of words. (pt-BR) Define em cache uma lista padrão de palavras ou uma nova lista de palavras.*/
function setCachedWordsList(wordsList) {
    if (wordsList === undefined) {
        localStorage.setItem(key, wordsListDefault.join(";"));
    } else {
        localStorage.setItem(key, wordsList.join(";"));
    }
}

export { isExistCachedWordsList, addCachedWord, getCachedWordsList, setCachedWordsList };