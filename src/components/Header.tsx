function Header() {
    return (
        <header className="bg-blue-900 text-white flex justify-between items-center p-4">
            <nav className="flex justify-between w-full container mx-auto">
                <h1>PassportCourses</h1>
                <ul className="flex gap-4">
                    <li><a href="/courses">Cursos</a></li>
                    <li><a href="/employees">Empleados</a></li>
                    <li><a href="/my-data">Mis datos</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header