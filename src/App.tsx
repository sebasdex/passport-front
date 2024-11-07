import { useEffect, useState } from "react";
import InfoCoursesEmployee from "./components/InfoCoursesEmployee";
import PassportCover from "./components/PassportCover";

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

function App() {
  const arrowLeft = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </svg>
  );

  const arrowRight = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );

  const [dataCourse, setDataCourse] = useState<Courses[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    try {
      const response = fetch("http://localhost:3000/api/getCourse");
      response.then((res) => res.json()).then((data) => {
        if (data.courses) {
          setDataCourse(data.courses);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const filteredCourses = dataCourse.filter(course => course.studentId === 2);
  const employeeData = dataCourse.find(course => course.studentId === 2)?.student;

  const handleClickNext = () => {
    if (currentPage < filteredCourses.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleClickPrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentComponent = currentPage === 0 ? (
    <PassportCover employee={employeeData} />
  ) : (
    <InfoCoursesEmployee dataCourse={[filteredCourses[currentPage - 1]]} />
  );

  return (
    <section
      className={`${currentPage === 0 ? "bg-blue-900" : "bg-white"
        } text-white min-h-[39rem] rounded-xl shadow-lg w-full max-w-screen-xl mt-10 p-7 flex flex-col gap-4 justify-between relative`}
    >
      <button
        className="rounded-full bg-white h-10 w-10 text-black flex items-center justify-center hover:bg-blue-200 transition-all duration-300 absolute left-4 bottom-1/2 border-2 border-blue-200"
        onClick={handleClickPrev}
      >
        {arrowLeft}
      </button>
      <button
        className="rounded-full bg-white h-10 w-10 text-black flex items-center justify-center hover:bg-blue-200 transition-all duration-300 absolute right-4 bottom-1/2 border-2 border-blue-200"
        onClick={handleClickNext}
      >
        {arrowRight}
      </button>
      {currentComponent}
    </section>
  );
}

export default App;
