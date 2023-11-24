document.addEventListener("scroll", function() {
    const aboutSection = document.querySelector(".about-section");
    const rect = aboutSection.getBoundingClientRect();
    const textElement = document.querySelector(".about-section p");

    if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Jeśli sekcja jest widoczna
        textElement.style.animation = "spinIn 0.5s forwards";
    } else {
        // Jeśli sekcja nie jest widoczna
        textElement.style.animation = "spinOut 0.5s forwards";
    }
});
