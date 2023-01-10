import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const ProyectoPreview = ({proyecto}) => {
    const { auth } = useAuth()
    const { nombre, _id, cliente, creador } = proyecto
  return (
    <div className='border-b p-5 flex justify-between flex-col gap-3 md:flex-row'>
        <div
          className='flex items-center gap-2'
        >
          <p className='flex-1 capitalize'>{nombre} <span className='text-gray-500 capitalize'>{cliente}</span></p>

          {auth._id !== creador && <p className="p-1 text-xs rounded-lg text-white bg-green-600">Colaborador</p>}          
        </div>

        <Link className="text-gray-600 hover:text-gray-800 text-sm font-bold uppercase transition-colors" to={`${_id}`}>Ver proyecto</Link>
    </div>
  )
}

export default ProyectoPreview