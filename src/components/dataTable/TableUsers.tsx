import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import DialogAlert from "../DialogAlert";
import { toast } from "react-toastify";

interface Employee {
    id: number;
    employeeNumber: string;
    name: string;
    firstName: string;
    lastName: string;
}
interface User {
    id: number;
    email: string;
    role: number;
    employeeId: number;
    employee: Employee;
}
function TableUsers() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState<User[]>([]);
    const navigate = useNavigate();
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClick = (id: number) => {
        navigate(`/users/${id}`);
    };

    const showAlert = (text: string) => {
        toast.success(text, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const showError = (error: string) => {
        toast.error(error, {
            position: "top-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const deleteUser = async (id: number): Promise<void> => {
        try {
            const response = await fetch(`http://localhost:3000/users/api/deleteUser/${id}`, {
                method: "DELETE",
                credentials: 'include',
            });
            if (response.ok) {
                const successData = await response.json();
                showAlert(successData.message);
            } else {
                showError("Error al eliminar curso");
            }
        } catch (error) {
            console.error("Error al eliminar curso", error);
        }
    };

    useEffect(() => {
        try {
            async function fetchData() {
                const response = await fetch("http://localhost:3000/users/api/getUsers", {
                    method: "GET",
                    credentials: 'include',
                });
                const data = await response.json();
                setRows(data.users);
            }
            fetchData();
        } catch (error) {
            console.error("Error al obtener los empleados", error);
        }
    }, [rows]);
    return (
        <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "8rem" }}>
            <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" width={200}>
                                Email
                            </TableCell>
                            <TableCell align="left" width={200}>
                                Rol
                            </TableCell>
                            <TableCell align="left" width={200} className="text-center">
                                Empleado
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length > 0 ? (
                            rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell align="left" width={200}>
                                                {row.email}
                                            </TableCell>
                                            <TableCell align="left" width={200}>
                                                {row.role}
                                            </TableCell>
                                            <TableCell align="left" width={200} className="text-center">
                                                {row.employee.name} {row.employee.firstName} {row.employee.lastName}
                                            </TableCell>

                                            <TableCell className="flex justify-end">
                                                <button onClick={() => handleClick(row.id)}>
                                                    {<EditIcon />}
                                                </button>
                                            </TableCell>
                                            <TableCell className="flex justify-end">
                                                <DialogAlert
                                                    iconButton={<DeleteIcon className="text-red-500 hover:text-red-700 hover:cursor-pointer" />}
                                                    dialogQuestion="¿Está seguro de eliminar este usuario?"
                                                    dialogText="Esta acción no se puede deshacer y eliminará permanentemente el usuario."
                                                    buttonText="Eliminar"
                                                    buttonColorText="error"
                                                    handleConfirm={() => deleteUser(row.id)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
                                    No se encontraron datos
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

export default TableUsers