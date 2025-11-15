# Frame-IT: Guía de Uso para Imágenes

## ¿Qué es Frame-IT?

Frame-IT es un sistema visual que muestra un placeholder elegante mientras las imágenes se cargan. El frame desaparece automáticamente cuando la imagen real está lista.

## Características

- ✨ **Animación de Shimmer**: Brillo pulsante que indica que hay contenido cargando
- 🎨 **Borde Dorado Punteado**: Marca visual clara del espacio reservado
- 🔄 **Desaparición Automática**: El frame se elimina cuando la imagen carga
- 📱 **Responsive**: Funciona en todos los tamaños de pantalla
- ⚡ **Sin Código JavaScript**: Solo CSS, sin dependencias

## Cómo Usar

### Paso 1: Agregar la Clase
Simplemente agrega `frame-it` a cualquier elemento `<img>`:

```html
<img 
    src="./src/assets/img/mi-imagen.jpg" 
    alt="Descripción" 
    class="frame-it w-full h-96 object-cover"
>
```

### Paso 2: Mantener otras clases
Puedes combinar `frame-it` con Tailwind u otras clases CSS:

```html
<!-- Ejemplo en una galería -->
<img 
    src="./assets/services/imagen.jpg" 
    alt="Servicio" 
    class="frame-it w-full h-64 object-cover rounded-lg shadow-lg"
>

<!-- Ejemplo en el hero -->
<img 
    src="./assets/hero.jpg" 
    alt="Hero" 
    class="frame-it absolute inset-0 w-full h-full object-cover"
>

<!-- Ejemplo dentro de un contenedor con tamaño fijo -->
<div class="overflow-hidden rounded-lg shadow-xl">
    <img 
        src="./assets/equipo.jpg" 
        alt="Nuestro Equipo" 
        class="frame-it w-full h-96 object-cover"
    >
</div>
```

## Ejemplo Visual

### Antes (sin imagen)
```
┌─────────────────────────────────┐
│  ✨ Frame de Carga              │
│  (Con shimmer animado)          │
│  Borde dorado punteado          │
└─────────────────────────────────┘
```

### Después (imagen cargada)
```
┌─────────────────────────────────┐
│     Imagen Real Cargada         │
│     (Frame desaparece)          │
└─────────────────────────────────┘
```

## Ubicaciones Actuales

Las siguientes páginas ya usan Frame-IT:

- ✅ `index.html` - Hero section
- ✅ `src/pages/acerca-de.html` - Hero, Quiénes Somos, Nuestra Trayectoria

## Lugares Donde Agregar Frames

Cuando cargues nuevas imágenes, considera agregar frames en:

- Galerías de proyectos
- Testimonios con fotos
- Team members
- Case studies
- Banners publicitarios
- Cualquier sección de contenido visual

## Personalización

Si deseas cambiar el color del frame, edita `src/styles/components.css`:

```css
.frame-it {
    border: 3px dashed #BE8B51;  /* Cambia este color */
    box-shadow: inset 0 0 0 2px #FAFCFF, 0 0 20px rgba(190, 139, 81, 0.2);
}
```

## Preguntas Frecuentes

**P: ¿Qué pasa si la imagen no carga?**
R: El frame se mantiene indefinidamente, mostrando que hay un problema de carga.

**P: ¿Funciona con imágenes en background-image?**
R: No, Frame-IT solo funciona con `<img>`. Para backgrounds, considera usar un overlay cargador.

**P: ¿Puedo usar múltiples clases con frame-it?**
R: Sí, completamente. `frame-it` es compatible con Tailwind y CSS personalizadas.

**P: ¿Afecta el rendimiento?**
R: No, es solo CSS con una animación muy ligera. Cero impacto en rendimiento.
