interface Courses {
  id: number;
  courseName: string;
  courseDescription: string;
  startDate: string;
  endDate: string;
  coachName: string;
  departmentName: string;
  approved: boolean;
  placeName: string;
  employeeName: string;
  employeeNumber: string;
}
function InfoCoursesEmployee() {
  const courses: Courses[] = [
    {
      id: 234234,
      courseName: "Curso de React",
      courseDescription: "Curso para aprender React",
      startDate: "2023-01-01",
      endDate: "2023-01-31",
      coachName: "Ivan le Roux",
      departmentName: "Marketing",
      approved: true,
      placeName: "Madrid",
      employeeName: "Jane Doe",
      employeeNumber: "EMP12345",
    },
  ];

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
      {courses.map((course) => (
        <>
          <header className="flex gap-4 p-2 justify-between items-center border-b-2 border-blue-200 text-blue-900">
            <div>
              <p className="text-3xl font-bold ">{course.placeName}</p>
              <p className="text-blue-600">{course.departmentName}</p>
            </div>
            <div>
              <p className="text-xl font-bold">{course.employeeName}</p>
              <p>{course.employeeNumber}</p>
            </div>
          </header>
          <article className="flex-1 space-y-2 text-blue-900">
            <h1 className="text-2xl font-bold capitalize text-blue-600">
              {course.courseName}
            </h1>
            <p>{course.courseDescription}</p>
            <p className="font-bold">
              Instructor:{" "}
              <span className="font-normal">{course.coachName}</span>
            </p>

            <p className="text-green-600 font-bold">
              Completado el: {course.endDate}
            </p>
          </article>
          <footer className="flex justify-between items-end">
            <p className="text-blue-900">
              Fecha del curso: {course.startDate} - {course.endDate}
            </p>
            <div className="h-32 w-32 rotate-12 rounded-full bg-green-300 text-green-600 flex flex-col items-center justify-center">
              {checkApproved}
              <p className="text-lg font-bold uppercase flex flex-col items-center">
                {course.approved ? "Aprobado" : "Pendiente"}
                <span className="block text-sm font-normal">
                  {course.endDate}
                </span>
              </p>
            </div>
          </footer>
        </>
      ))}
    </>
  );
}

export default InfoCoursesEmployee;
