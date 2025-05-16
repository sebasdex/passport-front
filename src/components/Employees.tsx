import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import TableEmployees from "./dataTable/TableEmployees";
import EmployeeForm from "./forms/EmployeeForm";

interface Employee {
  id: number;
  employeeNumber: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  area: string;
}

export default function Employees() {
  const [rows, setRows] = useState<Employee[]>([]);
  const [open, setOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  // Fetch
  const fetchEmployees = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/employees/api/getEmployees`,
        { method: "GET", credentials: "include" }
      );
      const data = await res.json();
      setRows(data.employees);
    } catch {
      toast.error("No se pudo cargar la lista de empleados");
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // Delete employee
  const handleDelete = useCallback(
    async (employeeId: number) => {
      try {
        const res = await fetch(
          `/api/employees/api/deleteEmployee/${employeeId}`,
          { method: "DELETE", credentials: "include" }
        );
        const result = await res.json();
        if (!res.ok) throw new Error(result.message);
        toast.success("Empleado eliminado correctamente");
        fetchEmployees();
      } catch {
        toast.error("Error al eliminar empleado");
      }
    },
    [fetchEmployees]
  );

  // Open dialog (new or edit)
  const handleOpen = useCallback(
    (empId?: number) => {
      if (empId != null) navigate(`/employees/${empId}`);
      else navigate("/employees");
      setOpen(true);
    },
    [navigate]
  );

  // Close dialog and refetch
  const handleClose = useCallback(() => {
    setOpen(false);
    navigate("/employees");
    fetchEmployees();
  }, [fetchEmployees, navigate]);

  return (
    <Box
      component="main"
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {/* Header */}
      <Stack
        direction={isLg ? "row" : "column"}
        justifyContent="space-between"
        alignItems={isLg ? "center" : "stretch"}
        spacing={2}
        mb={3}
      >
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Empleados
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Administra los empleados de la plataforma
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
          size="large"
          fullWidth={!isLg}
          sx={{
            textTransform: "none",
          }}
          aria-label="Agregar nuevo empleado"
        >
          Nuevo registro
        </Button>
      </Stack>

      {/* Table */}
      <Box sx={{ flex: 1, overflow: "auto", width: "100%" }}>
        <TableEmployees
          rows={rows}
          onEdit={handleOpen}
          onDelete={handleDelete}
        />
      </Box>

      {/* Form in dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        fullScreen={isXs}
        scroll="paper"
      >
        <DialogTitle>
          {id ? "Editar empleado" : "Registrar empleado"}
        </DialogTitle>
        <DialogContent dividers>
          <EmployeeForm handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
