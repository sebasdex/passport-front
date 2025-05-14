import { ReactElement } from "react";

interface Employee {
  name: string;
  firstName: string;
  lastName: string;
  employeeNumber: string;
  area: string;
}

type PassportCoverProps = {
  employee: Employee | undefined;
  totalCourses: number;
};

export default function PassportCover({
  employee,
  totalCourses,
}: PassportCoverProps): ReactElement {
  const WorldIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.7"
      stroke="currentColor"
      className="w-10 h-10 text-white"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
      />
    </svg>
  );

  return (
    <article className="h-full w-full flex flex-col text-gray-50">
      {/* HEADER */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-white/30">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Employee Passport
          </h1>
          <p className="text-xs uppercase opacity-80">PassportCourses</p>
        </div>
        <div className="p-2 rounded-full">{WorldIcon}</div>
      </header>

      {/* MAIN */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 px-8 py-6 gap-6">
        {/* LOGO */}
        <div className="flex items-center justify-center">
          <div className="h-40 w-40 md:h-48 md:w-48 rounded-full border-4 border-yellow-400 overflow-hidden">
            <img
              src="logo.png"
              alt="employee"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* INFO */}
        <div className="flex flex-col justify-center space-y-4">
          <div>
            <p className="text-xs uppercase opacity-70">Nombre</p>
            <p className="text-lg font-bold leading-tight">
              {employee
                ? `${employee.name} ${employee.firstName} ${employee.lastName}`
                : "—"}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase opacity-70">Número</p>
            <p className="text-lg font-bold">
              {employee?.employeeNumber ?? "—"}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase opacity-70">Área</p>
            <p className="text-lg font-bold">{employee?.area ?? "—"}</p>
          </div>
          <div>
            <p className="text-xs uppercase opacity-70">Cursos</p>
            <p className="text-lg font-bold">{totalCourses}</p>
          </div>
          <p className="mt-6 text-xs italic opacity-80">
            Embark on your global learning journey
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="px-8 py-4 border-t border-white/30 flex justify-end">
        <time className="text-xs uppercase">
          Expira: <span className="font-bold">31 Dic 2025</span>
        </time>
      </footer>
    </article>
  );
}
