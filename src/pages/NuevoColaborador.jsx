import { useEffect } from 'react'
import useProyecto from '../hooks/useProyecto'
import FormularioColaborador from "../components/FormularioColaborador"
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import Alerta from '../components/Alerta'

const NuevoColaborador = () => {

    const { obtenerProyecto, proyecto, alerta, cargandoColaborador, colaborador, agregarColaborador } = useProyecto()
    const params = useParams()

    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])

    if(!proyecto?._id) return <Alerta alerta={alerta}/>

  return (
    <>
        <h1 className='text-4xl capitalize font-black'>
            Añadir colaborador(a) al proyecto: {proyecto.nombre}
        </h1>

        <div
            className='mt-10 flex justify-center mb-10'
        >
            <FormularioColaborador/>
        </div>

        {cargandoColaborador ? <Spinner/>: colaborador?._id &&(
            <div className='flex w-full justify-center'>
                <div
                    className='bg-white w-full py-10 px-5 md:w-2/3 rounded-lg shadow'
                >
                    <h2 className='text-center mb-10 text-2xl font-bold'>Resultado:</h2>
                    <div className="flex justify-between items-center">
                        <p className='text-xl capitalize'><span className="font-bold">Colaborador: </span> {colaborador.nombre}</p>

                        <button
                            type="button"
                            className='bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm hover:bg-slate-600'
                            onClick={()=> agregarColaborador({
                                email: colaborador.email
                            })}
                        >
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        )} 
    </>
  )
}

export default NuevoColaborador