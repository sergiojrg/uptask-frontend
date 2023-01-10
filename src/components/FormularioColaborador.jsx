import { useState, useEffect } from 'react'
import useProyecto from '../hooks/useProyecto'
import Alerta from './Alerta'

const FormularioColaborador = () => {

    const [email,setEmail] = useState('')

    const { mostrarAlerta, alerta, submitColaborador } = useProyecto()

    const handleSubmit = e => {
        e.preventDefault()
        if(email === ""){
            mostrarAlerta({
                msg: 'El email es obligatorio',
                error: true
            })
            return
        }

        submitColaborador(email)
    }

  return (
    <form
        onSubmit={handleSubmit}
        className='bg-white py-10 px-5 w-full md:w-2/3 rounded-lg shadow'
    >
        {alerta?.msg && <Alerta alerta={alerta}/>}
        <div className='mb-5'>
            <label
                className='text-gray-700 uppercase font-bold text-sm'
                htmlFor='email'
            >
                Correo del colaborador
            </label>
            <input
                id="email"
                type="email"
                placeholder='Introduce el email'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
        </div>
        <input
           type="submit" 
           className='bg-sky-800 hover:bg-sky-900 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm'
           value={`Buscar colaborador`}
        />
    </form>
  )
}

export default FormularioColaborador