import { formatearFecha } from "../helpers/formatearFecha"
import useProyecto from "../hooks/useProyecto"
import useAdmin from "../hooks/useAdmin"
import { useEffect, useState } from "react"

const Tarea = ({tarea}) => {
    const { descripcion, nombre, prioridad, fechaEntrega, estado, _id, completado } = tarea

    const admin = useAdmin()
    
    const { completarTarea, handleModalEditarTarea, handleModalEliminarTarea } = useProyecto()
  return (
    <div
        className="border-b p-5 flex gap-4 flex-col mx-auto md:justify-between md:items-center md:flex-row"
    >
        <div>
            <p className="text-xl mb-1 capitalize">{nombre}</p>
            <p className="text-sm mb-1 text-gray-500 capitalize">{descripcion}</p>
            {/* <p className="text-xl mb-1">{formatearFecha(fechaEntrega)}</p> */}
            <p className="text-xl mb-1 text-gray-600">Prioridad {prioridad}</p>
            {completado && estado && <p className="text-xs bg-green-600 w-1/3 uppercase rounded-lg p-1 text-white">Completada por: <span className="font-bold">{completado?.nombre}</span></p>}
        </div>

        <div
            className="flex gap-2"
        >
                {admin && (
                    <button
                        className="bg-indigo-600 px-4 py-2 font-bold text-white uppercase rounded-lg"
                        onClick={()=>handleModalEditarTarea(tarea)}
                    >
                        Editar
                    </button>
                )}
                <button
                    className={`${estado ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-2 font-bold text-white uppercase rounded-lg`}
                    onClick={()=>completarTarea(_id)}
                >
                    {estado ? 'Completa': 'Incompleta'}
                </button>

                {admin && (
                    <button
                        className="bg-red-600 px-4 py-2 font-bold text-white uppercase rounded-lg"
                        onClick={()=>handleModalEliminarTarea(tarea)}
                    >
                        Eliminar
                    </button>
                )}
        </div>
    </div>
  )
}

export default Tarea