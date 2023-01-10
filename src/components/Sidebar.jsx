import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Sidebar = () => {

    const { auth } = useAuth()

  return (
    <aside
        className='md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10 '
    >
        <p className='text-xl font-bold capitalize'>Hola {auth.nombre}</p>

        <Link
            to="crear-proyecto"
            className='capitalize block w-full bg-sky-600 mt-5 p-3 text-center text-white rounded-md '
        >
            nuevo proyecto
        </Link>
    </aside>
  )
}

export default Sidebar