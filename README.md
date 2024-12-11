#  PassportApp (Gestión de Cursos)
  
*Este proyecto es parte de una práctica personal para mejorar mis habilidades de desarrollo web.*   
  
Es el frontend o la parte del cliente para el API de gestión de cursos, cuyo repositorio correspondiente se encuentra en el siguiente enlace: [Repositorio API](https://github.com/sebasdex/backend-passport).

El proyecto lleva el nombre "PassportApp", inspirado en su interfaz con diseño estilo pasaporte, que ofrece una experiencia visual amigable, moderna y atractiva.  
El desarrollo de esta aplicación tiene como propósito principal gestionar de manera eficiente los cursos, usuarios y empleados, mientras refuerzo mis conocimientos en TypeScript y profundizo en conceptos clave como el manejo de sesiones y la implementación de restricciones de acceso. Estas características son esenciales para construir aplicaciones seguras, escalables y de alto rendimiento.

## Tecnologías y dependencias  
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Material UI**
- **React**
- **React Router**
- **React Hook Form**
- **React Toastify**
    
(*ver archivo package.json*)

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
  Con MaterialUI se personaliza los botones y los dataTables para mostrar la información de manera agradable.

## Estructura del proyecto

```bash
├── public/              
├── src/
│   ├── assets/         
│   │   └── react.svg
│   ├── components/      
│   │   ├── dataTable/
│   │   │   ├── TableCourses.tsx
│   │   │   ├── TableEmployees.tsx
│   │   │   └── TableUsers.tsx
│   │   ├── forms/
│   │   │   ├── CoursesForm.tsx
│   │   │   ├── EmployeeForm.tsx
│   │   │   ├── LogInForm.tsx
│   │   │   └── UsersForm.tsx
│   │   ├── CircularUnderLoad.tsx
│   │   ├── Courses.tsx
│   │   ├── DialogAlert.tsx
│   │   ├── Employees.tsx
│   │   ├── Error.tsx
│   │   ├── FadeMenu.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── InfoCoursesEmployee.tsx
│   │   ├── LogIn.tsx
│   │   ├── PassportCover.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── Users.tsx
│   ├── context/         
│   │   ├── AuthContext.tsx
│   │   └── UserContext.tsx
│   ├── helpers/        
│   ├── App.tsx           
│   ├── Layout.tsx       
│   ├── index.css        
│   ├── main.tsx         
│   └── vite-env.d.ts    
├── .gitignore           
├── README.md            
├── eslint.config.js    
├── index.html           
├── package.json        
├── pnpm-lock.yaml       
├── postcss.config.js    
├── tailwind.config.js   
├── tsconfig.json        
├── tsconfig.app.json    
├── tsconfig.node.json   
└── vite.config.ts       

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

## Acceso

Para acceder al sistema, utiliza las siguientes credenciales de prueba:

- **Usuario:** *alan@testing.com*   
- **Contraseña:** *12345678* (¡Lo sé, no es la más segura!)
    
Para ver los cursos según el rol de usuario, primero deberás crear un empleado y asignarle uno o más cursos. Luego, asigna un usuario a ese empleado como rol secundario para habilitar el acceso.  

Inicia sesión con el usuario del empleado y tendrás acceso al sistema, pero solo a la sección de "Pasaporte", donde podrás ver todos los cursos con sus respectivos detalles.
