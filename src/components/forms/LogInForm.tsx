import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

function LogInForm() {
    return (
        <form className="flex flex-col gap-4 mt-8">
            <label htmlFor="email" className="text-sm font-medium text-blue-100">Email empresa *</label>
            <div className='relative flex items-center'>
                <EmailIcon className="text-blue-100 w-5 h-5 ml-3 absolute" />
                <input placeholder="Email" className="block pl-11 w-full p-2 py-2.5 text-sm
                         bg-blue-900/30 border border-blue-800 rounded-lg
                         text-white placeholder-blue-300/50
                         focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400
                        transition-colors duration-200 outline-none" />
            </div>
            <label htmlFor="password" className="text-sm font-medium text-blue-100">Contraseña *</label>
            <div className='relative flex items-center'>
                <LockIcon className="text-blue-100 w-5 h-5 ml-3 absolute" />
                <input type="password" placeholder="Contraseña" className="block pl-11 w-full p-2 py-2.5 text-sm
                         bg-blue-900/30 border border-blue-800 rounded-lg
                         text-white placeholder-blue-300/50
                         focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400
                        transition-colors duration-200 outline-none" />
            </div>





            <button className="rounded-lg bg-yellow-400 text-blue-900 font-semibold mt-6 p-2 hover:bg-yellow-500 hover:text-blue-900            transition-colors duration-200">Acceder</button>
        </form>
    )
}

export default LogInForm