import React from 'react'

const InputLabel = ({ htmlFor, label }) => {
  return (
    <label htmlFor={htmlFor} className='py-2 text-stone-600 font-light'>{label}</label>
  )
}

export default InputLabel
