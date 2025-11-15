/**
 * Lógica de contadores animados
 * Los contadores se animan cuando el scroll llega a su sección
 */

let countersAnimated = false; // Flag para ejecutar la animación una sola vez

/**
 * Anima un contador desde 0 hasta su valor target
 */
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (target - start) * progress);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/**
 * Inicia la animación de todos los contadores
 */
function startCountersAnimation() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        animateCounter(counter, target, 2000);
    });
}

/**
 * Verifica si los contadores están en vista
 */
function checkCountersInView() {
    const countersSection = document.querySelector('.py-20.bg-white');

    if (!countersSection) return;

    const rect = countersSection.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInView && !countersAnimated) {
        countersAnimated = true;
        startCountersAnimation();
    }
}

// Escucha el evento de scroll
window.addEventListener('scroll', checkCountersInView);

// También ejecuta al cargar por si la sección ya está visible
document.addEventListener('DOMContentLoaded', checkCountersInView);
