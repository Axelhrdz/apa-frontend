import React from 'react'

const InputCompact = ({
  placeholder,
  type,
  id,
  required,
  onChange,
  value,
  name,
}) => {
  return (
    <input
      className="w-full rounded border border-stone-100 bg-stone-100 px-2 py-4 text-sm text-black shadow-sm outline-none placeholder:text-stone-600 focus:border-stone-600 focus:ring-1 focus:ring-stone-500"
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

export default InputCompact
