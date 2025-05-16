import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  Box,
  Stack,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ResponsiveDialog from "../DialogAlert";
import { toast } from "react-toastify";

interface UserFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  employeeId: string;
  changePassword: boolean;
}

interface Employee {
  id: number;
  employeeNumber: string;
  name: string;
  firstName: string;
  lastName: string;
}

interface ApiUser {
  user?: {
    email: string;
    role: number;
    employeeId: number;
  };
  message: string;
}

export default function UsersForm({
  handleClose,
}: {
  handleClose: () => void;
}) {
  const { id } = useParams<{ id: string }>();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserFormInputs>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      employeeId: "",
      changePassword: false,
    },
  });

  const [employees, setEmployees] = useState<Employee[]>([]);
  const changePassword = watch("changePassword");

  const showAlert = (msg: string) =>
    toast.success(msg, { position: "top-right", autoClose: 3000 });
  const showError = (msg: string) =>
    toast.error(msg, { position: "top-right", autoClose: 3000 });

  //Load employees
  useEffect(() => {
    fetch(`/api/employees/api/getEmployees`, {
      method: "GET",
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data: { employees: Employee[] }) => setEmployees(data.employees))
      .catch(() => console.error("Error al cargar empleados"));
  }, []);

  // Load user data if editing
  useEffect(() => {
    if (!id) return;
    fetch(`/api/users/api/getUser/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data: ApiUser) => {
        if (data.user) {
          setValue("email", data.user.email);
          setValue("role", String(data.user.role));
          setValue("employeeId", String(data.user.employeeId));
        }
      })
      .catch(() => showError("Error al cargar usuario"));
  }, [id, setValue]);

  // Submit
  const onSubmit: SubmitHandler<UserFormInputs> = async (data) => {
    if (
      (!id || data.changePassword) &&
      data.password !== data.confirmPassword
    ) {
      showError("Las contraseñas no coinciden");
      return;
    }

    // Build payload
    const payload: {
      email: string;
      role: string;
      employeeId: number;
      password?: string;
    } = {
      email: data.email,
      role: data.role,
      employeeId: Number(data.employeeId),
    };
    if (!id || data.changePassword) {
      payload.password = data.password;
    }

    try {
      const url = id
        ? `/api/users/api/updateUser/${id}`
        : `/api/users/api/addUser`;
      const method = id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await res.json()) as ApiUser;
      if (!res.ok) throw new Error(result.message);
      showAlert(result.message);
      reset();
      handleClose();
    } catch (e) {
      showError(e instanceof Error ? e.message : "Error en el servidor");
    }
  };

  return (
    <Box
      component="section"
      sx={{
        p: { xs: 2, sm: 4 },
        bgcolor: "background.paper",
        borderRadius: 2,
        maxWidth: { xs: "100%", sm: 500 },
        mx: "auto",
      }}
    >
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {/* Email */}
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email es requerido",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Formato de email inválido",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email *"
                type="email"
                fullWidth
                size="small"
                slotProps={{
                  inputLabel: { shrink: true },
                }}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          {/* Role */}
          <Controller
            name="role"
            control={control}
            rules={{ required: "Rol es requerido" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Rol *"
                fullWidth
                size="small"
                slotProps={{
                  inputLabel: { shrink: true },
                }}
                error={!!errors.role}
                helperText={errors.role?.message}
              >
                <MenuItem value="">
                  <em>— Selecciona —</em>
                </MenuItem>
                <MenuItem value={import.meta.env.VITE_ROLE_ONE}>
                  {import.meta.env.VITE_ROLE_ONE}
                </MenuItem>
                <MenuItem value={import.meta.env.VITE_ROLE_TWO}>
                  {import.meta.env.VITE_ROLE_TWO}
                </MenuItem>
              </TextField>
            )}
          />

          {/* Employee */}
          <Controller
            name="employeeId"
            control={control}
            rules={{ required: "Empleado es requerido" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Empleado *"
                fullWidth
                size="small"
                slotProps={{
                  inputLabel: { shrink: true },
                }}
                error={!!errors.employeeId}
                helperText={errors.employeeId?.message}
              >
                <MenuItem value="">
                  <em>— Selecciona —</em>
                </MenuItem>
                {employees.map((e) => (
                  <MenuItem key={e.id} value={String(e.id)}>
                    {`${e.employeeNumber} – ${e.name} ${e.firstName} ${e.lastName}`}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {/* Change password toggle */}
          {id && (
            <Controller
              name="changePassword"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="¿Modificar contraseña?"
                  sx={{ m: 0 }}
                />
              )}
            />
          )}

          {/* Password */}
          {(!id || changePassword) && (
            <Stack spacing={3}>
              <Controller
                name="password"
                control={control}
                rules={{ required: "Contraseña es requerida" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Contraseña *"
                    type="password"
                    fullWidth
                    size="small"
                    slotProps={{
                      inputLabel: { shrink: true },
                    }}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                rules={{ required: "Confirmar es requerido" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Confirmar contraseña *"
                    type="password"
                    fullWidth
                    size="small"
                    slotProps={{
                      inputLabel: { shrink: true },
                    }}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                  />
                )}
              />
            </Stack>
          )}

          {/* Confirmation */}
          <ResponsiveDialog
            iconButton={id ? "Actualizar" : "Registrar"}
            buttonText={id ? "Actualizar" : "Aceptar"}
            dialogQuestion={
              id
                ? "¿Estás seguro de actualizar este usuario?"
                : "¿Estás seguro de registrar este usuario?"
            }
            dialogText={
              id
                ? "Los datos se actualizarán tal como los ingresaste."
                : "Los datos se guardarán tal como los ingresaste."
            }
            handleConfirm={handleSubmit(onSubmit)}
          />
        </Stack>
      </Box>
    </Box>
  );
}
