import React from 'react'
import { useState, useEffect } from 'react'

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
    const [Value2, setValue2] = useState(2)
    const [Array, setArray] = useState([])
    const [TableArray, setTableArray] = useState([])
    const [ShowTable, setShowTable] = useState(false)
    const [Pendiente, setPendiente] = useState(0)

    const Create = () => {
        setArray([])
        setPendiente(7/(Value2-Value1))
        for (let i = 0; i < 20; i++) {
            setArray(Array => [...Array, Math.floor(Math.random() * (Value2 - Value1 + 1)) + Value1])
        }
    }

    useEffect(() => {
        setTableArray([])
      for (let i = Value1; i <= Value2; i++) {
          var counter = 0;
          for (let j = 0; j < 20; j++) {
              if(Array[j] == i) ++counter;
          }
          setTableArray(TableArray => [...TableArray, {
              n: i,
              c: counter,
          }])
      }
    }, [Array])
    

  return <div className='page align-center'>
      <h1>Expansión de un histograma de 20 valores</h1>
      <p>Elige dos valores, un mínimo mayor que 0 y un máximo menor que 7:</p>
      <label>Valor mínimo</label>
      <Counter IsMin={true} x={Value1} setX={setValue1} OtherValue={Value2}/>
      <label>Valor máximo</label>
      <Counter IsMin={false} x={Value2} setX={setValue2} OtherValue={Value1}/>
      <button className='do-it' type='button' onClick={Create}>
          Crear el histograma
      </button>
      <table>
          {
              TableArray && TableArray.map((data,idx) => {
                  return <p key={idx}>{data.n}: {data.c} datos</p>
              })
          }
      </table>
      <p>Para obtener el nuevo histograma, debemos hallar la pendiente entre estos dos histogramas:</p>
      <p>Pendiente: (7 - 0) / ({Value1} - {Value2}) = {Pendiente}</p>
  </div>
}

export default Expansion