async function loadComponent(id, file) {
    const el = document.getElementById(id);
    if (el) {
        const res = await fetch(`/src/components/${file}`);
        el.innerHTML = await res.text();
    }
}

loadComponent("header", "header.html");
loadComponent("footer", "footer.html");
