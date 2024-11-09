import TableUsers from "./dataTable/TableUsers"
import UsersForm from "./forms/UsersForm"


function Users() {
    return (
        <div className="flex items-start gap-4">
            <UsersForm />
            <TableUsers />
        </div>
    )
}

export default Users