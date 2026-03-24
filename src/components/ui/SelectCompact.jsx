import React from 'react'

const selectClassName =
  'w-full rounded border border-stone-100 bg-stone-100 px-2 py-4 text-sm text-black shadow-sm outline-none focus:border-stone-600 focus:ring-1 focus:ring-stone-500 cursor-pointer'

const SelectCompact = ({
  id,
  name,
  required,
  onChange,
  value,
  children,
}) => {
  return (
    <select
      className={selectClassName}
      id={id}
      name={name}
      required={required}
      onChange={onChange}
      {...(value !== undefined ? { value } : {})}
    >
      {children}
    </select>
  )
}

export default SelectCompact
