document.addEventListener("DOMContentLoaded", function () {
    resaltarEnlace();
});

function resaltarEnlace() {
    document.addEventListener("scroll", function () {
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll(".navegacion-principal a");
        let actual = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                actual = section.id;
            }
        });
        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + actual) {
                link.classList.add("active");
            }
        });
    });
}
