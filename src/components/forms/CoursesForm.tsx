import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { toast } from "react-toastify";

interface CoursesFormProps {
  courseName?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  instructor?: string;
  approved?: boolean;
  place?: string;
  studentId?: number | string;
}
interface Employee {
  id: number;
  employeeNumber: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  area: string;
}

export default function CoursesForm({
  handleClose,
}: {
  handleClose: () => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<CoursesFormProps>({
    defaultValues: {
      courseName: "",
      description: "",
      startDate: "",
      endDate: "",
      instructor: "",
      approved: false,
      place: "",
      studentId: "",
    },
  });

  const [employees, setEmployees] = useState<Employee[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const showAlert = (msg: string) =>
    toast.success(msg, { position: "top-right", autoClose: 3000 });
  const showError = (msg: string) =>
    toast.error(msg, { position: "top-right" });

  // Load data if ID
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_URL}courses/api/getCourse/${id}`,
          { method: "GET", credentials: "include" }
        );
        if (!res.ok) {
          showError("Error al cargar datos");
          return;
        }
        const { course } = await res.json();
        setValue("courseName", course.courseName);
        setValue("description", course.description);
        setValue(
          "startDate",
          course.startDate
            ? new Date(course.startDate).toISOString().split("T")[0]
            : ""
        );
        setValue(
          "endDate",
          course.endDate
            ? new Date(course.endDate).toISOString().split("T")[0]
            : ""
        );
        setValue("instructor", course.instructor);
        setValue("approved", course.approved);
        setValue("studentId", course.studentId);
        setValue("place", course.place);
      } catch {
        showError("Error al cargar datos");
      }
    })();
  }, [id, setValue]);

  // Load employees
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_URL}employees/api/getEmployees`,
          { method: "GET", credentials: "include" }
        );
        const { employees } = await res.json();
        setEmployees(employees);
      } catch {
        console.error("Error al cargar empleados");
      }
    })();
  }, []);

  // Save logic
  const apiSubmit: SubmitHandler<CoursesFormProps> = async (data) => {
    if (data.studentId) data.studentId = Number(data.studentId);
    try {
      const url = id
        ? `${import.meta.env.VITE_URL}courses/api/updateCourse/${id}`
        : `${import.meta.env.VITE_URL}courses/api/addCourse`;
      const method = id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        showError("Error al guardar datos");
        return;
      }
      showAlert(id ? "Datos actualizados" : "Datos guardados");
      navigate("/courses");
      reset();
      handleClose();
    } catch {
      showError("Error al guardar datos");
    }
  };

  // Confirm before submit
  const onSubmit = () => setConfirmOpen(true);
  const handleConfirm = () => {
    setConfirmOpen(false);
    apiSubmit(getValues());
  };

  return (
    <Box p={3}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          {/* Course name */}
          <Controller
            name="courseName"
            control={control}
            rules={{ required: "Se necesita un nombre" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre del curso *"
                fullWidth
                error={!!errors.courseName}
                helperText={errors.courseName?.message}
                slotProps={{
                  formHelperText: { sx: { mx: 0 } },
                }}
              />
            )}
          />

          {/* Description */}
          <Controller
            name="description"
            control={control}
            rules={{ required: "Se necesita una descripción" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Descripción *"
                fullWidth
                multiline
                rows={3}
                error={!!errors.description}
                helperText={errors.description?.message}
                slotProps={{
                  formHelperText: { sx: { mx: 0 } },
                }}
              />
            )}
          />

          {/* Dates */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="startDate"
              control={control}
              rules={{ required: "Se necesita una fecha" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Fecha de inicio *"
                  type="date"
                  fullWidth
                  error={!!errors.startDate}
                  helperText={errors.startDate?.message}
                  slotProps={{
                    inputLabel: { shrink: true },
                    formHelperText: { sx: { mx: 0 } },
                  }}
                />
              )}
            />
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Fecha de finalización"
                  type="date"
                  fullWidth
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              )}
            />
          </Stack>

          {/* Instructor */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl fullWidth error={!!errors.instructor}>
              <InputLabel>Instructor *</InputLabel>
              <Controller
                name="instructor"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Instructor *">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Ivan le Roux">Ivan le Roux</MenuItem>
                    <MenuItem value="John Doe">John Doe</MenuItem>
                    <MenuItem value="Jane Doe">Jane Doe</MenuItem>
                    <MenuItem value="Robert Johnson">Robert Johnson</MenuItem>
                  </Select>
                )}
              />
            </FormControl>

            <FormControl fullWidth error={!!errors.studentId}>
              <InputLabel>¿Quién toma el curso? *</InputLabel>
              <Controller
                name="studentId"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="¿Quién toma el curso? *">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {employees.map((e) => (
                      <MenuItem key={e.id} value={e.id}>
                        {`${e.name} ${e.firstName} ${e.lastName}`}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Stack>

          {/* Approved & Place */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="center"
          >
            <Controller
              name="approved"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={!!field.value} />}
                  label="Aprobado"
                  sx={{
                    m: 0,
                    border: "1px solid #ccc",
                    pl: 1,
                    pr: 1,
                    height: 55,
                    borderRadius: 1,
                  }}
                />
              )}
            />
            <FormControl fullWidth error={!!errors.place}>
              <InputLabel>Lugar *</InputLabel>
              <Controller
                name="place"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Lugar *">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="En línea">En línea</MenuItem>
                    <MenuItem value="Sucursal uno">Sucursal uno</MenuItem>
                    <MenuItem value="Sucursal dos">Sucursal dos</MenuItem>
                    <MenuItem value="Planta principal">
                      Planta principal
                    </MenuItem>
                    <MenuItem value="Sucursal Mexico">Sucursal México</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Stack>

          {/* Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            {id ? "Actualizar" : "Registrar"}
          </Button>
        </Stack>
      </form>

      {/* Confirmation dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>
          {id ? "Confirmar actualización" : "Confirmar registro"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {id
              ? "Los datos se actualizarán tal como los ingresaste"
              : "Los datos se guardarán tal como los ingresaste"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancelar</Button>
          <Button onClick={handleConfirm} variant="contained" color="primary">
            {id ? "Actualizar" : "Aceptar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
