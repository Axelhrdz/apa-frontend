import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//UI components imports
import Input from '../components/ui/Input';
import InputLabel from '../components/ui/InputLabel';
import ButtonPrimary from '../components/ui/ButtonPrimary';

const Login = ({ setUser }) => {
    //in case of error, data will be stored here
    const [error, setError] = useState('');
    //here we will store data of form
    const [formData, setFormData] = useState({
        email: '',
        numEmpleado: '',
        password: ''
    });
    const navigate = useNavigate();

    //clean input fields in case of error
    useEffect(() => {
        if(error) {
            setFormData({email: '', numEmpleado: '', password: ''});
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    }, [error]);

    //------- Helper Functions -------
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
                formData
            );
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            navigate('/');
        }
        catch(error) {
            setError('Failed to login');
            console.log(error);
        }
    }



    
  return (
    <div id='login-page-container' className='font-sans bg-[#F7F5F2] text-black h-screen flex flex-col gap-5 items-center justify-center'>
        <div id='wrapper-div' className='w-full max-w-md'>
            <div id='login-page-div' className='flex flex-col gap-2 items-center justify-center mb-8'>
                <h1 className='font-normal text-3xl'>Bienvenido de nuevo</h1>
                <span className='font-normal text-md text-stone-600'>Inicia sesion para continuar</span>
            </div>
            <div id='input-form-div' className='rounded-md w-[100%]'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                    <div className='flex gap-0.2 flex-col items-start justify-center'>
                        <InputLabel 
                            htmlFor='email'
                            label='CORREO ELECTRONICO'
                        />
                        <Input 
                            placeholder='correo@ejemplo.com'
                            type='email'
                            id='email'
                            required={true}
                            onChange={handleChange}
                            value={formData.email}
                            name='email'
                        />
                    </div>
                    <div className='flex gap-1 flex-col items-start justify-center'>
                    <InputLabel 
                            htmlFor='numEmpleado'
                            label='NUMERO DE EMPLEADO'
                        />
                        <Input 
                            placeholder='12345'
                            type='text'
                            id='numEmpleado'
                            required={true}
                            onChange={handleChange}
                            value={formData.numEmpleado}
                            name='numEmpleado'
                        />
                    </div>
                    <div className='flex gap-1 flex-col items-start justify-center'>
                    <InputLabel 
                            htmlFor='password'
                            label='CONTRASEÑA'
                        />
                        <Input 
                            placeholder='Escribe tu contraseña'
                            type='password'
                            id='password'
                            required={true}
                            onChange={handleChange}
                            value={formData.password}
                            name='password'
                        />
                    </div>

                    {/* <div className='email-input-div flex gap-4'>
                        <label htmlFor="email">Email</label>
                        <input className='bg-stone-100 text-black' type="email" id="email" required placeholder='Enter your email' name='email' onChange={handleChange} value={formData.email} />
                    </div>
                    <div className='numEmpleado-input-div flex gap-4'>
                        <label htmlFor="numEmpleado">Numero de emeplado</label>
                        <input className='bg-stone-100 text-black' type="text" id='numEmpleado' required placeholder='Enter your number employee' name='numEmpleado' onChange={handleChange} value={formData.numEmpleado}/>
                    </div>
                    <div className='password-input-div flex gap-4'>
                        <label htmlFor="password">Password</label>
                        <input className='bg-stone-100 text-black' type="password" id='password' required placeholder='Enter your password' name='password'onChange={handleChange} value={formData.password} />
                    </div> */}
                    {/* <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer'>Login</button> */}
                    <ButtonPrimary 
                        type='submit'
                        disabled={false}
                        onClick={handleSubmit}
                        text='Iniciar sesion'
                    />
                </form>
                <hr className='w-full border-1 border-stone-200 my-8' />

                <div className='flex gap-2 items-center justify-center'>
                    <span>No tienes cuenta? </span>
                    <Link className='font-bold' to='/register'>Registra nuevo usuario</Link>
                </div>
            </div>
            
        </div>
        {error && <p className='text-red-500'>{error}</p>}
        
    </div>
  )
}

export default Login
