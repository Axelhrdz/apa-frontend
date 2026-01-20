import React from 'react'

const AperturasMasivas = () => {
  return (
    <div className='bg-stone-900 text-white h-screen'>
      <h1>Aperturas Masivas</h1>
      <span>This is the aperturas masivas page</span>

      <div id='aperturasContainer' className='flex flex-col items-center justify-center bg-stone-800 py-6'>
        <form action="" id='aperturasForm' className='flex flex-col items-center justify-center gap-4 w-full'>
            <div id='fileContiner' className='flex flex-col items-center justify-center '>
                {/* <label htmlFor="fileSelector">Seleccionar archivo</label> */}
                <input type="file" id='fileSelector' className='bg-stone-100 text-black p-2 rounded-md' />

            </div>
            <div id='tipoPredio' className='flex flex-col items-center justify-center bg-stone-700 p-4'>
                <label htmlFor="tipoPredio">Tipo de predio</label>
                <select name="tipoPredio" id="tipoPredio" className='bg-stone-100 text-black cursor-pointer'>
                    <option value="1">Casa</option>
                    <option value="2">Terreno baldio</option>
                </select>
            </div>
            <div id='conexiones' className='flex flex-col items-center justify-center bg-stone-700 p-4'>
                <label htmlFor="conexiones">Conexiones</label>
                <select name="conexiones" id="conexiones" className='bg-stone-100 text-black cursor-pointer'>
                    <option value="1">1. Ninguna</option>
                    <option value="2">2.Conexion Agua</option>
                    <option value="3">3.Conexion Drenaje</option>
                    <option value="4">4.Conexion agua, conexion drenaje</option>
                </select>
            </div>
            <div id='cobros' className='flex flex-col items-center justify-center bg-stone-700 p-4'>
                <label htmlFor="cobros">Cobros</label>
                <select name="corbos" id="cobros" className='bg-stone-100 text-black cursor-pointer'>
                    <option value="null">Seleccione...</option>
                    <option value="1">Agua, infraestructura y colectores</option>
                    <option value="2">Agua, infraestructura</option>
                    <option value="3">Agua</option>
                    <option value="5">Infraestructura y colectores</option>
                </select>
            </div>

            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer'>Generar txt</button>
        </form>
      </div>
    </div>
  )
}

export default AperturasMasivas
