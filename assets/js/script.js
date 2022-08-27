const words = ["ALURA", "ONE", "DESAFIO", "ORACLE", "CODAR", "VENCER"]
const inputContent = document.querySelector("#input-content");
const form = document.querySelector("form");
const btnSave = document.querySelector("#btnSave");
const btnCancel = document.querySelector("#btnCancel");

document.addEventListener("DOMContentLoaded", () => {
    inputContent.addEventListener("input", (e) => {
        let value = e.target.value.toUpperCase();

        inputContent.value = value;
        inputContent.style.textTransform = value.trim() == "" ? "none" : "uppercase";
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        btnSave.dispatchEvent(new Event("click"));
    });

    btnSave.addEventListener("click", () => {
        if (inputContent.validity.valid && inputContent.value !== ""){
            alert(`A palavra ${inputContent.value} foi incluída com sucesso.`);
            window.location.href = "game_play.html";
        } else {
            inputContent.focus();
        }
    });
});