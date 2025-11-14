
const navbar = document.querySelector(".navbar");
// sticky hide/show on scroll
let prevScroll = window.scrollY || 0;
window.addEventListener("scroll", () => {
    const current = window.scrollY || 0;
    if (current > prevScroll && current > 80) {
        navbar.classList.add("navbar--hidden");
    } else {
        navbar.classList.remove("navbar--hidden");
    }
    prevScroll = current;
});

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


