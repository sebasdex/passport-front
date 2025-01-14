import LogInForm from "./forms/LogInForm"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function LogIn() {
    return (
        <div className="min-h-dvh flex flex-col justify-between bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950">
            <ToastContainer />
            <section className="mt-6 container mx-auto flex flex-col lg:flex-row items-center justify-center p-4 gap-8 lg:gap-16">
                <article className="text-white font-bold flex flex-col gap-4  text-center lg:text-left">
                    <p className="text-lg lg:text-xl font-semibold">Portal de Acceso</p>
                    <h1 className="text-4xl lg:text-5xl flex flex-col">Bienvenido a tu
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">Pasaporte de Cursos</span>
                    </h1>
                    <p className="lg:w-96 text-blue-100 text-base lg:text-lg max-w-xl mx-auto lg:mx-0">Accede al estado de tus cursos realizados en la empresa para ver tu progreso.</p>
                </article>
                <article className="flex flex-col justify-evenly text-white bg-[#1F2E69] border border-blue-700 shadow-lg h-96 lg:h-fit lg:w-[27rem] p-4 rounded-lg">
                    <div className="text-center">
                        <p className="text-lg lg:text-xl font-semibold text-white mb-2">Accede a tu cuenta</p>
                        <p className="text-blue-200/80 text-sm">Ingresa tus credenciales para acceder a tus cursos</p>
                    </div>
                    <LogInForm />
                </article>
            </section>
            <footer className=" flex flex-col lg:flex-row lg:gap-2 justify-center items-center w-full py-4 text-center text-blue-200/60 text-sm">
                <p>© 2024 Pasaporte de cursos</p>
                <p className="hidden lg:block">-</p>
                <p>Desarrollado por <a href="https://github.com/sebasdex" rel="noreferrer" target="_blank">SebastianDC</a></p>
            </footer>
        </div>
    )
}

export default LogIn