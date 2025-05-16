import { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Box, Stack, TextField, MenuItem } from "@mui/material";
import ResponsiveDialog from "../DialogAlert";
import { toast } from "react-toastify";

interface EmployeeFormInputs {
  employeeNumber: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  area: string;
}

interface ApiEmployee {
  employee: {
    employeeNumber: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    area: string;
  };
  message: string;
}

export default function EmployeeForm({
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
    formState: { errors },
  } = useForm<EmployeeFormInputs>({
    defaultValues: {
      employeeNumber: "",
      name: "",
      firstName: "",
      lastName: "",
      email: "",
      area: "",
    },
  });

  const showAlert = (msg: string) =>
    toast.success(msg, { position: "top-right", autoClose: 3000 });
  const showError = (msg: string) =>
    toast.error(msg, { position: "top-right", autoClose: 3000 });

  //Load data
  useEffect(() => {
    if (!id) return;
    fetch(`/api/employees/api/getEmployee/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data: ApiEmployee) => {
        setValue("employeeNumber", data.employee.employeeNumber);
        setValue("name", data.employee.name);
        setValue("firstName", data.employee.firstName);
        setValue("lastName", data.employee.lastName);
        setValue("email", data.employee.email);
        setValue("area", data.employee.area);
      })
      .catch(() => showError("Error al cargar datos del empleado"));
  }, [id, setValue]);

  // Submit form
  const onSubmit: SubmitHandler<EmployeeFormInputs> = async (data) => {
    try {
      const url = id
        ? `/api/employees/api/updateEmployee/${id}`
        : `/api/employees/api/addEmployee`;
      const method = id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result: ApiEmployee = await res.json();
      if (!res.ok) throw new Error(result.message);
      showAlert(result.message);
      reset();
      handleClose();
    } catch (e: unknown) {
      if (e instanceof Error) {
        showError(e.message);
      } else {
        showError("Error desconocido");
      }
    }
  };

  const areas = ["Marketing", "Finanzas", "Desarrollo", "Diseño"];

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        p: { xs: 2, sm: 4 },
        bgcolor: "background.paper",
        borderRadius: 2,
        maxWidth: { xs: "100%", sm: 500 },
        mx: "auto",
      }}
    >
      <Stack spacing={3}>
        {/** Employee number **/}
        <Controller
          name="employeeNumber"
          control={control}
          rules={{
            required: "N° de empleado es requerido",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="N° de empleado *"
              fullWidth
              size="small"
              slotProps={{ inputLabel: { shrink: true } }}
              error={!!errors.employeeNumber}
              helperText={errors.employeeNumber?.message}
            />
          )}
        />

        {/** Name **/}
        <Controller
          name="name"
          control={control}
          rules={{ required: "Nombre es requerido" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nombre *"
              fullWidth
              size="small"
              slotProps={{ inputLabel: { shrink: true } }}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        {/** First name **/}
        <Controller
          name="firstName"
          control={control}
          rules={{ required: "Primer apellido es requerido" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Primer apellido *"
              fullWidth
              size="small"
              slotProps={{ inputLabel: { shrink: true } }}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          )}
        />

        {/** Last name **/}
        <Controller
          name="lastName"
          control={control}
          rules={{ required: "Segundo apellido es requerido" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Segundo apellido *"
              fullWidth
              size="small"
              slotProps={{ inputLabel: { shrink: true } }}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          )}
        />

        {/** Email **/}
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
              slotProps={{ inputLabel: { shrink: true } }}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        {/** Area **/}
        <Controller
          name="area"
          control={control}
          rules={{ required: "Área es requerida" }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Área *"
              fullWidth
              size="small"
              slotProps={{ inputLabel: { shrink: true } }}
              error={!!errors.area}
              helperText={errors.area?.message}
            >
              <MenuItem value="">
                <em>— Selecciona —</em>
              </MenuItem>
              {areas.map((a) => (
                <MenuItem key={a} value={a}>
                  {a}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        {/** Button Register */}
        <ResponsiveDialog
          iconButton={id ? "Actualizar" : "Registrar"}
          buttonText={id ? "Actualizar" : "Aceptar"}
          dialogQuestion={
            id
              ? "¿Estás seguro de actualizar este empleado?"
              : "¿Estás seguro de registrar este empleado?"
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
  );
}
