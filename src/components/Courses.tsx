import TableCourses from "./dataTable/TableCourses"
import CoursesForm from "./forms/CoursesForm"

function Courses() {
    return (
        <div className="flex flex-col gap-4 p-4 justify-center items-center lg:flex-row lg:justify-between lg:items-start">
            <CoursesForm />
            <TableCourses />
        </div>
    )
}

export default Courses