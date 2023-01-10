import { Link } from "react-router-dom"
import { useState } from 'react'
import Alerta from '../components/Alerta'
import axios from 'axios'


const OlvidePassword = () => {

  const [email,setEmail] = useState('')
  const [alerta, setAlerta ] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()

    if( email === '' || email.length < 6){
      setAlerta({
        msg: 'El email es obligatorio',
        error: true
      })
      return
    }

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password`,{
        email
      })

      setAlerta({
        msg: data.msg,
        error: false
      })

      
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }

    
  }

  return (
    <>
      <h1 className="text-sky-600 font-black capitalize text-6xl text-center">Recupera tu acceso y no pierdas tus <span className='text-slate-600'>proyectos</span></h1>

      {alerta?.msg && <Alerta alerta={alerta}/>}

      <form onSubmit={handleSubmit} className='my-10 px-10 py-5 bg-white shadow rounded-lg'>
        <div
          className='my-5'
        >
          <label
            htmlFor='email'
            className='block uppercase text-gray-600 text-xl font-bold'
          >Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={email}
            onChange={e=>setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Enviar Instrucciones"
          className='bg-sky-700 w-full text-white py-3 uppercase font-bold rounded hover:bg-sky-800 cursor-pointer transition-colors'
        />
      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link
          to="/"
          className='block text-center my-5 text-slate-500 uppercase text-sm'
        >
          Inicia Sesión
        </Link>
        <Link
          to="/registrar"
          className='block text-center my-5 text-slate-500 uppercase text-sm'
        >
          ¿No tienes cuenta? Registrate
        </Link>
      </nav>
    </>
  )
}

export default OlvidePassword