// src/scripts/loader.js

/**
 * Carga un componente HTML (header/footer) en un elemento del DOM.
 * Usa rutas absolutas para que funcione desde cualquier página.
 */
async function loadComponent(id, file) {
    const el = document.getElementById(id);
    if (el) {
        try {
            // Usamos una ruta absoluta (ej: /src/components/header.html)
            const res = await fetch(`/src/components/${file}`);
            if (!res.ok) throw new Error(`Error 404: ${file} no encontrado.`);
            el.innerHTML = await res.text();
        } catch (error) {
            console.error(`Error al cargar ${file}:`, error);
            el.innerHTML = `<p style="color:red; text-align:center;">Error al cargar ${id}.</p>`;
        }
    }
}

/**
 * Carga un script dinámicamente y espera a que esté listo.
 * Usa rutas absolutas.
 */
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        // Si es un CDN, déjalo como está. Si es local, ponle la ruta absoluta.
        script.src = src.startsWith('http') ? src : `/${src}`;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Error al cargar el script ${src}`));
        document.body.appendChild(script);
    });
}

/**
 * Función principal (nuestro "director de orquesta")
 */
async function main() {
    // 1. Carga el HTML del header y footer al mismo tiempo
    await Promise.all([
        loadComponent("header", "header.html"),
        loadComponent("footer", "footer.html")
    ]);

    // 2. SOLO CUANDO el HTML ya está en la página, carga los scripts
    //    que dependen de ese HTML (en orden).
    try {
        await loadScript("src/scripts/navbar.js");
        await loadScript("src/scripts/sidebar.js");
        await loadScript("src/scripts/counters.js");
        
        // 3. Carga y activa AOS (animaciones)
        await loadScript("https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js");
        AOS.init();
        
    } catch (error) {
        console.error("Fallo al cargar los scripts principales:", error);
    }
}

// Ejecutar la función principal
main();