import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//UI components imports
import Input from '../components/ui/Input';
import InputLabel from '../components/ui/InputLabel';
import ButtonPrimary from '../components/ui/ButtonPrimary';


const Register = ({ setUser }) => {
    //in case of error, data will be stored here
    const [error, setError] = useState('');
    //here we will store data of form
    const [formData, setFormData] = useState({
        username: '',
        numEmpleado: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    //clean input fields in case of error
    useEffect(() => {
        if(error) {
            setFormData({username: '', numEmpleado: '', email: '', password: ''});
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
                `${import.meta.env.VITE_API_BASE_URL}/auth/register`, 
                formData
            );
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            navigate('/');
        }
        catch(error) {
            setError('Error al registrar usuario');
            console.log(error);
        }
    }



    
  return (
    <div id='register-page-container' className='font-sans bg-[#FFF] text-black h-screen flex flex-col gap-5 items-center justify-center'>
        <div id='wrapper-div' className='w-full max-w-md'>
            <div id='login-page-div' className='flex flex-col gap-2 items-center justify-center mb-8'>
                <h1 className='font-normal text-3xl'>Registrar usuario</h1>
                <span className='font-normal text-md text-stone-600'>Coloque sus datos para empezar</span>
                {error && <p className='text-red-500'>{error}</p>}
            </div>
            <div id='input-form-div' className='w-[100%]'>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

                    <div className='flex gap-0.2 flex-col items-start justify-center'>
                        <InputLabel 
                            htmlFor='username'
                            label='Nombre de usuario'
                        />
                        <Input 
                            placeholder='correo@ejemplo.com'
                            type='text'
                            id='username'
                            required={true}
                            onChange={handleChange}
                            value={formData.username}
                            name='username'

                        />
                    </div>
                    <div className='flex gap-0.2 flex-col items-start justify-center'>
                        <InputLabel 
                            htmlFor='numEmpleado'
                            label='Numero de empleado'
                        />
                        <Input 
                            placeholder='coloca tu numero de empleado'
                            type='text'
                            id='numEmpleado'
                            required={true}
                            onChange={handleChange}
                            value={formData.numEmpleado}
                            name='numEmpleado'

                        />
                    </div>
                    <div className='flex gap-0.2 flex-col items-start justify-center'>
                        <InputLabel 
                            htmlFor='email'
                            label='Correo electronico'
                        />
                        <Input 
                            placeholder='ejemplo@correo.com'
                            type='email'
                            id='email'
                            required={true}
                            onChange={handleChange}
                            value={formData.email}
                            name='email'

                        />
                    </div>
                    <div className='flex gap-0.2 flex-col items-start justify-center'>
                        <InputLabel 
                            htmlFor='password'
                            label='Contraseña'
                        />
                        <Input 
                            placeholder='coloque su contraseña'
                            type='password'
                            id='password'
                            required={true}
                            onChange={handleChange}
                            value={formData.password}
                            name='password'

                        />
                    </div>

                    <ButtonPrimary 
                        type='submit'
                        disabled={false}
                        onClick={handleSubmit}
                        text='Registrar usuario'
                    />
                </form>
                <hr className='w-full border-1 border-stone-200 my-8' />
                <div className='flex gap-2 items-center justify-center'>
                    <span>Ya tienes una cuenta? </span>
                    <Link className='font-bold' to='/login'>Inicia sesion</Link>
                </div>
            </div>
        </div>
        
        
    </div>
  )
}

export default Register
