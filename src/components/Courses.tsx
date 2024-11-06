import TableCourses from "./dataTable/TableCourses"
import CoursesForm from "./forms/CoursesForm"

function Courses() {
    return (
        <div className="flex items-start gap-4">
            <CoursesForm />
            <TableCourses />
        </div>
    )
}

export default Courses