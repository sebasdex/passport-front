import TableEmployees from "./dataTable/TableEmployees"
import EmployeeForm from "./forms/EmployeeForm"


function Employees() {
    return (
        <div className="flex items-center justify-center w-full">
            <EmployeeForm />
            <TableEmployees />
        </div>
    )
}

export default Employees