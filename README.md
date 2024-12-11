# Gestión de Cursos (Passport)

Este proyecto es el frontend o la parte del cliente para el API de gestión de cursos, cuyo repositorio correspondiente se encuentra en el siguiente enlace: [Repositorio API](https://github.com/sebasdex/backend-passport).  
  
Este proyecto lleva el nombre de "Passport" debido a su interfaz inspirada en un diseño estilo pasaporte, lo que ofrece una experiencia visual amigable y moderna.  
El desarrollo de esta aplicación tiene como objetivo no solo gestionar eficientemente los cursos, usuarios y empleados, sino también reforzar mis habilidades en TypeScript y profundizar en conceptos clave como el manejo de sesiones y la implementación de restricciones de acceso, esenciales para aplicaciones seguras y escalables.

## Tecnologías y dependencias

- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Material UI**
- **React**
- **React Router**
- **React Hook Form**
- **React Toastify**

## Instalación

1. Clona el repositorio en tu máquina local:
   ```bash
   git clone https://github.com/sebasdex/passport-front.git
2. Accede a la carpeta del proyecto:
   ```bash
   cd passport-front
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
