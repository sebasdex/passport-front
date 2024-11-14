import TableUsers from "./dataTable/TableUsers"
import UsersForm from "./forms/UsersForm"


function Users() {
    return (
        <div className="flex flex-col gap-4 p-4 justify-center items-center lg:flex-row lg:justify-between lg:items-start">
            <UsersForm />
            <TableUsers />
        </div>
    )
}

export default Users