import { useForm, SubmitHandler } from "react-hook-form";
import ResponsiveDialog from "../DialogAlert";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

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
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<UserFormProps>();
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [checkUpdate, setCheckUpdate] = useState<boolean>(false);
    const navigate = useNavigate();
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
            const response = id ? await fetch(`${import.meta.env.VITE_URL}users/api/updateUser/${id}`, {
                method: "PUT",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }) : await fetch(`${import.meta.env.VITE_URL}users/api/addUser`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.ok && id) {
                const successData = await response.json();
                showAlert(successData.message);
                handleNewUser();
            }
            else if (response.ok && !id) {
                const successData = await response.json();
                showAlert(successData.message);
                handleNewUser();
            }
            else {
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
            const response = fetch(`${import.meta.env.VITE_URL}employees/api/getEmployees`, {
                method: "GET",
                credentials: 'include',
            });
            response.then((res) => res.json()).then((data) => {
                setEmployees(data.employees);
            })
        } catch (error) {
            console.error(error);
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_URL}users/api/getUser/${id}`, {
                        method: "GET",
                        credentials: 'include',
                    });
                    if (response.ok) {
                        const data = await response.json()
                        setValue("email", data.user.email);
                        setValue("role", data.user.role);
                        setValue("employeeId", data.user.employeeId);
                    } else {
                        showError("Error al cargar los datos del usuario")
                    }
                } catch (error) {
                    console.error("Error al cargar los datos del usuario", error);
                }
            }
        }
        fetchData();
    }, [id, setValue]);

    const handleNewUser = () => {
        navigate("/users");
        reset();
        setCheckUpdate(false);
    };
    return (
        <section className="flex flex-col gap-4 p-4">
            <h1 className="text-4xl font-bold">Formulario de usuarios</h1>
            <button
                className="text-blue-900 font-semibold bg-blue-200 p-2 rounded-md hover:bg-blue-300 transition-all duration-300"
                onClick={() => handleNewUser()}
            >
                Nuevo registro
            </button>
            <form className="flex flex-col gap-4">
                <label htmlFor="email">Email <span className="text-red-500">*</span></label>
                <input type="email" {...register("email", { required: true })} placeholder="ej. ivan@gmail.com" className="border-2 border-blue-200 p-2 rounded-md" />
                {errors.email && <p role="alert" className="text-red-500 -mt-2 font-semibold text-sm">Email es requerido</p>}
                <label htmlFor="role">Rol <span className="text-red-500">*</span></label>
                <select {...register("role", { required: true })} className="border-2 border-blue-200 p-2 rounded-md">
                    <option value="">-- Selecciona un rol --</option>
                    <option value="administrador">Administrador</option>
                    <option value="empleado">Empleado</option>
                </select>
                {errors.role && <p role="alert" className="text-red-500 -mt-2 font-semibold text-sm">Rol es requerido</p>}
                <label htmlFor="employee">Empleado <span className="text-red-500">*</span></label>
                <select {...register("employeeId", { required: true })} className="border-2 border-blue-200 p-2 rounded-md capitalize">
                    <option value="">-- Selecciona un empleado --</option>
                    {employees.map((employee) => (
                        <option key={employee.id} value={employee.id} className="capitalize">
                            {`${employee.employeeNumber} - ${employee.name} ${employee.firstName} ${employee.lastName}`}
                        </option>
                    ))}
                </select>
                {errors.employeeId && <p role="alert" className="text-red-500 -mt-2 font-semibold text-sm">Empleado es requerido</p>}
                {id && <div className="flex justify-between p-2">
                    <label htmlFor="chooseUpdate">¿Modificar contraseña?</label>
                    <input
                        type="checkbox"
                        className="w-5 border-2 border-blue-200 p-2 rounded-md"
                        checked={checkUpdate}
                        onChange={(e) => setCheckUpdate(e.target.checked)}
                    />
                </div>}
                {(!id || checkUpdate) && (
                    <>
                        <label htmlFor="password">Contraseña <span className="text-red-500">*</span></label>
                        <input
                            type="password"
                            {...register("password", { required: true })}
                            placeholder="ej. 123456789"
                            className="border-2 border-blue-200 p-2 rounded-md"
                        />
                        {errors.password && (
                            <p role="alert" className="text-red-500 -mt-2 font-semibold text-sm">
                                Contraseña es requerido
                            </p>
                        )}

                        <label htmlFor="confirmPassword">Confirmar contraseña <span className="text-red-500">*</span></label>
                        <input
                            type="password"
                            {...register("confirmPassword", { required: true })}
                            placeholder="ej. 123456789"
                            className="border-2 border-blue-200 p-2 rounded-md"
                        />
                        {errors.confirmPassword && (
                            <p role="alert" className="text-red-500 -mt-2 font-semibold text-sm">
                                Contraseña es requerido
                            </p>
                        )}
                    </>
                )}
                <ResponsiveDialog
                    iconButton={id ? "Actualizar" : "Registrar"}
                    handleConfirm={handleSubmit(onSubmit)}
                    buttonText={id ? "Actualizar" : "Aceptar"}
                    className="text-white font-semibold bg-blue-900 p-2 rounded-md hover:bg-blue-800 transition-all duration-300 mt-6"
                    dialogText={id ? "Los datos actualizados se guardarán en la base de datos tal y como lo ingresaste" : "Los datos se guardarán en la base de datos tal y como lo ingresaste"}
                    dialogQuestion={id ? "¿Estás seguro de que deseas actualizar este registro?" : "¿Estás seguro de que deseas registrar este formulario?"}
                />
            </form>
        </section>
    )
}

export default UsersForm