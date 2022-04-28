import React from 'react'
import { useState } from 'react'

const Reticles = () => {

    const [Elements, setElements] = useState([])
    const [ElementAdder, setElementAdder] = useState("")
    

    const AddElement = () => {
        if(Elements.length < 10) setElements(Elements => [...Elements, ElementAdder])
        else window.alert("El máximo es 10 elementos")
    }

  return <div className='page align-center'>
      <input value={ElementAdder} onChange={(e) => setElementAdder(e.target.value)}/>
      <button className='add-btn' onClick={AddElement}>
          Agregar
        </button>
        {
            Elements && Elements.map((data,idx) => {
                return <p key={idx}>{data}</p>
            })
        }
        {
            Elements.length >= 4 && 
            <button onClick={ShowMatrix}>
                Crear matriz
            </button>
        }
  </div>
}

export default Reticles