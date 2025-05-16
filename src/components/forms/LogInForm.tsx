import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface userProps {
  email: string;
  password: string;
}

export default function LogInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<userProps>();
  const navigate = useNavigate();

  const showError = (msg: string) =>
    toast.error(msg, { position: "top-right", pauseOnHover: true });

  const onSubmit: SubmitHandler<userProps> = async (data) => {
    try {
      const res = await fetch(`/api/auth/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (res.ok) navigate("/");
      else {
        showError("El usuario no existe");
        reset();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email empresa *
        </label>
        <div className="mt-1 relative">
          <EmailIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            id="email"
            type="email"
            placeholder="tunombre@empresa.com"
            defaultValue="anab4n4n@mymail.com"
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Correo inválido",
              },
            })}
            className="block w-full pl-10 pr-3 py-2 border-b-2 border-gray-300 bg-transparent placeholder-gray-400 focus:outline-none focus:border-[#1565c0] transition"
          />
        </div>
        {errors.email && (
          <p role="alert" className="mt-1 text-xs text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Contraseña *
        </label>
        <div className="mt-1 relative">
          <LockIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            id="password"
            type="password"
            placeholder="Tu contraseña"
            defaultValue="12345678"
            {...register("password", { required: "Contraseña es requerida" })}
            className="block w-full pl-10 pr-3 py-2 border-b-2 border-gray-300 bg-transparent placeholder-gray-400 focus:outline-none focus:border-[#1565c0] transition"
          />
        </div>
        {errors.password && (
          <p role="alert" className="mt-1 text-xs text-red-600">
            {errors.password.message as string}
          </p>
        )}
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full py-2 bg-[#1976d2] text-white font-medium rounded-md shadow hover:bg-[#1565c0] transition"
      >
        Acceder
      </button>
    </form>
  );
}
