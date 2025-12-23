// src/scripts/loader.js

/**
 * Obtiene la ruta base (funciona en local y en GitHub Pages)
 */
function getBasePath() {
    const path = window.location.pathname;
    const hostname = window.location.hostname;
    
    // Debug para ver qué estamos detectando
    console.log('🔍 Detectando entorno:', {
        hostname,
        pathname: path,
        fullURL: window.location.href
    });
    
    // Si estamos en GitHub Pages (hostname contiene github.io)
    if (hostname.includes('github.io')) {
        console.log('✅ Detectado GitHub Pages - usando /bufete');
        return '/bufete';
    }
    
    console.log('✅ Detectado desarrollo local - sin prefijo');
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
        
        // En GitHub Pages siempre usar rutas absolutas con basePath
        // En local, usar rutas relativas desde la raíz
        const componentPath = `${basePath}/src/components/${file}`;
        
        console.log(`📦 Cargando componente: ${file} desde ${componentPath}`);

        const res = await fetch(componentPath);
        if (!res.ok) throw new Error(`Error 404: ${componentPath} no encontrado.`);

        el.innerHTML = await res.text();
        console.log(`✅ Componente ${file} cargado exitosamente`);
        
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
        const basePath = getBasePath();
        
        // Si es un CDN, déjalo como está
        if (src.startsWith('http')) {
            script.src = src;
        } else {
            // Usar rutas absolutas con basePath
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
        const scriptsToLoad = [];
        
        // Solo cargar route-handler si no está ya cargado
        if (!window.routeHandlerLoaded) {
            scriptsToLoad.push(loadScript("src/scripts/route-handler.js"));
        }
        
        // Cargar otros scripts necesarios
        scriptsToLoad.push(
            loadScript("src/scripts/navbar.js"),
            loadScript("src/scripts/sidebar.js"),
            loadScript("src/scripts/counters.js")
        );
        
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