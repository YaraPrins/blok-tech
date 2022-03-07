const menuToggle = document.querySelector("header div.menuToggle");

menuToggle.addEventListener("click", () => {
    const menuHmbgr = document.querySelector('header div:nth-of-type(2) nav');

    menuHmbgr.classList.toggle("menuOpen");

    if (menuHmbgr.classList.contains("menuOpen")) {
        menuToggle.classList.add("menuToggleCross");
    } else {
        menuToggle.classList.remove("menuToggleCross");
    }

});