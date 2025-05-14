import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";

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

export default function InfoCoursesEmployee({
  dataCourse,
}: InfoCoursesEmployeeProps) {
  const course = dataCourse[0];
  if (!course) return null;

  return (
    <article className="h-full w-full flex flex-col bg-white rounded-2xl ring-1 ring-gray-200 overflow-hidden">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start p-6 border-b border-gray-200">
        <div>
          <p className="text-2xl font-semibold">{course.place}</p>
          <p className="text-sm text-gray-500">{course.student.area}</p>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <p className="text-xl font-bold">
            {`${course.student.name} ${course.student.firstName} ${course.student.lastName}`}
          </p>
          <p className="text-xs uppercase text-gray-400">
            {course.student.employeeNumber}
          </p>
        </div>
      </header>

      {/* CONTENT */}
      <main className="flex-1 p-6 overflow-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          {course.courseName}
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4">
          {course.description}
        </p>
        <p className="text-sm mb-2">
          <span className="font-medium">Instructor: </span>
          {course.instructor}
        </p>
        <p className="text-sm">
          <span className="font-medium">Fecha de finalización: </span>
          {course.endDate
            ? new Date(course.endDate).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "Sin fecha definida"}
        </p>
      </main>

      {/* FOOTER */}
      <footer className="flex flex-col md:flex-row justify-between items-center p-6 border-t border-gray-200">
        <time className="text-sm text-gray-500 italic mb-2 md:mb-0">
          Fecha del curso:{" "}
          {new Date(course.startDate).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "short",
          })}{" "}
          -{" "}
          {course.endDate
            ? new Date(course.endDate).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "short",
              })
            : "Sin fecha"}
        </time>
        <div
          className={`inline-flex items-center px-4 py-2 rounded-full ${
            course.approved
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {course.approved ? (
            <CheckCircleIcon fontSize="small" />
          ) : (
            <BlockIcon fontSize="small" />
          )}
          <span className="ml-2 font-semibold uppercase">
            {course.approved ? "Aprobado" : "Denegado"}
          </span>
        </div>
      </footer>
    </article>
  );
}
