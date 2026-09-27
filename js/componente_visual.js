/**
 * ToastJS - Librería de notificaciones interactivas
 */
const Toast = (function () {
    let container = null;
    const iconos = {
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
        const toast = document.createElement('div');
        toast.className = `toast toast-${tipo}`;
        // Si mandas imagen, creamos un tag <img>; si no, dejamos el icono de texto
        const mediaHtml = imagen 
            ? `<img src="${imagen}" class="toast-img" alt="Icono">`
            : `<span class="toast-icon">${iconos[tipo] || 'ℹ'}</span>`;
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
        requestAnimationFrame(() => toast.classList.add('toast-show'));
        const progressBar = toast.querySelector('.toast-progress');
        progressBar.style.transitionDuration = `${duracion}ms`;
        requestAnimationFrame(() => progressBar.style.transform = 'scaleX(0)');
        let timeoutId = null;
        const cerrar = () => {
            if (timeoutId) clearTimeout(timeoutId);
            toast.classList.remove('toast-show');
            toast.classList.add('toast-hide');
            toast.addEventListener('transitionend', () => {
                if (toast.parentElement) toast.remove();
            }, { once: true });
        };
        toast.querySelector('.toast-close').addEventListener('click', cerrar);

        if (duracion > 0) {
            timeoutId = setTimeout(cerrar, duracion);
        }
    }
    return {
        show,
        success: (msg, duracion, imagen) => show({ mensaje: msg, tipo: 'success', duracion, imagen }),
        error: (msg, duracion, imagen) => show({ mensaje: msg, tipo: 'error', duracion, imagen }),
        warning: (msg, duracion, imagen) => show({ mensaje: msg, tipo: 'warning', duracion, imagen }),
        info: (msg, duracion, imagen) => show({ mensaje: msg, tipo: 'info', duracion, imagen })
    };
})();