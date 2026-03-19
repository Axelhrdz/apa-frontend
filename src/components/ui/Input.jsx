import React from 'react'

const Input = ({ placeholder, type, id, required, onChange, value, name}) => {
  return (
    <input 
    className='bg-white text-black w-[100%] p-3 rounded-md border-1 border-stone-400 shadow-md' 
    placeholder={placeholder}
    type={type || 'text'}
    id={id}
    required={required}
    onChange={onChange}
    value={value}
    name={name}
    />
  )
}

export default Input
