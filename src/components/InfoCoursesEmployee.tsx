interface Employee {
  id: number;
  employeeNumber: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  area: string;
}
interface Courses {
  id: number;
  courseName: string;
  description: string;
  startDate: string;
  endDate: string;
  instructor: string;
  approved: boolean;
  place: string;
  studentId: number;
  student: Employee;
}
type InfoCoursesEmployeeProps = {
  dataCourse: Courses[];
};
function InfoCoursesEmployee({ dataCourse }: InfoCoursesEmployeeProps) {
  const checkApproved = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.9"
      stroke="currentColor"
      className="size-9"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
      />
    </svg>
  );
  return (
    <>
      {dataCourse.map((course) => (
        <div key={course.id} className="border-2 border-blue-200 rounded-xl p-4 flex flex-col gap-4 justify-between min-h-[35rem]">
          <header className="flex flex-col p-2 border-b-2 border-blue-200 text-blue-900 lg:flex-row lg:justify-between lg:items-center">
            <div>
              <p className="text-3xl font-bold">{course.place}</p>
              <p className="text-blue-600">{course.student.area}</p>
            </div>
            <div>
              <p className="text-xl lg:text-2xl font-bold">{`${course.student.name} ${course.student.firstName} ${course.student.lastName}`}</p>
              <p className="uppercase">{course.student.employeeNumber}</p>
            </div>
          </header>
          <article className="flex-1 space-y-2 text-blue-900">
            <h1 className="text-2xl font-bold capitalize text-blue-600">
              {course.courseName}
            </h1>
            <p>{course.description}</p>
            <p className="font-bold">
              Instructor:{" "}
              <span className="font-normal">{course.instructor}</span>
            </p>
            <p className={`text-green-600 font-bold ${course.endDate ? "" : "text-red-500"}`}>
              <span className="text-blue-900">Completado el:</span> {course.endDate ? new Date(course.endDate).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' }) : "No finalizado"}
            </p>
          </article>
          <footer className="flex flex-col gap-2 items-center lg:flex-row lg:justify-between lg:items-end">
            <p className="text-blue-800 italic">
              Fecha del curso: {new Date(course.startDate).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })} - {course.endDate ? new Date(course.endDate).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' }) : "Sin fecha de finalización"}
            </p>
            <div className={`h-32 w-32 rotate-12 rounded-full  flex flex-col items-center justify-center ${course.approved ? "bg-green-300 text-green-600" : "bg-red-500 text-white"}`}>
              {checkApproved}
              <p className="text-lg font-bold uppercase flex flex-col items-center">
                {course.approved ? "Aprobado" : "Pendiente"}
                <span className="block text-sm font-normal">{course.endDate ? new Date(course.endDate).toLocaleDateString('es-ES') : ""}</span>
              </p>
            </div>
          </footer>
        </div>
      ))}
    </>
  );
}

export default InfoCoursesEmployee;
