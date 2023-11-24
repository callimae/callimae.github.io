document.addEventListener("DOMContentLoaded", function() {
    const aboutSectionContainer = document.querySelector('.about-section-container');

    window.addEventListener('scroll', function() {
        let scrollPosition = window.scrollY;
        let sectionTop = aboutSectionContainer.offsetTop;
        let sectionBottom = sectionTop + aboutSectionContainer.offsetHeight;

        if (scrollPosition > sectionTop - window.innerHeight && scrollPosition < sectionBottom) {
            aboutSectionContainer.style.setProperty("--beforeTranslateY", "0%");
            aboutSectionContainer.style.setProperty("--afterTranslateY", "0%");
        } else {
            aboutSectionContainer.style.setProperty("--beforeTranslateY", "-100%");
            aboutSectionContainer.style.setProperty("--afterTranslateY", "100%");
        }
    });
});
