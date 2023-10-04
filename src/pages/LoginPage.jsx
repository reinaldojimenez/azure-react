import React, { useEffect, useState} from 'react';
import logo from './../assets/logo.png'
import { useForm } from 'react-hook-form'
import {useAuth} from './../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'

function LoginPage() {

    const { register, handleSubmit, formState: {errors} } = useForm(); 
    
    const { signin, errors: signinErrors, isAuthenticated } = useAuth();

    const navigate = useNavigate();
    
    const onSubmit = handleSubmit( async(data) => {
        signin(data);
    });

    useEffect(() => {    
        if(isAuthenticated) navigate('/generarqr') 
    }, [isAuthenticated])

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-white p-5 rounded-2 text-secondary" style={{ width: 25 + 'rem', border: 1 + 'px solid #EE7A19' }}>
                <div className="flex justify-center">
                    <img src={ logo } alt="login-icon" style={{ height: 7+'rem', marginBottom: 2.5+"rem" }} />
                </div>

                {
                    signinErrors.map((error, i) => (
                        <div className='bg-red-500 p-2 text-white text-center my-2' key={i}> {error} </div>
                    ))
                }

                <form onSubmit={onSubmit}>
                    <div className="mt-4">
                        <label className="w-full mb-2" style={{ fontWeight: 'bold' }} htmlFor="usuario"> Usuario: </label>          
                        <input className="w-full bg-zinc-50 border-solid border-2 border-orange-300 px-4 py-2 rounded-md my-2" type="password" name="usuario" id="usuario" placeholder="Usuario" { ...register("username", {required: true}) }/>
                        {
                            errors.username && (
                                <p className='text-red-500'> el usuario es requerido</p>
                            )
                        }
                    </div>

                    <div className="input-group mt-3">
                        <label className="w-100 mb-2" style={{ fontWeight: "bold" }} htmlFor="clave">Clave:</label>                        
                        <input className="w-full bg-zinc-50 border-solid border-2 border-orange-300 px-4 py-2 rounded-md my-2" type="password" name="clave" id="clave" placeholder="Clave" { ...register("password", {required: true}) }/>                        
                        {
                            errors.password && (
                                <p className='text-red-500'> la contraseña es requerida</p>
                            )
                        } 
                    </div>

                    <div className="flex w-full justify-center">                    
                        <button className='bg-sky-500 text-white px-4 py-2 rounded-md my-2'>Ingresar</button>
                    </div>
                </form>

            </div>
        </div> 
  )
}

export default LoginPage