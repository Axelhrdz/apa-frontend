import React from 'react'
import { Link } from 'react-router-dom';

const Overview = () => {
  return (
    <div className='bg-stone-900 text-white h-screen flex flex-row'>
      {/* <div id='sidebar-div' className='bg-stone-400 w-auto flex flex-col items-left gap-2 py-3 px-4'>
        <a href="#" className='hover:text-blue-500 cursor-pointer'>Aperturas masivas</a>
        <a href="#" className='hover:text-blue-500 cursor-pointer'>Fraccionamientos</a>
        <a href="#" className='hover:text-blue-500 cursor-pointer'>Cartas aviso masivas</a>
        <a href="#" className='hover:text-blue-500 cursor-pointer'>Caracteristicas masivas</a>
        <a href="#" className='hover:text-blue-500 cursor-pointer'>Autosuficientes masivas</a>
      </div> */}



      <div className='bg-stone-400 w-auto flex flex-col items-left gap-2 py-3 px-4'>
        <Link to='/fraccionamientos' className='hover:text-blue-500 cursor-pointer'>Fraccionamientos</Link>
        <Link to='/aperturas-masivas' className='hover:text-blue-500 cursor-pointer'>Aperturas masivas</Link>
        <Link to='/autosuficientes-masivas' className='hover:text-blue-500 cursor-pointer'>Autosuficientes masivas</Link>
        
      </div>


      <div id='main-content-div' className='bg-stone-500 w-6/6'></div>
    </div>
  )
}

export default Overview;
