import TableEmployees from "./dataTable/TableEmployees";
import EmployeeForm from "./forms/EmployeeForm";

function Employees() {
    return (
        <div className="flex items-start gap-4">
            <EmployeeForm />
            <TableEmployees />
        </div>
    );
}

export default Employees;
