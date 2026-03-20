import React from 'react'
import { Link } from 'react-router-dom';

const SideOption = ({ text, onClick, isActive }) => {
  return (
    // <div onClick={handleClick} id={id} className='text-stone-700 p-3 font-light hover:text-blue-500 hover:bg-stone-900 hover:text-white rounded-sm cursor-pointer'>{text}</div>


    <div
      onClick={onClick}
      className={
        `p-3 font-light rounder-sm cursor-pointer ${isActive ? 'bg-stone-900 text-white' : 'text-stone-700 hover:text-blue-500 hover:bg-stone-900 hover:text-white'}`
      }
    >
      {text}
    </div>
  )
}

export default SideOption
