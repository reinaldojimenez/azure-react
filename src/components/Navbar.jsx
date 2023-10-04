import React from 'react'
import {Link} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  return (
    <nav className='bg-orange-100 my-3 flex justify-between py-5 px-10 rounded-lg'>
      <Link to={ isAuthenticated ? '/generarqr' : '/login'}>
        <h1 className='text-2xl font-bold'>Bantic Fintech</h1>
      </Link>

      <ul className='flex gap-x-2'>
        { isAuthenticated ? (
          <>
            <li>
              Bienvenido: {"Ronel"}
            </li>
            <li>
              <Link to={"/generarqr"} className='bg-indigo-500 px-4 py-1 rounded-sm text-white'>Nuevo QR</Link>              
            </li>
            <li>
            <Link to={"/generarqr"} className='bg-indigo-500 px-4 py-1 rounded-sm text-white'>Cobranzas</Link>
            </li>
            <li>
              <Link to={"/login"} onClick={ () => { logout() } }>Salir</Link>
            </li>
          </>
        ) : (
          <>
            
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar