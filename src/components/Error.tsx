import { Link } from "react-router-dom"

function Error() {
    return (
        <section className="min-h-screen bg-blue-900 flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-white">¡Oooops,  ha ocurrido un error!</h1>
            <p className="text-xl text-white">Intente nuevamente más tarde</p>
            <Link to={'/'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Volver al inicio</Link>
        </section>
    )
}

export default Error