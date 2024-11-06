import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import DialogAlert from "../DialogAlert";
import { toast } from "react-toastify";
interface CoursesFormProps {
  courseName?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  instructor?: string;
  approved?: boolean;
  place?: string;
  studentId?: string;
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
function CoursesForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CoursesFormProps>();
  const [employees, setEmployees] = useState<Employee[]>([]);
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
  useEffect(() => {
    try {
      const getEmployees = async () => {
        const response = await fetch("http://localhost:3000/api/getEmployees");
        const data = await response.json();
        setEmployees(data.employees);
      };
      getEmployees();
    } catch (error) {
      console.error("Error al obtener los empleados", error);
    }
  }, []);
  const onSubmit: SubmitHandler<CoursesFormProps> = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/addCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        showAlert("Datos guardados correctamente");
        reset();
        return;
      }
      showError("Error al guardar los datos");
    } catch (error) {
      console.log("Error al guardar los datos", error);
    }
  };
  return (
    <section className="flex flex-col gap-4 p-4 justify-center items-center">
      <form className="flex flex-col gap-4 p-4 justify-center max-w-screen-xl">
        <h1 className="text-4xl font-bold">Formulario de cursos</h1>
        <label htmlFor="name" className="text-blue-900 font-semibold">
          Nombre del curso
        </label>
        <input
          type="text"
          placeholder="Ej. Programación"
          className="w-full border-2 border-blue-200 p-2 rounded-md"
          {...register("courseName", { required: true })}
          aria-invalid={errors.courseName ? "true" : "false"}
        />
        {errors.courseName?.type === "required" && (
          <p role="alert" className="text-red-500 -mt-2 font-semibold text-sm">
            Nombre del curso es requerido
          </p>
        )}
        <label htmlFor="description" className="text-blue-900 font-semibold">
          Descripción del curso
        </label>
        <textarea
          placeholder="Ej. Curso de programación para principiantes"
          className="w-full border-2 border-blue-200 p-2 rounded-md"
          {...register("description", { required: true })}
          aria-invalid={errors.description ? "true" : "false"}
        >
        </textarea>
        {errors.description?.type === "required" && (
          <p role="alert" className="text-red-500 -mt-2 font-semibold text-sm">
            Descripción del curso es requerida
          </p>
        )}
        <label htmlFor="startDate" className="text-blue-900 font-semibold">
          Fecha de inicio
        </label>
        <input
          type="date"
          placeholder="Fecha de inicio"
          className="w-full border-2 border-blue-200 p-2 rounded-md"
          {...register("startDate", { required: true })}
          aria-invalid={errors.startDate ? "true" : "false"}
        />
        {errors.startDate?.type === "required" && (
          <p role="alert" className="text-red-500 -mt-2 font-semibold text-sm">
            Fecha de inicio es requerida
          </p>
        )}
        <label htmlFor="endDate" className="text-blue-900 font-semibold">
          Fecha de finalización
        </label>
        <input
          type="date"
          placeholder="Fecha de finalización"
          className="w-full border-2 border-blue-200 p-2 rounded-md"
          {...register("endDate")}
        />
        <label htmlFor="instructor" className="text-blue-900 font-semibold">
          Instructor del curso
        </label>
        <select
          className="w-full border-2 border-blue-200 p-2 rounded-md"
          {...register("instructor", { required: true })}
          aria-invalid={errors.instructor ? "true" : "false"}
        >
          <option value="">-- Selecciona una opción --</option>
          <option value="1">Ivan le Roux</option>
          <option value="2">John Doe</option>
        </select>
        {errors.instructor?.type === "required" && (
          <p role="alert" className="text-red-500 -mt-2 font-semibold text-sm">
            Instructor del curso es requerido
          </p>
        )}
        <label htmlFor="studentId" className="text-blue-900 font-semibold">
          ¿Quién toma el curso?
        </label>
        <select
          className="w-full border-2 border-blue-200 p-2 rounded-md"
          {...register("studentId", { required: true })}
          aria-invalid={errors.studentId ? "true" : "false"}
        >
          <option value="">-- Selecciona una opción --</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {`${employee.name} ${employee.firstName} ${employee.lastName}`}
            </option>
          ))}
        </select>
        {errors.studentId?.type === "required" && (
          <p role="alert" className="text-red-500 -mt-2 font-semibold text-sm">
            ¿Quién toma el curso es requerido
          </p>
        )}
        <div className="flex justify-between">
          <label htmlFor="approved" className="text-blue-900 font-semibold">
            ¿Aprobado?
          </label>
          <input type="checkbox" className="w-5 border-2 border-blue-200 p-2 rounded-md"
            {...register("approved")}
          />
        </div>
        <label htmlFor="place" className="text-blue-900 font-semibold">
          Lugar donde se llevará a cabo el curso
        </label>
        <select
          className="w-full border-2 border-blue-200 p-2 rounded-md"
          {...register("place", { required: true })}
          aria-invalid={errors.place ? "true" : "false"}
        >
          <option value="">-- Selecciona una opción --</option>
          <option value="1">En línea</option>
          <option value="2">Sucursal uno</option>
          <option value="3">Sucursal dos</option>
          <option value="4">Planta principal</option>
          <option value="5">Sucursal Mexico</option>
        </select>
        {errors.place?.type === "required" && (
          <p role="alert" className="text-red-500 -mt-2 font-semibold text-sm">
            Lugar donde se llevará a cabo el curso es requerido
          </p>
        )}
        <DialogAlert
          iconButton={'Registrar'}
          className="text-white font-semibold bg-blue-900 p-2 rounded-md hover:bg-blue-800 transition-all duration-300"
          buttonText="Aceptar"
          dialogText="Los datos se guardarán en la base de datos tal y como lo ingresaste"
          dialogQuestion="¿Estás seguro de que deseas registrar estos datos?"
          handleConfirm={handleSubmit(onSubmit)}
        />
      </form>
    </section>
  );
}

export default CoursesForm;
