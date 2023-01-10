import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import io from 'socket.io-client'

let socket

const ProyectoContext = createContext()

const ProyectoProvider = ({children}) => {

    const navigate = useNavigate()

    const { auth } = useAuth()

    const [proyectos, setProyectos] = useState([])
    const [alerta,setAlerta] = useState({})
    const [proyecto,setProyecto] = useState({})
    const [cargando,setCargando] = useState(false)
    const [modalFormularioTarea,setModalFormularioTarea] = useState(false)
    const [tarea,setTarea] = useState({})
    const [modalEliminarTarea,setModalEliminarTarea] = useState(false)
    const [colaborador,setColaborador] = useState({})
    const [cargandoColaborador, setCargandoColaborador] = useState(false)
    const [modalEliminarColaborador,setModalEliminarColaborador] = useState(false)
    const [buscador,setBuscador] = useState(false)

    useEffect(()=>{
        const obtenerProyectos = async () => {
            try {
                if(!auth._id) return
                setCargando(true)
                const token = localStorage.getItem('token')
                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos`,config)
                setProyectos(data)
            } catch (error) {
                console.log(error)
            }finally{
                setCargando(false)
            }
        }
        obtenerProyectos()
    },[auth])

    useEffect(()=>{
        socket = io(import.meta.env.VITE_BACKEND_URL)
    },[])
    
    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(()=>{
            setAlerta({})
        },5000)
    } 

    const submitProyecto = async project => {

        if(project.id){
            await editarProyecto(project) 
        }else{
            await nuevoProyecto(project)
        }

    }

    const editarProyecto = async project => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/${project.id}`,project,config)

            mostrarAlerta({
                msg: 'Proyecto actualizado',
                error: false
            })

            const proyectosActualizados = proyectos.map(p => p._id === data._id ? data: p)
            setProyectos(proyectosActualizados)

            setTimeout(()=>{
                mostrarAlerta({})
                navigate('/proyectos')
            },5000)

        } catch (error) {
            console.log(error)
        }
    }

    const nuevoProyecto = async project => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos`,project,config)

            mostrarAlerta({
                msg: 'Proyecto creado',
                error: false
            })

            setProyectos([...proyectos, data])

            setTimeout(()=>{
                mostrarAlerta({})
                navigate('/proyectos')
            },5000)
            
        } catch (error) {
            console.log(error)
        }
    }

    const elimnarProyecto = async id => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            
            const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/${id}`,config)

            const proyectosActualizados = proyectos.filter(p => p._id !== id)
            setProyectos(proyectosActualizados)

            mostrarAlerta({
                msg: data.msg,
                error: false
            })

            setTimeout(()=>{
                mostrarAlerta({})
                navigate('/proyectos')
            },5000)

        } catch (error) {
            console.log(error)
        }
    }

    const obtenerProyecto = async id => {
        setCargando(true)
        setProyecto({})
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`
                }
            }
            const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/${id}`,config)
            setProyecto(data)
            setAlerta({})

        } catch (error) {
            console.log('error proyecto',error)
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            navigate('/proyectos')

            // setTimeout(()=>{
            //     console.log('error')
            // },1500)
        }finally{
            setTimeout(()=>{
                setCargando(false)
                // setAlerta({})
            },1500)
        }
    }

    const handleModalTarea = () => {
        setModalFormularioTarea(!modalFormularioTarea)
    }

    const submitTarea = async tarea => {

        if(tarea.id){
            await editarTarea(tarea)
        }else{
            await crearTarea(tarea)
        }
    }

    const editarTarea = async(tarea) => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`
                }
            }

            const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/tareas/${tarea.id}`, tarea, config)

            socket.emit('actualizar tarea',data)
            
            
        } catch (error) {
            console.log(error)
        }finally{
            setAlerta({})
            setModalFormularioTarea(false)
            setCargando(false)
        }
    } 

    const editarTareaSocket = (tarea) => {
        //agrega la tarea al state
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = proyecto.tareas.map(tareaState => tareaState._id === tarea._id ? tarea: tareaState)
        setProyecto(proyectoActualizado)
    }

    const crearTarea = async tarea => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`
                }
            }

            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tareas`, tarea, config)

            //agrega la tarea al state
            // const proyectoActualizado = {...proyecto}
            // proyectoActualizado.tareas = [...proyecto.tareas,data]
            // setProyecto(proyectoActualizado)

            //Socket io
            socket.emit('nueva tarea', data)
            
        } catch (error) {
            console.log(error)
        }finally{
            setAlerta({})
            setModalFormularioTarea(false)
            setCargando(false)
        }
    }

    //Socket io
    const submitTareasProyecto = (tarea) => {
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = [...proyectoActualizado.tareas,tarea]
        setProyecto(proyectoActualizado)
    }

    const handleModalEditarTarea = tarea => {
        setTarea(tarea)
        setModalFormularioTarea(true)
    }

    const handleModalEliminarTarea = tarea => {
        setTarea(tarea)
        setModalEliminarTarea(!modalEliminarTarea)
    }
    
    const eliminarTarea = async () => {
    
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`
                }
            }

            const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/tareas/${tarea._id}`,config)

            socket.emit('eliminar tarea',tarea)

            setAlerta({
                msg: data.msg,
                error: false
            })
        } catch (error) {
            console.log(error)
        } finally{
            setModalEliminarTarea(false)
            setTarea({})
            setTimeout(()=>{
                setAlerta({})
            },3000)
        }
    }

    // Socket
    const eliminarTareaSocket = (tarea) => {
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState=> tareaState._id !== tarea._id )
        setProyecto(proyectoActualizado)
    }

    const submitColaborador = async email => {
        setCargandoColaborador(true)
        setColaborador({})
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`
                }
            }

            // return
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/colaboradores`,{email},config)
            setColaborador(data)
        } catch (error) {
            setAlerta({
                msg: error.respone.data.msg,
                error: true
            })
        } finally{
            setAlerta({})
            setTimeout(() => {
                setCargandoColaborador(false)
            }, 2000);
        }
    }

    const agregarColaborador = async email => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`
                }
            }
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/agregar-colaborador/${proyecto._id}`,email,config)
            setAlerta({
                msg: data.msg,
                error: false
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        } finally{
            setColaborador({})
            setTimeout(()=>{
                setAlerta({})
            },3000)
        }
    }

    const handleModalEliminarColaborador = (colaborador) =>{
        setModalEliminarColaborador(!modalEliminarColaborador)
        setColaborador(colaborador)
    }

    const eliminarColaborador = async () => {
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/eliminar-colaborador/${proyecto._id}`,{id:colaborador._id},config)

            const proyectoActualizado = {...proyecto}
            proyectoActualizado.colaboradores = proyecto.colaboradores.filter(proyectoState => proyectoState._id !== colaborador._id)
            setProyecto(proyectoActualizado)

            setAlerta({
                msg: data.msg,
                error:false
            })
            setModalEliminarColaborador(false)
        } catch (error) {
            console.log(error.response)
        } finally{
            setColaborador({})
            setTimeout(()=>{
                setAlerta({})
            },3000)
        }
    }

    const completarTarea = async id => {
        try{
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tareas/estado/${id}`,{},config)

            socket.emit('cambiar estado',data)

            setAlerta({})
            setTarea({})

        }catch(error){
            console.log(error)
        }
    }

    const cambiarEstadoSocket = (tarea)=>{
        console.log(tarea)
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = proyecto.tareas.map(tareaState => tareaState._id === tarea._id ? tarea: tareaState)
        setProyecto(proyectoActualizado)
    }

    const handleBuscador = () =>{
        setBuscador(!buscador)
    }

    const cerrarSesionProyectos = () => {
        setProyectos([])
        setProyecto({})
        setAlerta({})

    }

    return(
        <ProyectoContext.Provider
            value={{
                proyectos,
                mostrarAlerta,
                alerta,
                submitProyecto,
                obtenerProyecto,
                proyecto,
                cargando,
                elimnarProyecto,
                handleModalTarea,
                modalFormularioTarea,
                submitTarea,
                handleModalEditarTarea,
                tarea,
                handleModalEliminarTarea,
                modalEliminarTarea,
                eliminarTarea,
                submitColaborador,
                colaborador,
                cargandoColaborador,
                agregarColaborador,
                handleModalEliminarColaborador,
                modalEliminarColaborador,
                eliminarColaborador,
                completarTarea,
                handleBuscador,
                buscador,
                submitTareasProyecto,
                eliminarTareaSocket,
                editarTareaSocket,
                cambiarEstadoSocket,
                cerrarSesionProyectos
            }}
        >
            {children}
        </ProyectoContext.Provider>
    )
}

export default ProyectoContext

export {
    ProyectoProvider
}