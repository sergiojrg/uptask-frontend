import useProyecto from "../hooks/useProyecto"

const Colaborador = ({colaborador}) => {

    const { nombre, email } = colaborador

    const { handleModalEliminarColaborador, modalEliminarColaborador } = useProyecto() 

  return (
    <div
        className="border-b p-5 flex justify-between items-center"
    >
        <div
        >
            <p className="text-lg font-bold text-gray-700 capitalize">
                {nombre}
            </p>
            <p className="text-sm text-gray-700">
                {email}
            </p>
        </div>
        <div>
            <button
                type="button"
                className="bg-red-600 px-4 py-3 text-white uppercase text-sm rounded-lg"
                onClick={()=>handleModalEliminarColaborador(colaborador)}
            >
                Eliminar
            </button>
        </div>

    </div>
  )
}

export default Colaborador