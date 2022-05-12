import React from 'react'
import { BarLoader, ClipLoader, ScaleLoader } from 'react-spinners'

const Loader = () => {
  return <div className='loader'>
      <ScaleLoader height={60} width={10} color={"white"}/>
  </div>
}

export default Loader