import { Link } from "react-router-dom";
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

  return (
    <header className="bg-blue-900 text-white flex justify-between items-center p-4">
      <nav className="flex items-center justify-between w-full container mx-auto">
        <Link to={"/"} className="text-2xl font-bold flex items-center gap-2">
          {BookIcon}PassportCourses
        </Link>
        <ul className="flex gap-4">
          <li>
            <a href="/courses">Cursos</a>
          </li>
          <li>
            <a href="/employees">Empleados</a>
          </li>
          <li>
            <a href="/my-data">Mis datos</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
