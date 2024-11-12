import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface userProps {
    email: string,
    password: string
}
function LogInForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<userProps>();
    const navigate = useNavigate();
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

    const onSubmit: SubmitHandler<userProps> = async (data) => {
        try {
            const userExist = await fetch('http://localhost:3000/auth/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })
            if (userExist.ok) {
                const user = await userExist.json()
                console.log(user.user)
                if (user.user.role === "administrador") {
                    navigate('/courses')
                }
                else {
                    navigate('/')
                }
            } else {
                showError('El usuario no existe')
                reset()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form className="flex flex-col gap-4 mt-8" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email" className="text-sm font-medium text-blue-100">Email empresa *</label>
            <div className='relative flex items-center'>
                <EmailIcon className="text-blue-100 w-5 h-5 ml-3 absolute" />
                <input placeholder="Email" className="block pl-11 w-full p-2 py-2.5 text-sm
                         bg-blue-900/30 border border-blue-800 rounded-lg
                         text-white placeholder-blue-300/50
                         focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400
                        transition-colors duration-200 outline-none" {...register('email', {
                    required: 'El correo es obligatorio',
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Correo inválido'
                    }
                })} />
            </div>
            {errors.email && (
                <p role="alert" className="text-red-500 -mt-2 font-semibold text-sm">
                    {errors.email.message}
                </p>
            )}
            <label htmlFor="password" className="text-sm font-medium text-blue-100">Contraseña *</label>
            <div className='relative flex items-center'>
                <LockIcon className="text-blue-100 w-5 h-5 ml-3 absolute" />
                <input type="password" placeholder="Contraseña" className="block pl-11 w-full p-2 py-2.5 text-sm
                         bg-blue-900/30 border border-blue-800 rounded-lg
                         text-white placeholder-blue-300/50
                         focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400
                        transition-colors duration-200 outline-none" {...register('password', { required: true })} />
            </div>
            {errors.password?.type === "required" && (
                <p role="alert" className="text-red-500 -mt-2 font-semibold text-sm">
                    Contraseña es requerido
                </p>
            )}
            <button className="rounded-lg bg-yellow-400 text-blue-900 font-semibold mt-6 p-2 hover:bg-yellow-500 hover:text-blue-900
                transition-colors duration-200">Acceder</button>
        </form>
    )
}

export default LogInForm