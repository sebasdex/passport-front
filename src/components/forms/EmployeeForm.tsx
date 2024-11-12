import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import ResponsiveDialog from "../DialogAlert";

interface EmployeeFormProps {
  employeeNumber?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  area?: string;
}

function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<EmployeeFormProps>();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/employees/getEmployee/${id}`
            , {
              method: "GET",
              credentials: 'include',
            }
          );
          if (response.ok) {
            const data = await response.json();
            setValue("employeeNumber", data.employee.employeeNumber);
            setValue("name", data.employee.name);
            setValue("firstName", data.employee.firstName);
            setValue("lastName", data.employee.lastName);
            setValue("email", data.employee.email);
            setValue("area", data.employee.area);
          } else {
            showError("Error al cargar los datos del empleado");
          }
        } catch (error) {
          showError("Error de servidor: " + error);
        }
      }
    };
    fetchData();
  }, [id, setValue]);

  const onSubmit: SubmitHandler<EmployeeFormProps> = async (data) => {
    try {
      const response = id
        ? await fetch(`http://localhost:3000/employees/api/updateEmployee/${id}`, {
          method: "PUT",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        : await fetch(`http://localhost:3000/employees/api/addEmployee`, {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      if (response.ok) {
        showAlert(
          id
            ? "Datos actualizados correctamente"
            : "Datos registrados correctamente"
        );
        handleNewEmployee();
      } else {
        showError("Error al actualizar los datos del empleado");
      }
    } catch (error) {
      console.error(error);
      showError("Error de servidor: " + error);
    }
  };

  const handleNewEmployee = () => {
    navigate("/employees");
    reset();
  };

  return (
    <section className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold">Formulario de empleados</h1>
      <button
        className="text-blue-900 font-semibold bg-blue-200 p-2 rounded-md hover:bg-blue-300 transition-all duration-300"
        onClick={() => handleNewEmployee()}
      >
        Nuevo registro
      </button>
      <form className="flex flex-col gap-4">
        <label htmlFor="employeeNumber" className="text-blue-900 font-semibold">
          N° de empleado
        </label>
        <input
          className="w-full border-2 border-blue-200 p-2 rounded-md"
          type="text"
          placeholder="Ej. EMP001"
          {...register("employeeNumber", { required: true })}
          aria-invalid={errors.employeeNumber ? "true" : "false"}
        />
        {errors.employeeNumber?.type === "required" && (
          <p role="alert" className="text-red-500 -mt-2 font-semibold text-sm">
            N° de empleado es requerido
          </p>
        )}

        <label htmlFor="name" className="text-blue-900 font-semibold">
          Nombre del empleado
        </label>
        <input
          type="text"
          placeholder="Ej. Ivan"
          className="w-full border-2 border-blue-200 p-2 rounded-md"
          {...register("name", { required: true })}
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors.name?.type === "required" && (
          <p role="alert" className="text-red-500 -mt-2 font-semibold text-sm">
            Nombre del empleado es requerido
          </p>
        )}
        <label htmlFor="firstName" className="text-blue-900 font-semibold">
          Primer Apellido
        </label>
        <input
          type="text"
          placeholder="Ej. le Roux"
          className="w-full border-2 border-blue-200 p-2 rounded-md"
          {...register("firstName", { required: true })}
          aria-invalid={errors.firstName ? "true" : "false"}
        />
        {errors.firstName?.type === "required" && (
          <p role="alert" className="text-red-500 -mt-2 font-semibold text-sm">
            Primer Apellido es requerido
          </p>
        )}
        <label htmlFor="lastName" className="text-blue-900 font-semibold">
          Segundo Apellido
        </label>
        <input
          type="text"
          placeholder="Ej. Perez"
          className="w-full border-2 border-blue-200 p-2 rounded-md"
          {...register("lastName", { required: true })}
          aria-invalid={errors.lastName ? "true" : "false"}
        />
        {errors.lastName?.type === "required" && (
          <p role="alert" className="text-red-500 -mt-2 font-semibold text-sm">
            Segundo Apellido es requerido
          </p>
        )}

        <label htmlFor="area" className="text-blue-900 font-semibold">
          Área en donde desempeña
        </label>
        <select
          {...register("area", { required: true })}
          className="w-full border-2 border-blue-200 p-2 rounded-md"
          aria-invalid={errors.area ? "true" : "false"}
        >
          <option value="">-- Selecciona una área --</option>
          <option value="Marketing">Marketing</option>
          <option value="Finanzas">Finanzas</option>
          <option value="Desarrollo">Desarrollo</option>
          <option value="Diseño">Diseño</option>
        </select>
        {errors.area?.type === "required" && (
          <p role="alert" className="text-red-500 -mt-2 font-semibold text-sm">
            Área en donde desempeña es requerida
          </p>
        )}

        <label htmlFor="email" className="text-blue-900 font-semibold">
          Email
        </label>
        <input
          type="email"
          placeholder="Ej. ivan@gmail.com"
          className="w-full border-2 border-blue-200 p-2 rounded-md"
          {...register("email", { required: true })}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email?.type === "required" && (
          <p role="alert" className="text-red-500 -mt-2 font-semibold text-sm">
            Email es requerido
          </p>
        )}

        <ResponsiveDialog
          iconButton={id ? "Actualizar" : "Registrar"}
          handleConfirm={handleSubmit(onSubmit)}
          buttonText={id ? "Actualizar" : "Aceptar"}
          className="text-white font-semibold bg-blue-900 p-2 rounded-md hover:bg-blue-800 transition-all duration-300 mt-6"
          dialogText={
            id
              ? "Los datos actualizados se guardarán en la base de datos tal y como lo ingresaste"
              : "Los datos se guardarán en la base de datos tal y como lo ingresaste"
          }
          dialogQuestion={
            id
              ? "¿Estás seguro de que deseas actualizar este registro?"
              : "¿Estás seguro de que deseas registrar este formulario?"
          }
        />
      </form>
    </section>
  );
}

export default EmployeeForm;
