import TableEmployees from "./dataTable/TableEmployees";
import EmployeeForm from "./forms/EmployeeForm";

function Employees() {
    return (
        <div className="flex flex-col gap-4 p-4 justify-center items-center lg:flex-row lg:justify-between lg:items-start">
            <EmployeeForm />
            <TableEmployees />
        </div>
    );
}

export default Employees;
