// 1. Notificación con avatar de usuario (usa imagen local de img/ o placeholder online si aún no tienes local)
        document.getElementById('btnAvatar').addEventListener('click', () => {
            Toast.show({
                mensaje: "Un barbaro te ha enviado un mensaje",
                tipo: "info",
                duracion: 4500,
                imagen: "https://aresscanlationovel.com/wp-content/uploads/2024/10/17302134709819131468368943147248-1200x630.jpg" // También puedes usar "img/usuario.png"
            });
        });

        // 2. Notificación de pedido completado con imagen
        document.getElementById('btnPedido').addEventListener('click', () => {
            Toast.show({
                mensaje: "¡Tu paquete #5482 va en camino!",
                tipo: "success",
                duracion: 5000,
                imagen: "./img/paquete.png" // O ruta local "img/paquete.png"
            });
        });

        // 3. Notificación clásica de advertencia (Usa icono de texto)
        document.getElementById('btnAlerta').addEventListener('click', () => {
            Toast.warning("Tu almacenamiento está al 90% de capacidad");
        });

        // 4. Notificación clásica de error
        document.getElementById('btnError').addEventListener('click', () => {
            Toast.error("No se pudo conectar con el servidor central");
        });