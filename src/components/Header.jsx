import { Link } from 'react-router-dom'
import useProyecto from '../hooks/useProyecto'
import BuscadorModal from './BuscadorModal'
import useAuth from '../hooks/useAuth'

const Header = () => {

                
    const { buscador, handleBuscador, cerrarSesionProyectos } = useProyecto()
    const { cerrarSesionAuth } = useAuth()

    const handleCerrarSesion = () => {
        cerrarSesionProyectos()
        cerrarSesionAuth()
        localStorage.removeItem('token')
    }

  return (
    <header
        className="px-4 py-5 bg-white border-b"
    >
        <div className="md:flex md:justify-between md:items-center">
            <h2
                className="mb-5 md:mb-0 text-4xl text-sky-600 text-center font-black"
            >
                Uptask
            </h2>
            {/* <input type="search" placeholder="Buscar proyecto" className="rounded-lg lg:w-96 p-2 border sm:mb-3 md:mb-5"/> */}
            <div
                className='flex flex-col md:flex-row items-center gap-4'
            >
                <button
                    type="button"
                    className='bg-green-600 text-white hover:bg-green-700 transition-colors p-2 rounded-md font-bold uppercase'
                    onClick={handleBuscador}
                >
                    Buscar Proyecto
                </button>
                <Link
                    to="/proyectos"
                    className='font-bold uppercase'
                >
                    Proyectos
                </Link>
                <button onClick={handleCerrarSesion} className='text-white bg-sky-600 text-sm p-3 rounded-md uppercase font-bold' type="button">Cerrar Sesión</button>

                <BuscadorModal/>
            </div>
        </div>
    </header>


  )
}

export default Header