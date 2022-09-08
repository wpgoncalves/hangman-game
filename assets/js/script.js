import { isExistCachedWordsList, setCachedWordsList } from "./cache_functionality.js"

document.addEventListener("DOMContentLoaded", () => {
    if (!isExistCachedWordsList()) { setCachedWordsList(); }
});