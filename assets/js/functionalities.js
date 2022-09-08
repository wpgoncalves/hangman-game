/* (en) General game features module. (pt-BR) Módulo de recursos gerais do jogo. */

function isUndefined(content) {
    return content === undefined;
}

function isNull(content) {
    return content === null;
}

function isEqual(elementA, elementB) {
    return JSON.stringify(elementA) === JSON.stringify(elementB);
}

export { isUndefined, isEqual, isNull };