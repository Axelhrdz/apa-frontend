import React from 'react'
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';



const AperturasMasivas = () => {

  const timeoutRef = useRef(null);

  
  // const [tipoPredio, setTipoPredio] = useState('null');
  const [localidad, setLocalidad] = useState('');
  const [colonia, setColonia] = useState('');
  // const [statusCode, setStatusCode] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  //Cleanup: cancel pending timeout on component unmount
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    //getting form data
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData);
    console.log(formValues);  //here getting the file value and the other values 
  
  
    try {
      const res = await axios.post(
        // 'https://apa-backend-2g9k.onrender.com/aperturas_masivas/apertura', formData,
        `${import.meta.env.VITE_API_BASE_URL}/aperturas_masivas/apertura`, formData,
        {
          // responseType: 'blob',
          responseType: 'json',
        }
      );
  
      
      
      clearTimeout(timeoutRef.current);
      setFeedback({
        type: 'success',
        message: 'Apertura masiva enviada correctamente',
        statusCode: res?.data?.status || null
      })
      timeoutRef.current = setTimeout(() => {
        setFeedback(null);
      }, 4000);


    
      console.log(res?.data?.status)

      
      return res.data;
    } catch (error) {
      console.log(error);
      
      if(error.response){
        clearTimeout(timeoutRef.current);
        setFeedback({
          type: 'error',
          message: 'Error al enviar la apertura masiva',
          statusCode: error.response?.data?.status || null
        })
        timeoutRef.current = setTimeout(() => {
          setFeedback(null);
        }, 4000);

        console.log(error.response?.data?.status);
        
      } else {
        // setStatusCode('NETWORK_ERROR');
        setFeedback({
          type: 'error',
          message: 'No se pudo conectar con el servidor',
          statusCode: null
        });
      }
      // console.log(statusCode);
      console.error('Error during fetching operation:', error);
      
    } finally {
      setIsLoading(false);
    }
  };


  const handleChangeLocalidad = (e) => {
    setLocalidad(e.target.value.toUpperCase());
  }

  const handleChangeColonia = (e) => {
    setColonia(e.target.value.toUpperCase());
  }

  
  return (
    <div className='bg-[#fff] text-black h-screen'>

      {
        feedback?.type === 'success' ?
          <div className='text-center text-2xl font-thin py-5 bg-green-500 text-white'>
            {/* <h1>Status Code: {feedback.statusCode}</h1> */}
            <span>{feedback.message}</span>
          </div>
        : null
      }
      {
        feedback?.type === 'error' ?
          <div className='text-center text-2xl font-thin py-5 bg-red-500 text-white'>
            {/* <h1>Status Code: {feedback.statusCode}</h1> */}
            <span>{feedback.message}</span>
          </div>
        : null
      }


      <div className='text-center text-2xl font-thin py-5 '>
        <h1>Aperturas Masivas</h1>
      </div>
      {/* <span className=''>This is the aperturas masivas page</span> */}
      <br />
      <br />
      <br />

      <form encType='multipart/form-data' action="" onSubmit={handleSubmit} className='flex flex-col gap-4 bg-stone_700 text-black p-4 max-w-md mx-auto border-1'>
        <div className='flex flex-col gap-2'>
          <label htmlFor="folio">Folio / nombre del archivo</label>
          <input required type="text" name='folio' id='folio' className='border-2 border-stone-400 rounded-md p-1 cursor-pointer' />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor="localidad">Localidad</label>
          <input required type="text" name='localidad' id='localidad' className='border-2 border-stone-400 rounded-md p-1 cursor-pointer' onChange={handleChangeLocalidad} value={localidad}/>
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor="colonia">Colonia</label>
          <input required type="text" name='colonia' id='colonia' className='border-2 border-stone-400 rounded-md p-1 cursor-pointer' onChange={handleChangeColonia} value={colonia}/>
        </div>

        <div>
          <input required type="file" name='file' id='file' className='border-2 border-stone-400 rounded-md p-1 cursor-pointer'/>
        </div>
        

        <div className='flex flex-col gap-2'>
          <label htmlFor="tipo_servicio">Tipo de predio</label>
          <select required id="tipo_servicio" name="tipo_servicio" className='border-2 border-stone-400 rounded-md p-1 cursor-pointer'>
            <option value="">Seleccione...</option>
            <option value="H">Habitacional</option>
            <option value="C">Comercial</option>
            <option value="I">Industrial</option>
            <option value="E">Uso de Gobierno</option>
          </select>
        </div>

        {/* <div className='flex flex-col gap-2'>
          <label htmlFor="tipo_predio">Tipo de predio</label>
          <select id="tipo_predio" name="tipo_predio" className='border-2 border-stone-300 rounded-md p-1'>
            <option value="null">Seleccione...</option>
            <option value="casa">Casa habitación</option>
            <option value="terreno">Terreno</option>
          </select>
        </div> */}

        <div className='flex flex-col gap-2'>
          <label htmlFor="conexiones">Conexiones</label>
          <select required id="conexiones" name="conexiones" className='border-2 border-stone-400 rounded-md p-1 cursor-pointer'>
            <option value="" >Seleccione...</option>
            <option value="1">1. Ninguna</option>
            <option value="2">2. Conexion Agua</option>
            <option value="3">3. Conexion drenaje</option>
            <option value="4">4. Conexion agua, conexion drenaje</option>        
          </select>
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor="cobros">Cobros</label>
          <select required id="cobros" name="cobros" className='border-2 border-stone-400 rounded-md p-1 cursor-pointer'>
            <option value="">Seleccione...</option>
            <option value="1">1. Agua, Infraestructura y colectores</option>
            <option value="2">2. Agua, Infraestructura</option>
            <option value="3">3. Agua</option>
            <option value="5">5. Infraestructura y colectores</option>
          </select>
        </div>

        <div className='flex gap-2'>
          <label htmlFor="baldio">Baldio</label>
          <select required id="baldio" name="baldio" className='border-2 border-stone-400 rounded-md p-1 cursor-pointer'>
            <option value="">Seleccione...</option>
            <option value="S">Si</option>
            <option value="N">No</option>
          </select>
        </div>

        <button type='submit' disabled={isLoading} className={`${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 cursor-pointer'} text-white px-4 py-2 rounded-md`}>{isLoading ? 'Enviando...' : 'Enviar'}</button>
      </form>
    </div>
  )
}

export default AperturasMasivas
