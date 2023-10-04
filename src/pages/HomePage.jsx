import React from 'react'
import logoEmpresa from './../assets/venado.png'
import { useForm } from 'react-hook-form'
import {useAuth} from './../context/AuthContext';

function HomePage() {

  const { register, handleSubmit, formState: {errors} } = useForm(); 
  
  const { signin, errors: signinErrors, generarQR } = useAuth();

  const onSubmit = handleSubmit( async(data) => {
    const dataValid = {
      ...data,
      amount: Number(data.amount)
    }

    const respuesta = await generarQR(dataValid);
    //console.log(res);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-white p-5 rounded-2 text-secondary" style={{ width: 25 + 'rem', border: 1 + 'px solid #EE7A19' }}>
                <div className="flex justify-center">
                    <img src={ logoEmpresa } alt="login-icon" style={{ height: 7+'rem', marginBottom: 2.5+"rem" }} />
                </div>

                {
                    signinErrors.map((error, i) => (
                        <div className='bg-red-500 p-2 text-white text-center my-2' key={i}> {error} </div>
                    ))
                }

                <form onSubmit={onSubmit}>
                    <div className="mt-4">
                        <label className="w-full mb-2" style={{ fontWeight: 'bold' }} htmlFor="usuario"> Cliente: </label>          
                        <input className="w-full bg-zinc-50 border-solid border-2 border-orange-300 px-4 py-2 rounded-md my-2" type="text" name="cliente" id="cliente" placeholder="Cliente" { ...register("cliente", {required: true}) }/>
                        {
                            errors.cliente && (
                                <p className='text-red-500'> el nombre del cliente es requerido</p>
                            )
                        }
                    </div>

                    <div className="input-group mt-3">
                        <label className="w-100 mb-2" style={{ fontWeight: "bold" }} htmlFor="clave">Monto:</label>                        
                        <input className="w-full bg-zinc-50 border-solid border-2 border-orange-300 px-4 py-2 rounded-md my-2" type="number" name="monto" id="monto" min="0" step="0.01" placeholder="Monto" { ...register("amount", {required: true}) }/>                        
                        {
                            errors.amount && (
                                <p className='text-red-500'> el monto es requerido</p>
                            )
                        } 
                    </div>

                    <div className="flex w-full justify-center">                    
                        <button className='bg-sky-500 text-white px-4 py-2 rounded-md my-2'>Generar QR</button>
                    </div>
                </form>

            </div>
        </div> 
  )
}

export default HomePage