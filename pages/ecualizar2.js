import React from 'react'
import { useState, useEffect } from 'react'
import { useRef } from 'react';


const Ecualizar = () => {

    const [InitialArray, setInitialArray] = useState([])
    const [NewArray, setNewArray] = useState([])
    const canvasRef = useRef(null)

    useEffect(() => {
        setInitialArray()
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        var AuxArr = []
        var completeTableAuxArr = []
        var acummulatedF = 0
      for (let i = 0; i < 8; i++) {
          var aux
          do {
            aux = Math.floor(Math.random()*10)
          } while (aux % 2 != 0);
          AuxArr.push({
              n: i,
              c: aux,
          })
          acummulatedF += aux;
      }

      setInitialArray(AuxArr)
      var Frequence = 0
      for (let i = 0; i < 8; i++) {
          Frequence += (AuxArr[i].c / acummulatedF)
          for (let j = 0; j < AuxArr[i].c; j++) {
              completeTableAuxArr.push({
                  n: i,
                  newN: Math.floor(Frequence*7),
                  rand: Math.random(),
              })
          }
      }
      completeTableAuxArr.sort((a, b) => parseFloat(a.rand) - parseFloat(b.rand));
      setNewArray(completeTableAuxArr)

      var Total = Math.pow(acummulatedF, 2)
      var SQRT = Math.sqrt(acummulatedF)
      var x = 0;
      var y = 0;
      var varW = canvas.width/SQRT
      var varH = canvas.height/SQRT
      console.log(acummulatedF, varW, varH)
      for (let i = 0; i < Total; i++) {
        ctx.fillStyle = `rgb(
            ${Math.floor(i*10)},
            ${Math.floor(i*10)},
            ${Math.floor(i*10)})`;
            ctx.fillRect(x, y, varW, varH);

            y+=canvas.height/SQRT
            if(x == canvas.width){
                x = 0
                y+=varH
            }
      }

    }, [])

  return <div className='page align-center'>
      <h1>Ecualización de un histograma de x píxeles en 8 tonalidades de grises.</h1>
      <table>
          {
              InitialArray.length > 0 && InitialArray.map((data, idx) => {
                  return <p key={idx}>{data.n}: {data.c}</p>
              })
          }
      </table>
      <canvas ref={canvasRef} className={'img-canvas'}/>
  </div>
}

export default Ecualizar