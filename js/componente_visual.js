/**
 * ToastJS - Librería ligera de notificaciones interactivas en JavaScript
 * Soporta configuración de tiempos, tipos visuales e imágenes personalizadas.
 */
const Toast = (function () {
    let container = null;
    // Iconos de respaldo en caso de no suministrar una imagen
    const iconosPorDefecto = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };

    function obtenerContenedor() {
        if (!container || !document.body.contains(container)) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        return container;
    }
    function show({ mensaje = 'Notificación', tipo = 'info', duracion = 4000, imagen = null } = {}) {
        const cont = obtenerContenedor();
        // 1. Crear el nodo de la alerta
        const toast = document.createElement('div');
        toast.className = `toast toast-${tipo}`;
        // 2. Si se proporciona imagen, se genera el elemento <img>; de lo contrario, se usa el icono
        const mediaHtml = imagen
            ? `<img src="${imagen}" class="toast-img" alt="Icono de notificación" onerror="this.style.display='none'">`
            : `<span class="toast-icon">${iconosPorDefecto[tipo] || 'ℹ'}</span>`;
        // 3. Estructura interna
        toast.innerHTML = `
            <div class="toast-body">
                <div class="toast-content">
                    ${mediaHtml}
                    <span>${mensaje}</span>
                </div>
                <button class="toast-close" aria-label="Cerrar">&times;</button>
            </div>
            <div class="toast-progress"></div>
        `;
        cont.appendChild(toast);
        // 4. Animación de entrada suave
        requestAnimationFrame(() => {
            toast.classList.add('toast-show');
        });
        // 5. Animación regresiva de la barra de progreso
        const progressBar = toast.querySelector('.toast-progress');
        progressBar.style.transitionDuration = `${duracion}ms`;
        requestAnimationFrame(() => {
            progressBar.style.transform = 'scaleX(0)';
        });
        // 6. Control de destrucción y limpieza en el DOM
        let timeoutId = null;

        const cerrar = () => {
            if (timeoutId) clearTimeout(timeoutId);
            toast.classList.remove('toast-show');
            toast.classList.add('toast-hide');
            toast.addEventListener('transitionend', () => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, { once: true });
        };

        // Escucha del botón manual de cerrar
        const btnCerrar = toast.querySelector('.toast-close');
        btnCerrar.addEventListener('click', cerrar);
        // Auto-cierre
        if (duracion > 0) {
            timeoutId = setTimeout(cerrar, duracion);
        }
    }
    // Métodos accesibles directamente
    return {
        show,
        success: (msg, duracion, img) => show({ mensaje: msg, tipo: 'success', duracion, imagen: img }),
        error: (msg, duracion, img) => show({ mensaje: msg, tipo: 'error', duracion, imagen: img }),
        warning: (msg, duracion, img) => show({ mensaje: msg, tipo: 'warning', duracion, imagen: img }),
        info: (msg, duracion, img) => show({ mensaje: msg, tipo: 'info', duracion, imagen: img })
    };
})();