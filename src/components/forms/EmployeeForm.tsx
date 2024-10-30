import { useForm, SubmitHandler } from "react-hook-form";
interface EmployeeFormProps {
  employeeNumber: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  area: string;
}

function EmployeeForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<EmployeeFormProps>();
  const onSubmit: SubmitHandler<EmployeeFormProps> = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/api/addEmployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log('Datos enviados correctamente', response);
        reset();
      } else {
        console.log('Error al enviar los datos', response);
      }
    } catch (error) {
      console.error('Error al enviar los datos', error);
    }
  };

  return (
    <section className="flex flex-col gap-4 p-4 justify-center items-center">
      <form className="flex flex-col gap-4 p-4 justify-center max-w-screen-xl"
        onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-4xl font-bold">Formulario de empleados</h1>
        <label htmlFor="employeeNumber" className="text-blue-900 font-semibold">
          N° de empleado
        </label>
        <input className="w-full border-2 border-blue-200 p-2 rounded-md"
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

        <label htmlFor="coach" className="text-blue-900 font-semibold">
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

        <button className="bg-blue-900 mt-8 text-white rounded-md p-2 text-lg hover:bg-opacity-85 transition-all duration-300">
          Guardar
        </button>
      </form>
    </section>
  );
}

export default EmployeeForm;
