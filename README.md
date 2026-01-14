# 🇵🇪 Consulta Perú - Buscador de DNI y RUC

Una aplicación web moderna y rápida para consultar información de personas (DNI) y empresas (RUC) en Perú, utilizando la API de datos abiertos. Desarrollada con **React**, **TypeScript** y **Vite**.
Puedes ver el proyecto funcionando aquí:
🔗 **[Ver Demo en Vercel](https://vite-il5vv4fn5-selenecus-projects.vercel.app/)**

## 🛠 Tecnologías Usadas

* **[React](https://reactjs.org/)** - Librería para la interfaz.
* **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático para mayor seguridad.
* **[Vite](https://vitejs.dev/)** - Entorno de desarrollo ultrarrápido.
* **[Styled Components](https://styled-components.com/)** - Estilos CSS-in-JS con soporte de temas.
* **[Framer Motion](https://www.framer.com/motion/)** - Animaciones suaves.

## ✨ Características Principales

* ✅ **Detección Automática:** Identifica si ingresas 8 dígitos (DNI) u 11 dígitos (RUC) automáticamente.
* 🌙 **Dark Mode:** Cambio de tema claro/oscuro persistente.
* ⚡ **Rápido y Responsivo:** Diseño adaptado a móviles y escritorio.
* 🔒 **Proxy Seguro:** Configuración para evitar problemas de CORS en desarrollo.

## 📦 Instalación y Uso Local

Sigue estos pasos para correr el proyecto en tu computadora:

1.  **Clonar el repositorio:**
    ```bash
    git clone ((https://github.com/selenecu/CONSULTA-RENIEC.git))
    cd CONSULTA-RENIEC
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Correr el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

4.  Abre tu navegador en `http://localhost:5173`.

## ⚙️ Configuración de API (Proxy)

Este proyecto utiliza un **Proxy** en Vite para conectar con la API de `decolecta.com` y evitar bloqueos CORS.

* En desarrollo: Las peticiones van a `/api-reniec/...` y Vite las redirige.
* En producción (Vercel): Se utiliza `vercel.json` para manejar las reescrituras.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si tienes sugerencias para mejorar este proyecto, siéntete libre de hacer un fork y enviar un Pull Request.

---
Desarrollado con ❤️ por Selene Culquicondor(https://github.com/selenecu)
