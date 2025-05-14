import LogInForm from "./forms/LogInForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LogIn() {
  const year = new Date().getFullYear();
  return (
    <div className="min-h-screen bg-[#1976d2] flex items-center justify-center p-4">
      {/* Toaster */}
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar
        theme="light"
      />

      {/* Main layout */}
      <div className="w-full max-w-3xl mx-auto">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT */}
            <div className="p-8 flex flex-col justify-center space-y-4 text-center lg:text-left">
              <p className="text-xl font-semibold text-gray-800">
                Portal de Acceso
              </p>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Bienvenido a tu{" "}
                <span className="text-[#1976d2]">Pasaporte de Cursos</span>
              </h1>
              <p className="text-gray-600">
                Accede al estado de tus cursos realizados en la empresa para ver
                tu progreso.
              </p>
            </div>
            {/* RIGHT */}
            <div className="p-8 bg-gray-50 flex flex-col justify-center">
              <LogInForm />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-4 text-center text-white text-sm">
          © 2024 - {year} Pasaporte de Cursos • Desarrollado por SebastianDC
        </footer>
      </div>
    </div>
  );
}
