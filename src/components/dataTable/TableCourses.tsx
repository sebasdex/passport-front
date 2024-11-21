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
    name: string;
    firstName: string;
    lastName: string;
}

interface Course {
    id: number;
    courseName: string;
    description: string;
    startDate: string;
    endDate: string;
    instructor: string;
    approved: boolean;
    place: string;
    studentId: string;
    student: Employee;
}

function TableCourses() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState<Course[]>([]);
    const navigate = useNavigate();
    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClick = (id: number) => {
        navigate(`/courses/${id}`);
    };

    const showAlert = (text: string) => {
        toast.success(text, {
            position: "top-right",
            autoClose: 3000, // 3 segundos
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

    const deleteCourse = async (id: number): Promise<void> => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL}courses/api/deleteCourse/${id}`, {
                method: "DELETE",
                credentials: 'include',
            });
            if (response.ok) {
                showAlert("Curso eliminado correctamente");
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
                const response = await fetch(`${import.meta.env.VITE_URL}courses/api/getCourse`, {
                    method: "GET",
                    credentials: 'include',
                });
                const data = await response.json();
                setRows(data.courses);
            }
            fetchData();
        } catch (error) {
            console.error("Error al obtener los empleados", error);
        }
    }, [rows]);
    return (

        <Paper sx={{ minWidth: "200px", width: "100%", maxWidth: "90vw", overflow: "hidden", marginTop: "4rem", }}>
            <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" width={200}>
                                Curso
                            </TableCell>
                            <TableCell align="left" width={200}>
                                Descripción
                            </TableCell>
                            <TableCell align="left" width={200} className="text-center">
                                Lugar
                            </TableCell>
                            <TableCell align="left" width={200}>
                                Inicio
                            </TableCell>
                            <TableCell align="left" width={200}>
                                Término
                            </TableCell>
                            <TableCell align="left" width={200}>
                                Instructor
                            </TableCell>
                            <TableCell align="left" width={200}>
                                Empleado
                            </TableCell>
                            <TableCell align="left" width={200}>
                                ¿Aprobado?
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.length > 0 ? (
                            rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row?.id}>
                                            <TableCell align="left" width={200}>
                                                {row?.courseName}
                                            </TableCell>
                                            <TableCell align="left" width={200}>
                                                {row?.description}
                                            </TableCell>
                                            <TableCell align="left" width={200} className="text-center">
                                                {row?.place}
                                            </TableCell>
                                            <TableCell align="left" width={200}>
                                                {row?.startDate ? new Date(row?.startDate).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' }) : "No iniciado"}
                                            </TableCell>
                                            <TableCell align="left" width={200}>
                                                <p className={`w-fit rounded-sm ${row?.endDate === null && "bg-red-500 text-white p-1 text-xs font-semibold"}`}>{row?.endDate ? new Date(row.endDate).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' }) : "Pendiente"}</p>
                                            </TableCell>
                                            <TableCell align="left" width={200}>
                                                {row?.instructor}
                                            </TableCell>
                                            <TableCell align="left" width={200}>
                                                {`${row?.student.name} ${row?.student.firstName} ${row?.student.lastName} `}
                                            </TableCell>
                                            <TableCell align="left" width={200}>
                                                <p className={`p-1 text-xs font-semibold text-white w-fit rounded-sm ${row?.approved ? "bg-green-500" : "bg-red-500"}`}>{row?.approved ? "Aprobado" : "Denegado"}</p>
                                            </TableCell>
                                            <TableCell className="flex justify-end">
                                                <button onClick={() => handleClick(row?.id)}>
                                                    {<EditIcon />}
                                                </button>
                                            </TableCell>
                                            <TableCell className="flex justify-end">
                                                <DialogAlert
                                                    iconButton={<DeleteIcon className="text-red-500 hover:text-red-700 hover:cursor-pointer" />}
                                                    dialogQuestion="¿Está seguro de eliminar este curso?"
                                                    dialogText="Esta acción no se puede deshacer y eliminará permanentemente el curso."
                                                    buttonText="Eliminar"
                                                    buttonColorText="error"
                                                    handleConfirm={() => deleteCourse(row?.id)}
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

export default TableCourses