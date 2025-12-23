/**
 * Manejador de rutas - Corrige todas las rutas relativas para GitHub Pages
 * Detecta si estamos en GitHub Pages (/bufete/) o en local
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
 * Convertir rutas relativas a absolutas basadas en la base path
 * index.html está en la raíz, todo lo demás en src/
 */
function normalizeLink(href) {
    // Si ya es un protocolo completo o mailto/tel, déjalo como está
    if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) {
        return href;
    }

    const basePath = getBasePath();

    // Caso especial: index.html está en la raíz
    if (href === 'index.html') {
        return basePath + '/index.html';
    }

    // Si comienza con src/, agrega basePath
    if (href.startsWith('src/')) {
        return basePath + '/' + href;
    }

    return href;
}

/**
 * Normaliza rutas de imágenes solo en GitHub Pages
 * Convierte rutas absolutas a rutas con basePath para /bufete/
 */
function normalizeImageSrc(src) {
    // Si ya es un protocolo completo o data URI, déjalo como está
    if (src.startsWith('http') || src.startsWith('data:')) {
        return src;
    }

    const basePath = getBasePath();
    
    // Solo en GitHub Pages (/bufete/) se necesita normalizar
    if (basePath && src.startsWith('/assets/')) {
        // /assets/images/administrativo.jpg → /bufete/assets/images/administrativo.jpg
        return basePath + src;
    }

    // En local, las rutas absolutas /assets/ ya funcionan correctamente
    return src;
}

/**
 * Procesa todos los links en la página
 */
function initRouteHandler() {
    // Normaliza todos los href en la página
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            const normalized = normalizeLink(href);
            if (normalized !== href) {
                link.setAttribute('href', normalized);
            }
        }
    });

    // Normaliza TODAS las imágenes en la página
    // Esto debe hacerse lo antes posible
    document.querySelectorAll('img[src]').forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const normalized = normalizeImageSrc(src);
            if (normalized !== src) {
                img.setAttribute('src', normalized);
            }
        }
    });

    // Event delegation para links dinámicos
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        if (!href) return;

        const normalizedHref = normalizeLink(href);
        if (normalizedHref !== href) {
            e.preventDefault();
            window.location.href = normalizedHref;
        }
    });

    // MutationObserver para imágenes/links añadidos dinámicamente
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        // Procesa imágenes
                        if (node.tagName === 'IMG' && node.hasAttribute('src')) {
                            const src = node.getAttribute('src');
                            const normalized = normalizeImageSrc(src);
                            if (normalized !== src) {
                                node.setAttribute('src', normalized);
                            }
                        }
                        // Procesa links
                        if (node.tagName === 'A' && node.hasAttribute('href')) {
                            const href = node.getAttribute('href');
                            const normalized = normalizeLink(href);
                            if (normalized !== href) {
                                node.setAttribute('href', normalized);
                            }
                        }
                        
                        // Procesa descendientes
                        node.querySelectorAll('img[src]').forEach(img => {
                            const src = img.getAttribute('src');
                            const normalized = normalizeImageSrc(src);
                            if (normalized !== src) {
                                img.setAttribute('src', normalized);
                            }
                        });
                        
                        node.querySelectorAll('a[href]').forEach(link => {
                            const href = link.getAttribute('href');
                            const normalized = normalizeLink(href);
                            if (normalized !== href) {
                                link.setAttribute('href', normalized);
                            }
                        });
                    }
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Ejecutar lo más pronto posible
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRouteHandler);
} else {
    initRouteHandler();
}
