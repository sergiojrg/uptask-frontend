import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import useProyecto from '../hooks/useProyecto'
import Spinner from '../components/Spinner'
import ModalFormularioTarea from '../components/ModalFormularioTarea'
import ModalEliminarTarea from '../components/ModalEliminarTarea'
import Tarea from '../components/Tarea'
import Alerta from '../components/Alerta'
import Colaborador from '../components/Colaborador'
import ModalEliminarColaborador from '../components/ModalEliminarColaborador'
import useAdmin from '../hooks/useAdmin'
import io from 'socket.io-client'

let socket

const Proyecto = () => {

    const params = useParams()
    const { cambiarEstadoSocket, submitTareasProyecto, editarTareaSocket, eliminarTareaSocket, obtenerProyecto, proyecto, cargando, elimnarProyecto, handleModalTarea, alerta } = useProyecto()

    const admin = useAdmin()

    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])

    useEffect(()=>{
        socket = io(import.meta.env.VITE_BACKEND_URL)
        socket.emit('abrir proyecto',params.id)
    },[])

    useEffect(()=>{
        socket.on('tarea agregada',(tareaNueva)=>{
            if(tareaNueva.proyecto === proyecto._id){
                submitTareasProyecto(tareaNueva)
            }
        })

        socket.on('tarea eliminada',(tareaEliminada)=>{
            if(tareaEliminada.proyecto === proyecto._id){
                eliminarTareaSocket(tareaEliminada)
            }
        })

        socket.on('tarea actualizada', tarea =>{
            if(tarea.proyecto._id === proyecto._id){
                editarTareaSocket(tarea)
            }
        })

        socket.on('estado cambiado',tarea => {
            console.log(tarea)
            if(tarea.proyecto === proyecto._id){
                cambiarEstadoSocket(tarea)
            }
        })
    })
    
    const {nombre} = proyecto

  return (
    cargando ? (
        <Spinner>
        </Spinner>
    ) : (
            <>
                <div className='flex justify-between mb-4'>
                    <h1 className='capitalize font-black text-4xl'>
                        {nombre}
                    </h1>

                    <div
                        className='flex items-center gap-2 text-gray-500 hover:text-black transition-colors'
                    >

                        {admin && (
                            <Link
                                to={`/proyectos/editar/${proyecto._id}`}
                                className="font-bold uppercase"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>
                                Editar
                            </Link>
                        )}


                    </div>
                </div>

                {admin && (
                    <button onClick={handleModalTarea} type="button" className='flex gap-2 items-center justify-center text-sm px-4 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Nueva tarea
                    </button>
                )}

                <p
                className='font-bold text-xl mt-10' 
                >
                    Tareas del Proyecto
                </p>

                <div
                    className='shadow mt-10 rounded-lg bg-white sm:w-full'
                >
                    {proyecto.tareas?.length ? (
                        proyecto.tareas?.map(tarea => (
                            <Tarea key={tarea._id} tarea={tarea}/>
                        ))
                    ): (
                        <p className='p-4 text-xl my-10 text-center font-bold'>No hay tareas en este proyecto</p>
                    )}
                </div>
                
                {admin && (
                    <>
                        <div className='flex items-center justify-between mt-10'>
                            <p className='capitalize font-black text-4xl'>Colaboradores</p>
                            <Link
                                to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                                className="text-gray-400 uppercase font-bold hover:text-black"
                            >
                                Añadir
                            </Link>
                        </div>

                        <div
                            className='shadow mt-10 rounded-lg bg-white sm:w-full'
                        >
                            {proyecto.colaboradores?.length ? (
                                proyecto.colaboradores?.map(c => (
                                    <Colaborador
                                        key={c._id}
                                        colaborador={c}
                                    />
                                ))
                            ): (
                                <p className='p-4 text-xl my-10 text-center font-bold'>No hay colaboradores en este proyecto</p>
                            )}
                        </div>
                    </>
                )}

                <ModalFormularioTarea/>
                <ModalEliminarTarea/>
                <ModalEliminarColaborador/>
            </>    
    )
  )
}

export default Proyecto