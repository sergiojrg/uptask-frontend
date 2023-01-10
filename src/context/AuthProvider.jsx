import { useState, createContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [auth,setAuth] = useState({})
    const [cargando,setCargando] = useState(true)

    useEffect(() => {

        const autenticarUsuario = async () =>{
            const token = localStorage.getItem('token')

            if(!token){
                setCargando(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/perfil`, config) 
                setAuth(data)

            } catch (error) {
                setAuth({})
            }finally{
                setCargando(false)
            }


        }
        autenticarUsuario()

    }, [])

    const cerrarSesionAuth = () =>{
        setAuth({})
    }
    

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesionAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

export {
    AuthProvider
}