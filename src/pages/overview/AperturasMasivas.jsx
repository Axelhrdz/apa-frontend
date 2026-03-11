import React from 'react'
import axios from 'axios';
import { useState } from 'react';



// const [conexiones, setConexiones] = useState('null');
// const [cobros, setCobros] = useState('null');
// const [baldio, setBaldio] = useState('null');

// const handleTipoPredioChange = (e) => {
//   setTipoPredio(e.target.value);
// }





const handleSubmit = async (e) => {
  e.preventDefault();
  

  //getting form data
  const formData = new FormData(e.target);
  const formValues = Object.fromEntries(formData);
  console.log(formValues);  //here getting the file value and the other values 


  try {
    const res = await axios.post(
      'https://apa-backend-2g9k.onrender.com/aperturas_masivas/apertura', formData,
      // 'http://localhost:3000/aperturas_masivas/apertura', formData,
      {
        responseType: 'blob',
      }
    );
    // console.log(res.data);

    //create blob
    // const blob = new Blob([res.data], { type: 'text/plain' });

    //create url from blob, to download
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.href = url;
    // link.setAttribute('download', formValues.folio);
    // document.body.appendChild(link);
    // link.click();


    // //cleanup
    // link.remove();
    // window.URL.revokeObjectURL(url);


    return res.data;
  } catch (error) {
    console.error('Error during fetching operation:', error);
  }
};


const AperturasMasivas = () => {

  // const [tipoPredio, setTipoPredio] = useState('null');
  const [localidad, setLocalidad] = useState('');
  const [colonia, setColonia] = useState('');


  const handleChangeLocalidad = (e) => {
    setLocalidad(e.target.value.toUpperCase());
  }

  const handleChangeColonia = (e) => {
    setColonia(e.target.value.toUpperCase());
  }

  
  return (
    <div className='bg-[#fff] text-black h-screen'>
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

        <button type='submit' className='text-white bg-blue-500 px-4 py-2 rounded-md cursor-pointer'>Enviar</button>
      </form>
    </div>
  )
}

export default AperturasMasivas
