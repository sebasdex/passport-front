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
import { toast } from "react-toastify";
import DialogAlert from "../DialogAlert";

interface Employee {
  id: number;
  employeeNumber: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  area: string;
}

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<Employee[]>([]);

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
    navigate(`/employees/${id}`);
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

  useEffect(() => {
    try {
      async function fetchData() {
        const response = await fetch("http://localhost:3000/employees/api/getEmployees", {
          method: "GET",
          credentials: 'include',
        });
        const data = await response.json();
        setRows(data.employees);
      }
      fetchData();
    } catch (error) {
      console.error("Error al obtener los empleados", error);
    }
  }, [rows]);

  const deleteEmployee = async (id: number): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:3000/employees/api/deleteEmployee/${id}`, {
        method: "DELETE",
        credentials: 'include',
      });
      if (response.ok) {
        showAlert("Empleado eliminado correctamente");
      } else {
        console.error("Error al eliminar empleado", response);
      }
    } catch (error) {
      console.error("Error al eliminar empleado", error);
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "10rem" }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" width={200}>
                Employee Number
              </TableCell>
              <TableCell align="left" width={200}>
                Name
              </TableCell>
              <TableCell align="left" width={200}>
                First Name
              </TableCell>
              <TableCell align="left" width={200}>
                Last Name
              </TableCell>
              <TableCell align="left" width={200}>
                Email
              </TableCell>
              <TableCell align="left" width={200}>
                Area
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
                        {row.employeeNumber}
                      </TableCell>
                      <TableCell align="left" width={200}>
                        {row.name}
                      </TableCell>
                      <TableCell align="left" width={200}>
                        {row.firstName}
                      </TableCell>
                      <TableCell align="left" width={200}>
                        {row.lastName}
                      </TableCell>
                      <TableCell align="left" width={200}>
                        {row.email}
                      </TableCell>
                      <TableCell align="left" width={200}>
                        {row.area}
                      </TableCell>
                      <TableCell className="flex justify-end">
                        <button onClick={() => handleClick(row.id)}>
                          {<EditIcon />}
                        </button>
                      </TableCell>
                      <TableCell className="flex justify-end">
                        <DialogAlert
                          iconButton={<DeleteIcon className="text-red-500 hover:text-red-700 hover:cursor-pointer" />}
                          handleConfirm={() => deleteEmployee(row.id)}
                          dialogQuestion="¿Está seguro de eliminar este empleado?"
                          dialogText="Esta acción no se puede deshacer y eliminará permanentemente el empleado."
                          buttonText="Eliminar"
                          buttonColorText="error"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
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
  );
}
