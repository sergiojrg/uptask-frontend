import { useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'

import Alerta from "../components/Alerta"

const Registrar = () => {

  const [nombre,setNombre] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [repetirPassword,setRepetirPassword] = useState('')
  const [alerta,setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()

    if([nombre,email,password,repetirPassword].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if(password !== repetirPassword){
      setAlerta({
        msg: 'Las contraseñas no son iguales',
        error: true
      })
      return
    }

    if(password.length < 6){
      setAlerta({
        msg: 'la contraseña es muy corta, usa 6 caracteres minimo',
        error: true
      })
      return
    }

    setAlerta({})

    //crear usuario en la api

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios`,{nombre,email,password})
      setAlerta({
        msg: data.msg,
        error: false
      })

      setNombre('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  return (
    <>
      <h1 className="text-sky-600 font-black capitalize text-6xl text-center">Crea tu cuenta y administra tus <span className='text-slate-600'>proyectos</span></h1>

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
        <div
          className='my-5'
        >
          <label
            htmlFor='nombre'
            className='block uppercase text-gray-600 text-xl font-bold'
          >Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={nombre}
            onChange={e=>setNombre(e.target.value)}
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
            placeholder="Password"
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />
        </div>
        <div
          className='my-5'
        >
          <label
            htmlFor='repetir-password'
            className='block uppercase text-gray-600 text-xl font-bold'
          >Repetir Password</label>
          <input
            type="password"
            id="repetir-password"
            name="repetir-password"
            placeholder="Repetir password"
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={repetirPassword}
            onChange={e=>setRepetirPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Crear Cuenta"
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
          to="/olvide-password"
          className='block text-center my-5 text-slate-500 uppercase text-sm'
        >
          ¿Olvidaste tu password?
        </Link>
      </nav>
    </>
  )
}

export default Registrar