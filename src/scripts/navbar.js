
const navbar = document.querySelector(".navbar");

// Keep navbar visible at all times; instead, toggle a style when it's over the hero
function updateNavbarOnHero() {
    const hero = document.querySelector('section'); // first section is hero
    if (!hero || !navbar) return;
    const headerHeight = navbar.offsetHeight || 80;
    const heroRect = hero.getBoundingClientRect();
    // if the hero bottom is below headerHeight, navbar is overlapping the hero
    if (heroRect.bottom > headerHeight + 10) {
        navbar.classList.add('navbar--on-hero');
    } else {
        navbar.classList.remove('navbar--on-hero');
    }
}

window.addEventListener('scroll', updateNavbarOnHero, { passive: true });
window.addEventListener('resize', updateNavbarOnHero);
// initial check
setTimeout(updateNavbarOnHero, 100);

// DROPDOWN: busca elementos con data-dropdown
document.querySelectorAll("[data-dropdown]").forEach(btn => {
    const menuId = btn.dataset.dropdown;
    const menu = document.getElementById(menuId);
    if (!menu) return;

    // Toggle on click
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = menu.classList.contains("show");
        // cerrar otros
        document.querySelectorAll(".dropdown-menu.show").forEach(m => {
            if (m !== menu) {
                m.classList.remove("show");
                m.setAttribute("aria-hidden", "true");
                const trigger = document.querySelector(`[data-dropdown="${m.id}"]`);
                if (trigger) trigger.setAttribute("aria-expanded", "false");
            }
        });

        if (!isOpen) {
            menu.classList.add("show");
            menu.classList.remove("hidden");
            menu.setAttribute("aria-hidden", "false");
            btn.setAttribute("aria-expanded", "true");
        } else {
            menu.classList.remove("show");
            menu.classList.add("hidden");
            menu.setAttribute("aria-hidden", "true");
            btn.setAttribute("aria-expanded", "false");
        }
    });
});

// cerrar si se hace click fuera
document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown-menu.show").forEach(menu => {
        menu.classList.remove("show");
        menu.classList.add("hidden");
        menu.setAttribute("aria-hidden", "true");
        const trigger = document.querySelector(`[data-dropdown="${menu.id}"]`);
        if (trigger) trigger.setAttribute("aria-expanded", "false");
    });
});

// abrir sidebar: emitir evento global para sidebar.js
document.querySelectorAll("#openSidebar").forEach(btn => {
    btn.addEventListener("click", () => {
        document.dispatchEvent(new Event("sidebar:open"));
    });
});


