import React from 'react'
import { useState, useEffect } from 'react'
import { useRef } from 'react';

const Counter = ({x, setX, IsMin, OtherValue}) => {

    const Aumentar = () => {
        if(IsMin){
            if(x + 1 < OtherValue){
                setX(x+1);
            }
        }
        else {
            if(x+1 < 7){
                setX(x+1)
            }
        }
    } 
    
    const Disminuir = () => {
        if(!IsMin){
            if(x - 1 > OtherValue){
                setX(x-1);
            }
        }
        else {
            if(x-1 > 0){
                setX(x-1)
            }
        }
    }

    return <div className='counter'>
         <button onClick={Disminuir}>
              -
         </button>
         {x}
         <button onClick={Aumentar}>
              +
         </button>
    </div>
}


const Expansion = () => {

    const [Value1, setValue1] = useState(1)
    const [Value2, setValue2] = useState(6)
    const [Pendent1, setPendent1] = useState(undefined)
    const [Pendent2, setPendent2] = useState(undefined)
    const [TableArray, setTableArray] = useState([])
    const [ShowHistogram, setShowHistogram] = useState(false)
    const [ShowTable, setShowTable] = useState(false)
    const [Matriz, setMatriz] = useState([])
    const [Pendiente, setPendiente] = useState(0)
    const canvasRef = useRef(null)

    const Create = () => {
        setShowTable(false)
        setPendiente(7/(Value2-Value1))
        setPendent1(Value1)
        setPendent2(Value2)
        // for (let i = 0; i < 1000; i++) {
        //     setArray(Array => [...Array, Math.floor(Math.random() * (Value2 - Value1 + 1)) + Value1])
        // }
        setShowHistogram(true)
    }

    const ShowProcedure = () =>{
        setMatriz([])
        console.log(TableArray)
        for (let i = Value1; i <= Value2; i++) {
            var counter = 0;
            for (let j = 0; j < TableArray.length; j++) {
                if(TableArray[j] === i) {
                    ++counter
                }
            }
            setMatriz(a => [...a, {
                n: i,
                c: counter,
            }])
        }
        setShowTable(true)
    }

    useEffect(() => {
       var arr = []
      if(Pendent1 != undefined){
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        //Our first draw
        var x = 0;
        var y = 0;
        const m = 32
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < m; j++) {
                    var rand = Math.floor(Math.random() * (Value2-Value1+1) + Value1);
                    arr.push(rand)
                    ctx.fillStyle = `rgb(
                            ${Math.floor(255 / 8 * rand)},
                            ${Math.floor(255 / 8 * rand)},
                            ${Math.floor(255 / 8 * rand)})`;
            
             
                ctx.fillRect(x, y, ctx.canvas.width/m, ctx.canvas.height/m);
                y+=canvas.height/m
            }
            x+=canvas.width/m;
            y = 0
        }
      }
      setTableArray(arr)
    }, [Pendent1, Pendent2])

    

    

  return <div className='page align-center'>
      <h1>Expansión de un histograma de 24 píxeles</h1>
      <p>Elige dos valores, un mínimo mayor que 0 y un máximo menor que 7:</p>
      <label>Valor mínimo</label>
      <Counter IsMin={true} x={Value1} setX={setValue1} OtherValue={Value2}/>
      <label>Valor máximo</label>
      <Counter IsMin={false} x={Value2} setX={setValue2} OtherValue={Value1}/>
      <button className='do-it' type='button' onClick={Create}>
          Crear el histograma
      </button>
      {
          ShowHistogram && <>
          <canvas ref={canvasRef} className='img-canvas'/>
          <button className='do-it'  onClick={ShowProcedure}>
              Ver el procedimiento
          </button>
          </>
      }
      {
          ShowTable && <>
          {
              Matriz && Matriz.map((data, idx) => {
                  return <p key={idx}>Tonalidad {data.n}: {data.c} píxeles</p>
              })
          }
          <p>Para obtener el nuevo histograma, debemos hallar la pendiente entre estos dos histogramas:</p>
      <p>Pendiente: (7 - 0) / ({Pendent1} - {Pendent2}) = {Pendiente}</p>
      </>
      }
  </div>
}

export default Expansion