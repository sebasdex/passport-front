import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRole } from "../helpers/useRole";
function Header() {
  const BookIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="size-9 text-yellow-400"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
      />
    </svg>
  );

  const { userData } = useRole();

  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        navigate('/login');
      } else {
        console.error('Error al cerrar sesión:', response.statusText);
      }
    } catch (error) {
      console.log('Error al cerrar sesión:', error);
    }
  };

  return (
    <header className="bg-blue-900 text-white flex justify-between items-center p-4">
      <nav className="flex items-center justify-between w-full container mx-auto">
        <Link to={"/"} className="text-2xl font-bold flex items-center gap-2">
          {BookIcon}PassportCourses
        </Link>
        <ul className="flex gap-4">
          {userData?.role === "administrador" && (
            <li>
              <Link to={"/courses"}>
                Cursos
              </Link>
            </li>
          )}
          {userData?.role === "administrador" && (
            <li>
              <Link to={"/employees"}>
                Empleados
              </Link>
            </li>
          )}
          {userData?.role === "administrador" && (
            <li>
              <Link to={"/users"}>
                Usuarios
              </Link>
            </li>
          )}
          <li>
            <button onClick={handleLogOut}>Salir</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
