import { useForm, SubmitHandler } from "react-hook-form";
import ResponsiveDialog from "../DialogAlert";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
function UsersForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<UserFormProps>();
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
    const onSubmit: SubmitHandler<UserFormProps> = async (data) => {
        if (data.employeeId) {
            data.employeeId = Number(data.employeeId);
        }
        if (data.confirmPassword !== data.password) {
            showError("Las contraseñas no coinciden");
            return;
        }
        try {
            const response = await fetch("http://localhost:3000/api/addUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const successData = await response.json();
                showAlert(successData.message);
                reset();
            } else {
                const errorData = await response.json();
                showError(errorData.message);
            }

        } catch (error) {
            console.error(error);
            showError("Error en el servidor: " + error);
        }
    }
    useEffect(() => {
        try {
            const response = fetch("http://localhost:3000/api/getEmployees");
            response.then((res) => res.json()).then((data) => {
                setEmployees(data.employees);
            })
        } catch (error) {
            console.error(error);
        }
    }, [])
    return (
        <section className="flex flex-col gap-4 p-4">
            <h1 className="text-3xl font-bold">
                Formulario de usuarios
            </h1>
            <form className="flex flex-col gap-4">
                <label htmlFor="email">Email</label>
                <input type="email" {...register("email", { required: true })} placeholder="ej. ivan@gmail.com" className="border-2 border-blue-200 p-2 rounded-md" />
                {errors.email && <p role="alert" className="text-red-500 -mt-2 font-semibold text-sm">Email es requerido</p>}
                <label htmlFor="role">Rol</label>
                <select {...register("role", { required: true })} className="border-2 border-blue-200 p-2 rounded-md">
                    <option value="">-- Selecciona un rol --</option>
                    <option value="admininstrador">Administrador</option>
                    <option value="empleado">Empleado</option>
                </select>
                {errors.role && <p role="alert" className="text-red-500 -mt-2 font-semibold text-sm">Rol es requerido</p>}
                <label htmlFor="employee">Empleado</label>
                <select {...register("employeeId", { required: true })} className="border-2 border-blue-200 p-2 rounded-md capitalize">
                    <option value="">-- Selecciona un empleado --</option>
                    {employees.map((employee) => (
                        <option key={employee.id} value={employee.id} className="capitalize">
                            {`${employee.employeeNumber} - ${employee.name} ${employee.firstName} ${employee.lastName}`}
                        </option>
                    ))}
                </select>
                {errors.employeeId && <p role="alert" className="text-red-500 -mt-2 font-semibold text-sm">Empleado es requerido</p>}
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" {...register("password", { required: true })} placeholder="ej. 123456789" className="border-2 border-blue-200 p-2 rounded-md" />
                {errors.password && <p role="alert" className="text-red-500 -mt-2 font-semibold text-sm">Contraseña es requerido</p>}
                <label htmlFor="confirmPassword">Confirmar contraseña</label>
                <input type="password" {...register("confirmPassword", { required: true })} placeholder="ej. 123456789" className="border-2 border-blue-200 p-2 rounded-md" />
                {errors.confirmPassword && <p role="alert" className="text-red-500 -mt-2 font-semibold text-sm">Contraseña es requerido</p>}
                <ResponsiveDialog
                    iconButton="Registrar"
                    handleConfirm={handleSubmit(onSubmit)}
                    buttonText="Aceptar"
                    className="text-white font-semibold bg-blue-900 p-2 rounded-md hover:bg-blue-800 transition-all duration-300 mt-6"
                    dialogText="Los datos se guardarán en la base de datos tal y como lo ingresaste"
                    dialogQuestion="¿Estás seguro de que deseas agregar este usuario?"
                />
            </form>
        </section>
    )
}

export default UsersForm