import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alerta'

const Login = () => {

  const { setAuth } = useAuth()

  const navigate = useNavigate()

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [alerta,setAlerta] = useState({})

  const handleSubmit = async e =>{
    e.preventDefault()

    if([email,password].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/login`,{email,password})
      
      setAlerta({})
      localStorage.setItem('token',data.token)
      setAuth(data)
      navigate('/proyectos')
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1 className="text-sky-600 font-black capitalize text-6xl text-center">Inicia sesión y administra tus <span className='text-slate-600'>proyectos</span></h1>

      { alerta?.msg && <Alerta alerta={alerta}/>}

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
            placeholder="Email de Registro"
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={email}
            onChange={e=>setEmail(e.target.value)}
          />
        </div>
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
            placeholder="Password de Registro"
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className='bg-sky-700 w-full text-white py-3 uppercase font-bold rounded hover:bg-sky-800 cursor-pointer transition-colors'
        />
      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link
          to="registrar"
          className='block text-center my-5 text-slate-500 uppercase text-sm'
        >
          ¿No tienes una cuenta? Registrate
        </Link>
        <Link
          to="olvide-password"
          className='block text-center my-5 text-slate-500 uppercase text-sm'
        >
          ¿Olvidaste tu password?
        </Link>
      </nav>
    </>
  )
}

export default Login