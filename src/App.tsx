import { useState } from "react";
import InfoCoursesEmployee from "./components/InfoCoursesEmployee";
import PassportCover from "./components/PassportCover";
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
  const pages = [<PassportCover />, <InfoCoursesEmployee />];
  const [currentComponent, setCurrentComponent] = useState(pages[0]);
  const [currentPage, setCurrentPage] = useState(0);
  const handleClickNext = () => {
    setCurrentComponent(pages[currentPage + 1]);
    setCurrentPage(currentPage + 1);
    console.log(currentComponent);
  };
  const handleClickPrev = () => {
    if (currentPage === 0) return;
    setCurrentComponent(pages[currentPage - 1]);
    setCurrentPage(currentPage - 1);
    console.log(currentComponent);
  };

  return (
    <>
      <section
        className={`${currentPage === 0 ? "bg-blue-900" : "bg-white"
          } text-white min-h-[39rem] rounded-xl shadow-lg w-full max-w-screen-xl mt-10 p-7 flex flex-col 
        gap-4 justify-between relative`}
      >
        <button
          className="rounded-full bg-white h-10 w-10 text-black flex items-center justify-center hover:bg-blue-200
        transition-all duration-300 absolute left-4 bottom-1/2 border-2 border-blue-200"
          onClick={() => handleClickPrev()}
        >
          {arrowLeft}
        </button>
        <button
          className="rounded-full bg-white h-10 w-10 text-black flex items-center justify-center hover:bg-blue-200
        transition-all duration-300 absolute right-4 bottom-1/2 border-2 border-blue-200"
          onClick={() => handleClickNext()}
        >
          {arrowRight}
        </button>
        {currentComponent}
      </section>
    </>
  );
}

export default App;
