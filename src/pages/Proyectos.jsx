import useProyecto from "../hooks/useProyecto"
import ProyectoPreview from "../components/ProyectoPreview"
import Spinner from "../components/Spinner"
import Alerta from "../components/Alerta"
import io from 'socket.io-client'
import { useEffect } from "react"

let socket 

const Proyectos = () => {

  const { proyectos, cargando, alerta } = useProyecto()

  return (
    <>
    
      {alerta?.msg && <Alerta alerta={alerta}/>}
      <h1
        className='text-4xl font-black mb-5'
      > Proyectos</h1>

      { cargando ? <Spinner/> : (
        <div className="bg-white shadow rounded-lg">
            {proyectos.length ? (
              proyectos.map(proyecto => (
                <ProyectoPreview
                  key={proyecto._id}
                  proyecto={proyecto}
                />
              ))
            ) : <p className="text-center font-bold text-2xl py-5">No hay proyectos</p>}
        </div>
      )}
    </>
  )
}

export default Proyectos