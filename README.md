# Frontend - Gestión de Cursos (Passport)

Este es el frontend para el sistema de **gestión de cursos**, diseñado como la interfaz de cliente para la API correspondiente, cuyo repositorio se puede encontrar en el siguiente enlace: [Repositorio API](enlace-del-repositorio-api).

El nombre del proyecto, **"Passport"**, hace referencia a la inspiración en el diseño de pasaporte, lo que le otorga una interfaz moderna y visualmente atractiva. El objetivo principal de este proyecto es facilitar la gestión de cursos, usuarios y empleados, al tiempo que refuerza mis habilidades en **TypeScript** y conceptos clave como el manejo de sesiones y la implementación de restricciones de acceso. Estas características son esenciales para construir aplicaciones seguras, escalables y fáciles de usar.

## Tecnologías y dependencias

- **TypeScript**: Lenguaje basado en JavaScript que añade tipado estático.
- **Vite**: Herramienta moderna para el desarrollo frontend con un rendimiento optimizado.
- **Tailwind CSS**: Framework para diseño de interfaces, centrado en la utilidad y personalización.
- **Material UI**: Biblioteca de componentes React para crear interfaces interactivas y accesibles.
- **React**: Biblioteca para construir interfaces de usuario dinámicas.
- **React Router**: Gestión de rutas en la aplicación para navegación entre páginas.
- **React Hook Form**: Librería para la gestión y validación de formularios.
- **React Toastify**: Librería para mostrar notificaciones emergentes de éxito y error.
- **@mui/icons-material**: Conjunto de iconos listos para usar con Material UI.
- **@emotion/react y @emotion/styled**: Utilizados para estilizar componentes de manera dinámica dentro de React.

## Instalación

1. Clona el repositorio en tu máquina local:
   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
2. Accede a la carpeta del proyecto:
   ```bash
   cd carpeta-de-proyecto
3. Instala las dependencias utilizando pnpm:
   ```bash
   pnpm install
4. Inicia el servidor de desarrollo:
   ```bash
   pnpm run dev

## Características
- **Autenticación y control de acceso:**
    Se utiliza un AuthContext para manejar el estado global de la sesión de los usuarios, garantizando que solo los usuarios autenticados puedan acceder a las páginas protegidas.  
- **Rutas protegidas:**
  Se implementan rutas privadas que aseguran que solo los usuarios autorizados puedan acceder a ciertas áreas del sistema, como la gestión de usuarios y empleados.    
- **Gestión de formularios:**
  Los formularios de creación y edición de usuarios, empleados y cursos están validados de manera eficiente utilizando React Hook Form.  
- **Notificaciones de éxito:**
  Gracias a Toastify, los usuarios reciben notificaciones visuales que indican el éxito o el error de sus acciones.  
- **Interfaz moderna:**
  Con MaterialUI se personaliza los botones y los Tables para mostrar la información de manera agradable.

## Estructura del proyecto

```bash
├── src/
│   ├── components/      # Componentes reutilizables
│   ├── context/         # Contextos globales (como AuthContext)
│   ├── pages/           # Páginas (ej. Usuarios, Empleados, Cursos)
│   ├── routes/          # Definición de rutas
│   ├── services/        # Llamadas a la API
│   ├── styles/          # Archivos de Tailwind CSS
│   └── utils/           # Funciones utilitarias
├── public/              # Archivos estáticos
├── tailwind.config.js   # Configuración de Tailwind CSS
├── tsconfig.json        # Configuración de TypeScript
└── vite.config.ts       # Configuración de Vite
```

## Funcionalidades

- **Gestión de usuarios, empleados y cursos:**
   A través de formularios intuitivos, los usuarios pueden gestionar información relacionada con cursos, usuarios y empleados.
- **Protección de rutas:**
  Las rutas privadas solo son accesibles si el usuario ha iniciado sesión, asegurando que no se pueda acceder a información sensible sin la debida autorización.
- **UI personalizada:**
  Los componentes visuales (como botones y tablas) están diseñados y estilizados con Material UI para ofrecer una experiencia moderna, accesible y fácil de usar.
- **Mensajes de éxito y error:**
  Se usan notificaciones de tipo toast para indicar al usuario el resultado de sus acciones (por ejemplo, cuando se guardan o actualizan datos).
