import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


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
                'http://localhost:3000/auth/register', formData
                // 'https://apa-backend-2g9k.onrender.com/auth/register', formData
            );
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            navigate('/');
        }
        catch(error) {
            setError('Failed to register user');
            
        }
    }



    
  return (
    <div id='login-page-container' className='bg-stone-900 text-white h-screen flex flex-col items-center justify-center'>
        <div id='login-page-div'>
            <h1>Register Page</h1>
        </div>
        <div id='input-form-div'>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='username-input-div flex gap-4'>
                  <label htmlFor="username">Username</label>
                  <input className='bg-stone-100 text-black' type="text" id='username' required placeholder='Enter your username' name='username' onChange={handleChange} value={formData.username}/>
                </div>
                <div className='numEmpleado-input-div flex gap-4'>
                  <label htmlFor="numEmpleado">Numero de emeplado</label>
                  <input className='bg-stone-100 text-black' type="text" id='numEmpleado' required placeholder='Enter your number employee' name='numEmpleado' onChange={handleChange} value={formData.numEmpleado}/>
                </div>
                <div className='email-input-div flex gap-4'>
                    <label htmlFor="email">Email</label>
                    <input className='bg-stone-100 text-black' type="email" id="email" required placeholder='Enter your email' name='email' onChange={handleChange} value={formData.email} />
                </div>
                <div className='password-input-div flex gap-4'>
                    <label htmlFor="password">Password</label>
                    <input className='bg-stone-100 text-black' type="password" id='password' required placeholder='Enter your password' name='password'onChange={handleChange} value={formData.password} />
                </div>
                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer'>Register User</button>
            </form>
        </div>
        {error && <p className='text-red-500'>{error}</p>}
        
    </div>
  )
}

export default Register
