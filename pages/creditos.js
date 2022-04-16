import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Credits = () => {
  return <div className='page align-center creditos'>
       <h1>Créditos: </h1>
       <p><FontAwesomeIcon icon={faUser}/> Arián Tapia Motta</p>
       <p><FontAwesomeIcon icon={faUser}/> Flavia Cáceres Bustamante</p>
       <p><FontAwesomeIcon icon={faUser}/> Miluzka Vargas Inca</p>
       <p><FontAwesomeIcon icon={faUser}/> Andreas Calixto Castañeda </p>
       <p><FontAwesomeIcon icon={faUser}/> Nicolás Contreras Castellano</p>
  </div>
}

export default Credits