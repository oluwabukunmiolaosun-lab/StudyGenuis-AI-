document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.getElementById("menu-btn");
    const nav = document.getElementById("nav");

    if (menuBtn && nav) {
        menuBtn.addEventListener("click", function () {
            nav.classList.toggle("show");
        });
    }

});
