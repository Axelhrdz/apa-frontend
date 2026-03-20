import React from 'react';
import { useState } from 'react';
// import { Link } from 'react-router-dom';


//UI components imports
import SideOption from './ui/SideOption';

//import previews components
import FraccionamientosPrev from './previews/FraccionamientosPrev';
import AperturasMasivasPrev from './previews/AperturasMasivasPrev';
import AutosuficientesMasivasPrev from './previews/AutosuficientesMasivasPrev';


//SIDE options configuration
const SIDE_OPTIONS = [
  {
    id: 'fraccionamientos',
    label: 'Fraccionamientos',
    component: FraccionamientosPrev
  },
  {
    id: 'aperturas-masivas',
    label: 'Aperturas masivas',
    component: AperturasMasivasPrev
  },
  {
    id: 'autosuficientes-masivas',
    label: 'Autosuficientes masivas',
    component: AutosuficientesMasivasPrev
  }
]


const Overview = () => {
  
  const [selectedOption, setSelectedOption] = useState('');

  
  const activeOption = SIDE_OPTIONS.find(opt => opt.id === selectedOption);

  const handleClick = (e) => {
    // console.log(`clicking options ${e.target.textContent}`);

    // setSelectedOption(e.target.id);
  }
  console.log(selectedOption);

  return (
    <div className='bg-white text-black h-screen flex flex-row'>
      {/* <div id='sidebar-div' className='bg-stone-400 w-auto flex flex-col items-left gap-2 py-3 px-4'>
        <a href="#" className='hover:text-blue-500 cursor-pointer'>Aperturas masivas</a>
        <a href="#" className='hover:text-blue-500 cursor-pointer'>Fraccionamientos</a>
        <a href="#" className='hover:text-blue-500 cursor-pointer'>Cartas aviso masivas</a>
        <a href="#" className='hover:text-blue-500 cursor-pointer'>Caracteristicas masivas</a>
        <a href="#" className='hover:text-blue-500 cursor-pointer'>Autosuficientes masivas</a>
      </div> */}



      <div className='bg-white w-auto flex flex-col items-left gap-2 py-3 px-3 hover:border-r-1 border-stone-300 w-full max-w-3xs'>
        {/* <SideOption text='Fraccionamientos' handleClick={handleClick}  id={'fraccionamientos'} />
        <SideOption text='Aperturas masivas' handleClick={handleClick}  id={'aperturas-masivas'} />
        <SideOption text='Autosuficientes masivas' handleClick={handleClick}  id={'autosuficientes-masivas'} /> */}

        {
          SIDE_OPTIONS.map((option) => {
            const { id, label } = option;
            return (
            <SideOption
              key={id}
              id={id}
              text={label}
              isActive={selectedOption === id}
              onClick={() => setSelectedOption(id)}
            />
            );
          })
        }
        
        
      </div>


      <div id='main-content-div' className=' gap-4 w-full flex justify-center'>
        <div className='w-full max-w-4xl p-6 bg-white'>
          {/* {selectedOption === 'fraccionamientos' && <FraccionamientosPrev />}
          {selectedOption === 'aperturas-masivas' && <AperturasMasivasPrev />}
          {selectedOption === 'autosuficientes-masivas' && <AutosuficientesMasivasPrev />} */}

          {activeOption?.component
              ? React.createElement(activeOption.component)
              : <p>Select an option from the sidebar</p>}
          
        </div>
      </div>
    </div>
  )
}

export default Overview;
