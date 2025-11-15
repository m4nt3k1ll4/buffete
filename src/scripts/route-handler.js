/**
 * Manejador de rutas - Corrige todas las rutas relativas para GitHub Pages
 * Detecta si estamos en GitHub Pages (/buffete/) o en local
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
 * Convierte rutas relativas a absolutas basadas en la base path
 */
function normalizeLink(href) {
    // Si ya es un protocolo completo o mailto/tel, déjalo como está
    if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) {
        return href;
    }

    const basePath = getBasePath();

    // Si comienza con ./, elimina el ./ y agrega basePath si es necesario
    if (href.startsWith('./')) {
        return basePath + href.substring(1);
    }

    // Si comienza con src/, agrega basePath
    if (href.startsWith('src/')) {
        return basePath + '/' + href;
    }

    return href;
}

/**
 * Procesa todos los links en la página
 */
function initRouteHandler() {
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        if (!href) return;

        // Normaliza la ruta
        const normalizedHref = normalizeLink(href);

        // Si la ruta cambió, navega a la nueva
        if (normalizedHref !== href) {
            e.preventDefault();
            window.location.href = normalizedHref;
            return;
        }
    });

    // También normaliza todos los href en la página al cargar
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            const normalized = normalizeLink(href);
            if (normalized !== href) {
                link.setAttribute('href', normalized);
            }
        }
    });
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRouteHandler);
} else {
    initRouteHandler();
}
