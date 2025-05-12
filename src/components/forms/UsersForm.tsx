import { useForm, SubmitHandler } from "react-hook-form";
import ResponsiveDialog from "../DialogAlert";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";

interface UserFormProps {
  email: string;
  password: string;
  confirmPassword: string;
  role: number;
  employeeId: number;
}

interface Employee {
  id: number;
  employeeNumber: string;
  name: string;
  firstName: string;
  lastName: string;
}

function UsersForm({ handleClose }: { handleClose: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<UserFormProps>();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [checkUpdate, setCheckUpdate] = useState<boolean>(false);

  const { id } = useParams();
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
  const onSubmit: SubmitHandler<UserFormProps> = async (data) => {
    if (data.employeeId) {
      data.employeeId = Number(data.employeeId);
    }
    if (data.confirmPassword !== data.password) {
      showError("Las contraseñas no coinciden");
      return;
    }
    try {
      const response = id
        ? await fetch(`${import.meta.env.VITE_URL}users/api/updateUser/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
        : await fetch(`${import.meta.env.VITE_URL}users/api/addUser`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
      if (response.ok && id) {
        const successData = await response.json();
        showAlert(successData.message);
        handleCleanForm();
      } else if (response.ok && !id) {
        const successData = await response.json();
        showAlert(successData.message);
        handleCleanForm();
      } else {
        const errorData = await response.json();
        showError(errorData.message);
      }
    } catch (error) {
      console.error(error);
      showError("Error en el servidor: " + error);
    }
  };
  useEffect(() => {
    try {
      const response = fetch(
        `${import.meta.env.VITE_URL}employees/api/getEmployees`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      response
        .then((res) => res.json())
        .then((data) => {
          setEmployees(data.employees);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_URL}users/api/getUser/${id}`,
            {
              method: "GET",
              credentials: "include",
            }
          );
          if (response.ok) {
            const data = await response.json();
            setValue("email", data.user.email);
            setValue("role", data.user.role);
            setValue("employeeId", data.user.employeeId);
          } else {
            showError("Error al cargar los datos del usuario");
          }
        } catch (error) {
          console.error("Error al cargar los datos del usuario", error);
        }
      }
    };
    fetchData();
  }, [id, setValue]);

  const handleCleanForm = () => {
    reset();
    setCheckUpdate(false);
    handleClose();
  };

  // Watch the values of the fields to display the FormHelperText
  const roleValue = watch("role");
  const employeeIdValue = watch("employeeId");

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: { xs: 2, sm: 4 },
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
      >
        <FormControl fullWidth error={!!errors.email}>
          <Typography
            variant="body1"
            component="label"
            htmlFor="email"
            sx={{ mb: 1, fontWeight: 500 }}
          >
            Email <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            id="email"
            type="email"
            placeholder="ej. ivan@gmail.com"
            {...register("email", { required: true })}
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiInputBase-input": { py: 1.5 },
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
                "&:hover fieldset": { borderColor: "primary.main" },
              },
            }}
          />
          <FormHelperText role="alert">
            {errors.email ? "Email es requerido" : ""}
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth error={!!errors.role}>
          <Typography
            variant="body1"
            component="label"
            htmlFor="role"
            sx={{ mb: 1, fontWeight: 500 }}
          >
            Rol <span style={{ color: "red" }}>*</span>
          </Typography>
          <Select
            id="role"
            value={roleValue || ""}
            {...register("role", { required: true })}
            sx={{
              borderRadius: 1,
              "& .MuiSelect-select": { py: 1.5 },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
              },
            }}
          >
            <MenuItem value="">-- Selecciona un rol --</MenuItem>
            <MenuItem value={import.meta.env.VITE_ROLE_ONE}>
              {import.meta.env.VITE_ROLE_ONE}
            </MenuItem>
            <MenuItem value={import.meta.env.VITE_ROLE_TWO}>
              {import.meta.env.VITE_ROLE_TWO}
            </MenuItem>
          </Select>
          <FormHelperText role="alert">
            {errors.role ? "Rol es requerido" : ""}
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth error={!!errors.employeeId}>
          <Typography
            variant="body1"
            component="label"
            htmlFor="employee"
            sx={{ mb: 1, fontWeight: 500 }}
          >
            Empleado <span style={{ color: "red" }}>*</span>
          </Typography>
          <Select
            id="employee"
            value={employeeIdValue || ""}
            {...register("employeeId", { required: true })}
            sx={{
              borderRadius: 1,
              textTransform: "capitalize",
              "& .MuiSelect-select": { py: 1.5 },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
              },
            }}
          >
            <MenuItem value="">-- Selecciona un empleado --</MenuItem>
            {employees.map((employee) => (
              <MenuItem
                key={employee.id}
                value={employee.id}
                sx={{ textTransform: "capitalize" }}
              >
                {`${employee.employeeNumber} - ${employee.name} ${employee.firstName} ${employee.lastName}`}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText role="alert">
            {errors.employeeId ? "Empleado es requerido" : ""}
          </FormHelperText>
        </FormControl>

        {id && (
          <FormControlLabel
            control={
              <Checkbox
                checked={checkUpdate}
                onChange={(e) => setCheckUpdate(e.target.checked)}
                color="primary"
                sx={{ "&:hover": { bgcolor: "primary.lighter" } }}
              />
            }
            label="¿Modificar contraseña?"
            sx={{
              py: 1,
              "& .MuiFormControlLabel-label": { fontSize: "0.95rem" },
            }}
          />
        )}

        {(!id || checkUpdate) && (
          <>
            <FormControl fullWidth error={!!errors.password}>
              <Typography
                variant="body1"
                component="label"
                htmlFor="password"
                sx={{ mb: 1, fontWeight: 500 }}
              >
                Contraseña <span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                id="password"
                type="password"
                placeholder="ej. 123456789"
                {...register("password", { required: true })}
                variant="outlined"
                fullWidth
                sx={{
                  "& .MuiInputBase-input": { py: 1.5 },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1,
                    "&:hover fieldset": { borderColor: "primary.main" },
                  },
                }}
              />
              <FormHelperText role="alert">
                {errors.password ? "Contraseña es requerida" : ""}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth error={!!errors.confirmPassword}>
              <Typography
                variant="body1"
                component="label"
                htmlFor="confirmPassword"
                sx={{ mb: 1, fontWeight: 500 }}
              >
                Confirmar contraseña <span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                id="confirmPassword"
                type="password"
                placeholder="ej. 123456789"
                {...register("confirmPassword", { required: true })}
                variant="outlined"
                fullWidth
                sx={{
                  "& .MuiInputBase-input": { py: 1.5 },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1,
                    "&:hover fieldset": { borderColor: "primary.main" },
                  },
                }}
              />
              <FormHelperText role="alert">
                {errors.confirmPassword
                  ? "Confirmar contraseña es requerida"
                  : ""}
              </FormHelperText>
            </FormControl>
          </>
        )}

        <ResponsiveDialog
          iconButton={id ? "Actualizar" : "Registrar"}
          handleConfirm={handleSubmit(onSubmit)}
          buttonText={id ? "Actualizar" : "Aceptar"}
          dialogText={
            id
              ? "Estos datos se actualizarán en la base de datos tal y como lo ingresaste"
              : "Los datos se registrarán tal y como los ingresaste"
          }
          dialogQuestion={id ? "¿Deseas actualizar ?" : "¿Deseas registrar ?"}
          className="text-white font-semibold bg-blue-900 p-2 rounded-md hover:bg-blue-800 transition-all duration-300 mt-6"
        />
      </Box>
    </Box>
  );
}

export default UsersForm;
