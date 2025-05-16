import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
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
import TableUsers from "./dataTable/TableUsers";
import UsersForm from "./forms/UsersForm";

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

export default function Users() {
  const [rows, setRows] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  // Fetch
  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch(`/api/users/api/getUsers`, {
        method: "GET",
        credentials: "include",
      });
      const { users } = await res.json();
      setRows(users);
    } catch {
      toast.error("No se pudieron cargar los usuarios");
    }
  }, []);

  // Load initial
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Delete user
  const handleDelete = useCallback(
    async (userId: number) => {
      try {
        const res = await fetch(
          `/api/users/api/deleteUser/${userId}`,
          { method: "DELETE", credentials: "include" }
        );
        if (!res.ok) throw new Error();
        const { message } = await res.json();
        toast.success(message);
        fetchUsers();
      } catch {
        toast.error("Error al eliminar usuario");
      }
    },
    [fetchUsers]
  );

  // Open dialog (new or edit)
  const handleOpen = useCallback(
    (userId?: number) => {
      if (userId != null) {
        navigate(`/users/${userId}`);
      } else {
        navigate("/users");
      }
      setOpen(true);
    },
    [navigate]
  );

  // Close dialog and refetch
  const handleClose = useCallback(() => {
    setOpen(false);
    navigate("/users");
    fetchUsers();
  }, [fetchUsers, navigate]);

  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2, sm: 3, md: 4 },
        height: "100%",
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
          <Typography
            variant="h5"
            component="h1"
            fontWeight="bold"
            sx={{
              fontSize: { xs: "1.6rem", md: "2rem" },
              lineHeight: 1.2,
            }}
          >
            Usuarios
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Administra los usuarios de la plataforma
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
          size="large"
          sx={{
            textTransform: "none",
            alignSelf: isLg ? "auto" : "stretch",
          }}
          aria-label="Agregar nuevo usuario"
        >
          Nuevo registro
        </Button>
      </Stack>

      {/* Table*/}
      <Box sx={{ flex: 1, overflow: "auto" }}>
        <TableUsers rows={rows} onEdit={handleOpen} onDelete={handleDelete} />
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
        <DialogTitle>{id ? "Editar usuario" : "Registrar usuario"}</DialogTitle>
        <DialogContent dividers>
          <UsersForm handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
