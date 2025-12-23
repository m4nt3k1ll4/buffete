// src/scripts/loader.js

/**
 * Obtiene la ruta base (funciona en local y en GitHub Pages)
 */
function getBasePath() {
    const path = window.location.pathname;
    // Si la URL contiene /bufete/, es GitHub Pages
    if (path.includes('/bufete/')) {
        return '/bufete';
    }
    return '';
}

/**
 * Detecta el nivel de profundidad de la página actual
 */
function getDepthLevel() {
    const path = window.location.pathname;
    const basePath = getBasePath();
    
    // Remover el basePath del path
    let relativePath = path.replace(basePath, '');
    
    // Contar cuántas carpetas hay después de la raíz
    const depth = relativePath.split('/').filter(p => p && p !== 'index.html').length;
    
    return depth;
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
        const depth = getDepthLevel();
        
        // Construir la ruta correcta según el nivel de profundidad
        let componentPath;
        if (depth === 0) {
            // En la raíz (index.html)
            componentPath = `${basePath}/src/components/${file}`;
        } else if (depth === 1) {
            // En una subcarpeta (pages/contacto.html)
            componentPath = `${basePath ? basePath : '..'}/src/components/${file}`;
        } else {
            // En subcarpetas anidadas (pages/servicios/administrativo.html)
            const prefix = '../'.repeat(depth);
            componentPath = `${prefix}src/components/${file}`;
        }

        const res = await fetch(componentPath);
        if (!res.ok) throw new Error(`Error 404: ${componentPath} no encontrado.`);

        el.innerHTML = await res.text();
        
        // Corregir rutas de logos después de cargar el HTML
        fixLogoRoutes(el, basePath);
    } catch (error) {
        console.error(`Error al cargar ${file}:`, error);
        el.innerHTML = `<p style="color:red; text-align:center;">Error al cargar ${id}.</p>`;
    }
}

/**
 * Corrige las rutas de los logos para que funcionen desde cualquier ubicación
 */
function fixLogoRoutes(container, basePath) {
    // Buscar todas las imágenes de logos
    const logos = container.querySelectorAll('img[src*="logo"]');
    logos.forEach(img => {
        const src = img.getAttribute('src');
        // Si la ruta es relativa, convertirla a absoluta
        if (src && !src.startsWith('http') && !src.startsWith('/')) {
            // Extraer el nombre del archivo (logo*.png o logo*.svg)
            const filename = src.split('/').pop();
            img.setAttribute('src', `${basePath}/src/assets/img/${filename}`);
        }
    });
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

    // 2. Cargar scripts solo si no están ya cargados
    try {
        const depth = getDepthLevel();
        const scriptsToLoad = [];
        
        // Solo cargar route-handler si no está ya cargado
        if (!window.routeHandlerLoaded) {
            const prefix = depth > 0 ? '../'.repeat(depth) : '';
            scriptsToLoad.push(loadScript(`${prefix}src/scripts/route-handler.js`));
        }
        
        // Cargar otros scripts necesarios
        if (depth > 0) {
            const prefix = '../'.repeat(depth);
            scriptsToLoad.push(
                loadScript(`${prefix}src/scripts/navbar.js`),
                loadScript(`${prefix}src/scripts/sidebar.js`),
                loadScript(`${prefix}src/scripts/counters.js`)
            );
        } else {
            scriptsToLoad.push(
                loadScript("src/scripts/navbar.js"),
                loadScript("src/scripts/sidebar.js"),
                loadScript("src/scripts/counters.js")
            );
        }
        
        await Promise.all(scriptsToLoad);
        
        // 3. Renderiza los iconos de Lucide después de que todo esté en el DOM
        if (window.lucide) {
            lucide.createIcons();
        }
        
    } catch (error) {
        console.error("Error al cargar los scripts principales:", error);
    }
}

// Ejecutar la función principal
main();