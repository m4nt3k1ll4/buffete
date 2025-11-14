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
            // Calcular posición horizontal del botón
            const btnRect = btn.getBoundingClientRect();
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
            
            menu.style.left = btnRect.left + 'px';
            menu.style.top = (navbarHeight + 5) + 'px';
            
            menu.classList.add("show");
            menu.classList.remove("hidden");
            menu.setAttribute("aria-hidden", "false");
            btn.setAttribute("aria-expanded", "true");
            // Animate chevron
            const chevron = btn.querySelector('.navbar__chevron');
            if (chevron) chevron.classList.add('rotate');
        } else {
            menu.classList.remove("show");
            menu.classList.add("hidden");
            menu.setAttribute("aria-hidden", "true");
            btn.setAttribute("aria-expanded", "false");
            // Animate chevron
            const chevron = btn.querySelector('.navbar__chevron');
            if (chevron) chevron.classList.remove('rotate');
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
// Usamos delegación para soportar elementos inyectados dinámicamente
document.addEventListener("click", (e) => {
    // Si el click ocurrió dentro de un elemento con id openSidebar
    const openBtn = e.target.closest && e.target.closest('#openSidebar');
    if (openBtn) {
        e.preventDefault();
        e.stopPropagation();
        document.dispatchEvent(new Event("sidebar:open"));
    }
});


