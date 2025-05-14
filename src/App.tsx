import { useEffect, useState } from "react";
import InfoCoursesEmployee from "./components/InfoCoursesEmployee";
import PassportCover from "./components/PassportCover";
import { useRole } from "./helpers/useRole";
import { useNavigate } from "react-router-dom";

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
  const { userData, setUserData } = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_URL}`, {
          method: "GET",
          credentials: "include",
        });
        if (response.status === 401) {
          setUserData({ role: null, employeeId: null });
          navigate("/login");
          return;
        }
      } catch (error) {
        console.log("Error al verificar autenticación", error);
      }
    };
    verifyAuth();
  }, [setUserData, navigate]);

  useEffect(() => {
    try {
      const response = fetch(
        `${import.meta.env.VITE_URL}courses/api/getCourse`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      response
        .then((res) => res.json())
        .then((data) => {
          if (data.courses) {
            setDataCourse(data.courses);
          }
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const filteredCourses = dataCourse.filter(
    (course) => course.studentId === userData?.employeeId
  );
  const employeeData = dataCourse.find(
    (course) => course.studentId === userData?.employeeId
  )?.student;
  const totalCourses: number = filteredCourses.length;

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

  const currentComponent =
    currentPage === 0 ? (
      <PassportCover employee={employeeData} totalCourses={totalCourses} />
    ) : (
      <InfoCoursesEmployee dataCourse={[filteredCourses[currentPage - 1]]} />
    );

  return (
    <section
      className={`
        ${
          currentPage === 0
            ? "bg-[#1976d2] text-white"
            : "bg-white text-gray-800"
        }
        w-full max-w-screen-2xl mx-auto
        px-4 py-8 md:px-8 md:py-12
        rounded-2xl shadow-xl
        flex flex-col justify-between relative
      `}
    >
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2
                   bg-white/80 hover:bg-white shadow-lg
                   focus:ring-2 focus:ring-blue-300
                   rounded-full p-3 md:p-4 text-blue-600
                   transition"
        onClick={handleClickPrev}
      >
        {arrowLeft}
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2
                   bg-white/80 hover:bg-white shadow-lg
                   focus:ring-2 focus:ring-blue-300
                   rounded-full p-3 md:p-4 text-blue-600
                   transition"
        onClick={handleClickNext}
      >
        {arrowRight}
      </button>
      {currentComponent}
    </section>
  );
}

export default App;
