import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
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
import TableCourses from "./dataTable/TableCourses";
import CoursesForm from "./forms/CoursesForm";

interface Course {
  id: number;
  courseName: string;
  description: string;
  startDate: string;
  endDate: string | null;
  instructor: string;
  approved: boolean;
  place: string;
  studentId: number;
  student: {
    name: string;
    firstName: string;
    lastName: string;
  };
}

export default function Courses() {
  const [rows, setRows] = useState<Course[]>([]);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // Large screens
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  // Load data
  const fetchCourses = useCallback(async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL}courses/api/getCourse`,
        { method: "GET", credentials: "include" }
      );
      const data = await res.json();
      setRows(data.courses);
    } catch (e) {
      console.error(e);
      toast.error("No se pudo cargar la lista de cursos");
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Delete action
  const handleDelete = useCallback(async (courseId: number) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL}courses/api/deleteCourse/${courseId}`,
        { method: "DELETE", credentials: "include" }
      );
      if (!res.ok) throw new Error();
      toast.success("Curso eliminado correctamente");
      setRows((prev) => prev.filter((r) => r.id !== courseId));
    } catch {
      toast.error("Error al eliminar curso");
    }
  }, []);

  // Open dialog for new or edit
  const handleEdit = useCallback(
    (courseId?: number) => {
      if (courseId) navigate(`/courses/${courseId}`);
      else navigate("/courses");
      setOpen(true);
    },
    [navigate]
  );

  // Close dialog
  const handleClose = useCallback(() => {
    setOpen(false);
    navigate("/courses");
    fetchCourses();
  }, [fetchCourses, navigate]);

  return (
    <Box
      component="main"
      sx={{
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2, sm: 3, md: 4 },
        display: "flex",
        flexDirection: "column",
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
          <Typography variant="h5" fontWeight="bold">
            Cursos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Administra los cursos de la plataforma
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleEdit(undefined)}
          size="large"
          fullWidth={!isLg}
          sx={{
            textTransform: "none",
            alignSelf: isLg ? "auto" : "stretch",
          }}
        >
          Nuevo registro
        </Button>
      </Stack>

      {/* Table of courses */}
      <Box sx={{ flex: 1, overflow: "auto" }}>
        <TableCourses rows={rows} onEdit={handleEdit} onDelete={handleDelete} />
      </Box>

      {/* Dialog*/}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        fullScreen={fullScreen}
        scroll="paper"
      >
        <DialogTitle>{id ? "Editar curso" : "Registrar curso"}</DialogTitle>
        <DialogContent dividers>
          <CoursesForm handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
