// WhatsApp Bubble Component Script
// Maneja la lógica de abrir/cerrar el chat

function initWhatsAppBubble() {
    const whatsappBubbleBtn = document.getElementById('whatsappBubbleBtn');
    const whatsappChatContainer = document.querySelector('.whatsapp-chat-container');
    const closeWhatsappChatBtn = document.getElementById('closeWhatsappChat');

    if (!whatsappBubbleBtn || !whatsappChatContainer) {
        console.warn('WhatsApp Bubble: Elementos no encontrados en el DOM');
        return false;
    }

    // Abrir/cerrar chat al hacer click en la burbuja
    whatsappBubbleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        whatsappChatContainer.classList.toggle('hidden');
    });

    // Cerrar chat al hacer click en el botón X
    closeWhatsappChatBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        whatsappChatContainer.classList.add('hidden');
    });

    // Cerrar chat al hacer click fuera del componente
    document.addEventListener('click', (e) => {
        const whatsappBubble = document.getElementById('whatsappBubble');
        if (whatsappBubble && !whatsappBubble.contains(e.target)) {
            whatsappChatContainer.classList.add('hidden');
        }
    });

    // Evitar que clicks dentro del chat cierren el componente
    whatsappChatContainer.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    return true;
}

// Si el DOM ya está listo (cuando se carga en páginas normales)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhatsAppBubble);
} else {
    // Si el DOM ya está cargado (cuando se inyecta dinámicamente)
    initWhatsAppBubble();
}

