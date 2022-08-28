import { isExistCachedWordsList, setCachedWordsList } from "./cache_functionality.js"

window.addEventListener("DOMContentLoaded", () => {
    if (!isExistCachedWordsList()) { setCachedWordsList(); }
});