// sidebar.js

const sidebar = document.getElementById("sidebar");
const openBtns = document.querySelectorAll("#openSidebar");
const closeBtn = document.getElementById("closeSidebar");
const overlay = document.getElementById("sidebarOverlay");

const open = () => {
    sidebar.classList.add("sidebar--open");
    sidebar.removeAttribute("aria-hidden");
    overlay.classList.remove("hidden");
    document.body.classList.add("no-scroll");
    overlay.classList.add("overlay--visible");
};

const close = () => {
    sidebar.classList.remove("sidebar--open");
    sidebar.setAttribute("aria-hidden", "true");
    overlay.classList.add("hidden");
    document.body.classList.remove("no-scroll");
    overlay.classList.remove("overlay--visible");
};

// escucha evento disparado desde navbar.js
document.addEventListener("sidebar:open", open);

// botones directos
openBtns.forEach(b => b.addEventListener("click", open));
closeBtn?.addEventListener("click", close);
overlay?.addEventListener("click", close);

// ESC para cerrar
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
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

