const START_YEAR = 2024;

function Footer() {
  const currentYear = new Date().getFullYear();
  const yearDisplay =
    currentYear > START_YEAR
      ? `${START_YEAR} - ${currentYear}`
      : currentYear.toString();

  return (
    <footer className="bg-[#1976D2] text-white py-5 px-4 sm:px-6 lg:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 items-center">
          {/* Column 1: Copyright */}
          <p className="text-sm text-white/75 text-center md:text-left">
            © {yearDisplay} PassportCourses App
          </p>

          {/* Column 2: Links */}
          <p className="text-sm text-white/80 text-center md:text-right">
            Hecho con{" "}
            <span role="img" aria-label="corazón" className="text-red-500">
              ❤️
            </span>{" "}
            por{" "}
            <a
              href="https://github.com/sebasdex"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white hover:text-blue-200 transition-colors duration-150"
            >
              SebastianDC
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
