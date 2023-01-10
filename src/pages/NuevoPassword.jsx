import { useState, useEffect } from 'react'
import { Link , useParams } from 'react-router-dom'
import axios from 'axios'
import Alerta from '../components/Alerta'

const NuevoPassword = () => {

  const params = useParams()
  const {token} = params

  const [alerta,setAlerta] = useState({})
  const [tokenValida,setTokenValido] = useState(false)
  const [password,setPassword] = useState('')
  const [passwordModificado,setPasswordModificado] = useState(false)

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await axios(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password/${token}`)
        setTokenValido(true)

      } catch (error) {
        setAlerta({
          msg:error.response.data.msg,
          error:true
        })
      }
    }
    comprobarToken()
  }, [])
  
  const handleSubmit = async e => {
    e.preventDefault()

    if(password.length < 6){
      setAlerta({
        msg: 'El password debe ser de minimo 6 caracteres',
        error: true,
      })
      return
    }

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password/${token}`
      const { data } = await axios.post(url,{
        password
      })
      setAlerta({
        msg: data.msg,
        error: false
      })

      setPasswordModificado(true)
      
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }


  return (
    <>
      <h1 className="text-sky-600 font-black capitalize text-6xl text-center">Reestablece tu password y no pierdas tus <span className='text-slate-600'>proyectos</span></h1>

      {alerta?.msg && <Alerta alerta={alerta}/>}

      { tokenValida && (
        <form onSubmit={handleSubmit} className='my-10 px-10 py-5 bg-white shadow rounded-lg'>
          <div
            className='my-5'
          >
            <label
              htmlFor='password'
              className='block uppercase text-gray-600 text-xl font-bold'
            >Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
              value={password}
              onChange={e=> setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Cambiar Password"
            className='bg-sky-700 w-full text-white py-3 uppercase font-bold rounded hover:bg-sky-800 cursor-pointer transition-colors'
          />
        </form>
      )}

      {passwordModificado && <Link className='block text-center my-5 text-slate-500 uppercase text-sm' to="/">Iniciar Sesión</Link>}

    </>
  )
}

export default NuevoPassword