import React from 'react'

const ButtonPrimary = ({ type, disabled, onClick, text }) => {
  return (
    <button 
    type={type || 'button'}
    disabled={disabled}
    onClick={onClick}
    className='bg-black text-white px-4 py-3 w-full rounded-md cursor-pointer'
    >
        {text}

    </button>
  )
}

export default ButtonPrimary
