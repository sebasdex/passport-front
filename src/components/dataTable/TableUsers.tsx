import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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

interface TableUsersProps {
  handleOpen: () => void;
}

function TableUsers({ handleOpen }: TableUsersProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<User[]>([]);
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
    navigate(`/users/${id}`);
    handleOpen();
  };

  const showAlert = (text: string) => {
    toast.success(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const showError = (error: string) => {
    toast.error(error, {
      position: "top-right",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const deleteUser = async (id: number): Promise<void> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}users/api/deleteUser/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.ok) {
        const successData = await response.json();
        showAlert(successData.message);
      } else {
        showError("Error al eliminar usuario");
      }
    } catch (error) {
      console.error("Error al eliminar usuario", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_URL}users/api/getUsers`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        setRows(data.users);
      } catch (error) {
        console.error("Error al obtener los usuarios", error);
      }
    }
    fetchData();
  }, []);

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: 3,
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
        bgcolor: "background.default",
        border: "1px solid",
        borderColor: "grey.200",
      }}
    >
      <TableContainer
        sx={{
          maxHeight: 500,
          overflowX: "auto",
          "&::-webkit-scrollbar": { height: 6, bgcolor: "grey.100" },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "grey.400",
            borderRadius: 3,
          },
        }}
      >
        <Box sx={{ minWidth: { xs: "500px", sm: "700px", md: "900px" } }}>
          <Table stickyHeader aria-label="tabla de usuarios">
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  sx={{
                    fontWeight: 600,
                    fontSize: "1rem",
                    bgcolor: "#1976D2",
                    color: "primary.contrastText",
                    py: 2.5,
                    px: 3,
                    borderBottom: "none",
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontWeight: 600,
                    fontSize: "1rem",
                    bgcolor: "#1976D2",
                    color: "primary.contrastText",
                    py: 2.5,
                    px: 3,
                    borderBottom: "none",
                  }}
                >
                  Rol
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 600,
                    fontSize: "1rem",
                    bgcolor: "#1976D2",
                    color: "primary.contrastText",
                    py: 2.5,
                    px: 3,
                    borderBottom: "none",
                  }}
                >
                  Empleado
                </TableCell>
                <TableCell
                  sx={{
                    bgcolor: "#1976D2",
                    width: 70,
                    borderBottom: "none",
                  }}
                />
                <TableCell
                  sx={{
                    bgcolor: "#1976D2",
                    width: 70,
                    borderBottom: "none",
                  }}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 ? (
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      hover
                      key={row.id}
                      sx={{
                        "&:hover": { bgcolor: "primary.lighter" },
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      <TableCell
                        align="left"
                        sx={{
                          py: 2,
                          px: 3,
                          fontSize: "0.95rem",
                          color: "text.primary",
                          borderBottomColor: "grey.200",
                        }}
                      >
                        {row.email}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          py: 2,
                          px: 3,
                          fontSize: "0.95rem",
                          color: "text.primary",
                          textTransform: "capitalize",
                          borderBottomColor: "grey.200",
                        }}
                      >
                        {row.role}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          py: 2,
                          px: 3,
                          fontSize: "0.95rem",
                          color: "text.primary",
                          textTransform: "capitalize",
                          borderBottomColor: "grey.200",
                        }}
                      >
                        {`${row.employee.name} ${row.employee.firstName} ${row.employee.lastName}`}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          py: 2,
                          width: 70,
                          borderBottomColor: "grey.200",
                        }}
                      >
                        <IconButton
                          onClick={() => handleClick(row.id)}
                          sx={{
                            color: "primary.dark",
                            "&:hover": {
                              bgcolor: "primary.light",
                              color: "#fff",
                              transform: "scale(1.1)",
                            },
                            transition: "all 0.2s ease",
                          }}
                          aria-label="Editar usuario"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          py: 2,
                          width: 70,
                          borderBottomColor: "grey.200",
                        }}
                      >
                        <DialogAlert
                          iconButton={
                            <IconButton
                              sx={{
                                color: "error.dark",
                                "&:hover": {
                                  bgcolor: "error.light",
                                  color: "#fff",
                                  transform: "scale(1.1)",
                                },
                                transition: "all 0.2s ease",
                              }}
                              aria-label="Eliminar usuario"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          }
                          dialogQuestion="¿Deseas eliminar este usuario?"
                          dialogText="Esta operación eliminará el usuario permanentemente y no se podrá revertir."
                          buttonText="Eliminar"
                          buttonColorText="error"
                          handleConfirm={() => deleteUser(row.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    align="center"
                    sx={{ py: 5, bgcolor: "grey.50", borderBottom: "none" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        fontWeight={500}
                      >
                        No se encontraron datos
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ maxWidth: 400 }}
                      >
                        Parece que no hay usuarios registrados. ¡Agrega uno
                        nuevo para comenzar!
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          bgcolor: "grey.50",
          borderTop: "1px solid",
          borderColor: "grey.200",
          py: 1,
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
            {
              fontSize: "0.9rem",
              color: "text.secondary",
              fontWeight: 500,
            },
          "& .MuiTablePagination-actions .MuiIconButton-root": {
            color: "primary.main",
            "&:hover": { bgcolor: "primary.light" },
          },
        }}
      />
    </Paper>
  );
}

export default TableUsers;
