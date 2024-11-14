import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
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
              <span className="text-blue-900">Fecha de finalización:</span>{" "}
              {course.endDate ? new Date(course.endDate).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' }) : "Sin fecha definida"}
            </p>
          </article>
          <footer className="flex flex-col gap-2 items-center lg:flex-row lg:justify-between lg:items-end">
            <p className="text-blue-800 italic">
              Fecha del curso: {new Date(course.startDate).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })} - {course.endDate ? new Date(course.endDate).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' }) : "Sin fecha de finalización"}
            </p>
            <div className={`h-32 w-32 rotate-12 rounded-full flex flex-col items-center justify-center ${course.approved ? "bg-green-300 text-green-600" : "bg-red-500 text-white"}`}>
              {course.approved ? <CheckCircleIcon /> : <BlockIcon fontSize='large' />}
              <p className="text-lg font-bold uppercase flex flex-col items-center text-center">
                {course.approved ? "Aprobado" : "Denegado"}
                <span className="block text-xs font-normal">{course.endDate ? new Date(course.endDate).toLocaleDateString('es-ES') : "Por definir"}</span>
              </p>
            </div>
          </footer>
        </div>
      ))}
    </>
  );
}

export default InfoCoursesEmployee;
