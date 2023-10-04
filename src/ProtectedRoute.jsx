import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import { useAuth } from './context/AuthContext'

function ProtectedRoute() {
    const {user, isAuthenticated, loading} = useAuth();

    console.log(loading, isAuthenticated)

    if(loading) return <h1>Loading...</h1>

    if(!loading && !isAuthenticated){
        console.log("**********FALSO*************")
        console.log(isAuthenticated);
        return <Navigate to={'/login'} replace />  //replace --> es para que no vuelva a la ruta anterior, se sobreescriba
    }
    console.log("**********VERDADERO*************")

    return (
        <Outlet/> /* indica donde se va a renderizar el componete anidado, CONTINUA CON EL COMPONETE QUE ESTA ADENTRO*/
    )
}

export default ProtectedRoute