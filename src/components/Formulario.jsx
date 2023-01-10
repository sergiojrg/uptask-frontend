import { useState, useEffect } from 'react'
import useProyecto from '../hooks/useProyecto'
import Alerta from './Alerta'
import { useParams } from 'react-router-dom'

const Formulario = () => {

    const params = useParams()    

    const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyecto()

    const [id,setId] = useState(null)
    const [nombre,setNombre] = useState('')
    const [descripcion,setDescripcion] = useState('')
    const [fechaEntrega,setFechaEntrega] = useState('')
    const [cliente,setCliente] = useState('')

    useEffect(() => {
        if(params?.id && proyecto.nombre){
            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega.split('T')[0])
            setCliente(proyecto.cliente)
        }
    }, [params])

    const handleSubmit = async e => {
        e.preventDefault()

        if([nombre,descripcion,fechaEntrega,cliente].includes('')){
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        await submitProyecto({
            nombre,
            descripcion,
            fechaEntrega,
            cliente,
            id
        })

        setId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')

    }

  return (
    <form onSubmit={handleSubmit} className='shadow bg-white py-10 px-5 md:w-2/3 rounded-lg'>

        {alerta?.msg && <Alerta alerta={alerta}/>}

        <div
            className='mb-5'
        >
            <label
                className="text-gray-700 uppercase font-bold text-sm"
                htmlFor='nombre'
            >
                Nombre del proyecto
            </label>
            <input
                type="text"
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                id="nombre"
                name="nombre"
                placeholder="Nombre del proyecto"
                value={nombre}
                onChange={e=>setNombre(e.target.value)}
            />
        </div>

        <div
            className='mb-5'
        >
            <label
                className="text-gray-700 uppercase font-bold text-sm"
                htmlFor='descripcion'
            >
                Descripcion del proyecto
            </label>
            <textarea
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                id="descripcion"
                name="descripcion"
                placeholder="Descripcion del proyecto"
                value={descripcion}
                onChange={e=>setDescripcion(e.target.value)}
            />
        </div>
        <div
            className='mb-5'
        >
            <label
                className="text-gray-700 uppercase font-bold text-sm"
                htmlFor='fecha'
            >
                Fecha de Entrega del Proyecto
            </label>
            <input
                type="date"
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                id="fecha"
                name="fecha"
                placeholder="Fecha de entrega del proyecto"
                value={fechaEntrega}
                onChange={e=>setFechaEntrega(e.target.value)}
            />
        </div>
        <div
            className='mb-5'
        >
            <label
                className="text-gray-700 uppercase font-bold text-sm"
                htmlFor='cliente'
            >
                Cliente del Proyecto
            </label>
            <input
                type="text"
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                id="cliente"
                name="cliente"
                placeholder="Cliente del proyecto"
                value={cliente}
                onChange={e=>setCliente(e.target.value)}
            />
        </div>

        <input
            type="submit"
            className='bg-sky-700 text-white uppercase font-bold w-full p-3 cursor-pointer hover:bg-sky-800 transition-colors'
            value={`${id ? 'Editar Proyecto': "Crear proyecto"}`}
        />

    </form>
  )
}

export default Formulario