import { useEffect, useState } from "react"
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Alerta from '../components/Alerta'

const ConfirmarCuenta = () => {

  const params = useParams()
  const { token } = params

  const [alerta,setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/confirmar/${token}`
        const { data } = await axios(url)

        setAlerta({
          msg: data.msg,
          error: false
        })
        setCuentaConfirmada(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    confirmarCuenta()
  }, [token])
  

  return (
    <>
      <h1 className="text-sky-600 font-black capitalize text-6xl text-center">Confirma tu cuenta y comienza a crear tus <span className='text-slate-600'>proyectos</span></h1>

      <div
        className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white"
      >
        {
          alerta?.msg && <Alerta alerta={alerta}/>
        }

        {cuentaConfirmada && <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to="/">Iniciar Sesión</Link>}
      </div>
      
    </>
  )
}

export default ConfirmarCuenta