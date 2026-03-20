import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'

const Fraccionamientos = () => {
  return (
    <div className='flex gap-3 my-5'>
      <div>
        <FontAwesomeIcon icon={faScrewdriverWrench} />
      </div>
      <div className='text-stone-500 flex flex-col gap-2'>
        <h1 className='text-2xl font-thin'>Fraccionamientos</h1>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea incidunt eius quis facilis facere numquam est suscipit ipsam ipsa in?</span>
      </div>
    </div>
  )
}

export default Fraccionamientos
