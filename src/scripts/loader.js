// src/scripts/loader.js

/**
 * Obtiene la ruta base (funciona en local y en GitHub Pages)
 */
function getBasePath() {
    const path = window.location.pathname;
    // Si la URL contiene /buffete/, es GitHub Pages
    if (path.includes('/buffete/')) {
        return '/buffete';
    }
    return '';
}

/**
 * Carga un componente HTML (header/footer) en un elemento del DOM.
 * Funciona tanto en local como en GitHub Pages.
 */
async function loadComponent(id, file) {
    const el = document.getElementById(id);
    if (!el) return;

    try {
        const basePath = getBasePath();
        const url = file.startsWith("/") 
            ? file 
            : `${basePath}/src/components/${file}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error 404: ${url} no encontrado.`);

        el.innerHTML = await res.text();
    } catch (error) {
        console.error(`Error al cargar ${file}:`, error);
        el.innerHTML = `<p style="color:red; text-align:center;">Error al cargar ${id}.</p>`;
    }
}


/**
 * Carga un script dinámicamente y espera a que esté listo.
 * Funciona tanto en local como en GitHub Pages.
 */
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        // Si es un CDN, déjalo como está. Si es local, ajusta la ruta base.
        if (src.startsWith('http')) {
            script.src = src;
        } else {
            const basePath = getBasePath();
            script.src = `${basePath}/${src}`;
        }
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Error al cargar el script ${src}`));
        document.body.appendChild(script);
    });
}

/**
 * Función principal (nuestro "director de orquesta")
 */
async function main() {
    // 1. Carga el HTML del header, footer y whatsapp bubble al mismo tiempo
    try {
        await Promise.all([
            loadComponent("header", "header.html"),
            loadComponent("footer", "footer.html"),
            loadComponent("whatsappBubble", "whatsapp-bubble.html")
        ]);
    } catch (error) {
        console.error("Error al cargar componentes HTML:", error);
    }

    // 2. SOLO CUANDO el HTML ya está en la página, carga los scripts
    //    que dependen de ese HTML (en orden).
    try {
        await loadScript("src/scripts/route-handler.js");
        await loadScript("src/scripts/navbar.js");
        await loadScript("src/scripts/sidebar.js");
        await loadScript("src/scripts/counters.js");
        await loadScript("src/scripts/whatsapp-bubble.js");
        
        // 3. Carga y activa AOS (animaciones)
        await loadScript("https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js");
        if (window.AOS) {
            AOS.init();
        }
        
        // 4. Renderiza los iconos de Lucide después de que todo esté en el DOM
        if (window.lucide) {
            lucide.createIcons();
        }
        
    } catch (error) {
        console.error("Error al cargar los scripts principales:", error);
    }
}

// Ejecutar la función principal
main();