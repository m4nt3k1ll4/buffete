// sidebar.js

const sidebar = document.getElementById("sidebar");
const openBtns = document.querySelectorAll("#openSidebar");
const closeBtn = document.getElementById("closeSidebar");
const overlay = document.getElementById("sidebarOverlay");

/**
 * Detecta si el viewport está en la sección hero y ajusta el color del sidebar
 */
function updateSidebarColor() {
    if (!sidebar) return;
    
    // Obtener el primer elemento main o section con clase hero/relative
    const heroSection = document.querySelector('section.relative[style*="height: 100vh"]') || 
                        document.querySelector('section[style*="background: linear-gradient"]');
    
    if (!heroSection) {
        // Si no hay hero, remover clase oscura
        sidebar.classList.remove('sidebar--dark');
        return;
    }
    
    const heroHeight = heroSection.offsetHeight || window.innerHeight;
    const scrollPosition = window.scrollY;
    
    // Si estamos en la sección hero (dentro de los primeros 100vh aproximadamente)
    if (scrollPosition < heroHeight * 0.8) {
        // Color del hero: agregar clase oscura
        sidebar.classList.add('sidebar--dark');
    } else {
        // Color de la navbar cuando estamos en el contenido
        sidebar.classList.remove('sidebar--dark');
    }
}

const open = () => {
    if (sidebar) {
        sidebar.classList.add("sidebar--open");
        sidebar.setAttribute("aria-hidden", "false");
        // Actualizar color al abrir
        updateSidebarColor();
    }
    if (overlay) {
        overlay.classList.remove("hidden");
        overlay.classList.add("overlay--visible");
    }
    document.body.classList.add("no-scroll");
};

const close = () => {
    if (sidebar) {
        sidebar.classList.remove("sidebar--open");
        sidebar.setAttribute("aria-hidden", "true");
    }
    if (overlay) {
        overlay.classList.remove("overlay--visible");
        overlay.classList.add("hidden");
    }
    document.body.classList.remove("no-scroll");
};

// Actualizar color de sidebar cuando se hace scroll (mientras está cerrado)
document.addEventListener("scroll", () => {
    if (sidebar && !sidebar.classList.contains("sidebar--open")) {
        updateSidebarColor();
    }
}, { passive: true });

// escucha evento disparado desde navbar.js
document.addEventListener("sidebar:open", open);

// botones directos (si existen)
if (openBtns.length > 0) {
    openBtns.forEach((b) => {
        b.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            open();
        });
    });
}

if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        close();
    });
}

if (overlay) {
    overlay.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        close();
    });
}

// Fallback: delegación para clicks sobre el botón #openSidebar
document.addEventListener("click", (e) => {
    const openBtn = e.target.closest && e.target.closest('#openSidebar');
    if (openBtn) {
        e.preventDefault();
        e.stopPropagation();
        if (sidebar && !sidebar.classList.contains('sidebar--open')) {
            open();
        }
    }
});

// ESC para cerrar
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
});

// Cierra el sidebar cuando se hace click en un link dentro de él
document.addEventListener("click", (e) => {
    const sidebarLink = e.target.closest && e.target.closest('.sidebar__link, .sidebar__sublink, .sidebar__btn');
    if (sidebarLink && sidebar && sidebar.classList.contains('sidebar--open')) {
        // Espera un pequeño delay para permitir la navegación sin flickering
        setTimeout(() => close(), 100);
    }
});

// Mejora del comportamiento collapsible en sidebar: <details> nativo ya funciona,
// pero si quieres animación más suave podemos convertirlo en JS:
document.querySelectorAll(".sidebar__details").forEach(details => {
    const summary = details.querySelector("summary");
    const content = details.querySelector("div");
    if (!summary || !content) return;

    // set ARIA
    details.setAttribute("role", "group");
    summary.setAttribute("role", "button");
    content.style.maxHeight = details.hasAttribute("open") ? content.scrollHeight + "px" : "0px";
    content.style.overflow = "hidden";
    content.style.transition = "max-height .28s ease";

    summary.addEventListener("click", (e) => {
        e.preventDefault();
        const isOpen = details.hasAttribute("open");
        if (isOpen) {
            details.removeAttribute("open");
            content.style.maxHeight = "0px";
        } else {
            details.setAttribute("open", "");
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});