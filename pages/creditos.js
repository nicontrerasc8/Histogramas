import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Compas = [
  {
    name: "Nicolás Contreras",
    img: "https://firebasestorage.googleapis.com/v0/b/prochristo-b4aea.appspot.com/o/WIN_20220505_13_29_37_Pro.jpg?alt=media&token=748aa374-5145-4b2d-9e6f-b98a8a0e14db",
    carrera: "Ing. de sistemas de información"
  },
  {
    name: "Miluzka Vargas",
    img: "https://firebasestorage.googleapis.com/v0/b/prochristo-b4aea.appspot.com/o/WhatsApp%20Image%202022-05-11%20at%205.38.41%20PM.jpeg?alt=media&token=15bf2f24-426f-4818-a502-9eac630743cc",
    carrera: "Ing. de sistemas de información"
  },
  {
    name: "Andreas Calixto",
    img: "https://firebasestorage.googleapis.com/v0/b/prochristo-b4aea.appspot.com/o/WhatsApp%20Image%202022-05-11%20at%205.56.05%20PM.jpeg?alt=media&token=24f89613-13f5-4913-814b-0710589c3902",
    carrera: "Ing. de sistemas de información"
  },
  {
    name:"Flavia Cáceres",
    img: "https://firebasestorage.googleapis.com/v0/b/prochristo-b4aea.appspot.com/o/WhatsApp%20Image%202022-05-12%20at%201.53.02%20PM.jpeg?alt=media&token=cd8ad199-77e6-4bd2-8ea4-e6f5c4e259b7",
    carrera: "Ing. de sistemas de información"
  }
]

const Credits = () => {
  return <div className='page align-center creditos'>
       <h1>Créditos: </h1>
       <div className='main-grid'>
       {
         Compas && Compas.map((data, idx) => {
           return <article key={idx}>
             <img src={data.img}/>
             <h3>{data.name}</h3>
             <p>{data.carrera}</p>
           </article>
         })
       }
       </div>
  </div>
}

export default Credits