let hasScrolled = false;

window.addEventListener("wheel", () => {
    if (!hasScrolled) {
        hasScrolled = true;
        document.getElementById("hero").classList.add("hidden");
        document.getElementById("content").classList.add("visible");
    }
});