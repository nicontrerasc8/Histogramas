import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Euclides = () => {

    const [A, setA] = useState(0)
    const [B, setB] = useState(0)
    const [Result, setResult] = useState(0)
    const [OpArray, setOpArray] = useState([])

    const Execute = () => {
        var a, b
        var Operations = []
        if(A == 0 || B == 0) return
      else if(A == B) return
        else if(A > B){
          a = A
          b = B
      }
      else{
          a = B
          b = A
      }
      var q, r
      do {
        q = Math.floor(a/b)
        r = a - q*b
        Operations.push({
            f1: a,
            f2: b,
            m: q,
            re: r
        })
        console.log(a, b, q, r)
        if(r != 0){
            a = b
            b = r
        }
      } while (r != 0);

      console.log("El máximo común divisor es: ", b)
      setOpArray(Operations)
      setResult(b)
    
    }
    
  return <div className='page align-center euclides'>
      <h1>Encuentra el máximo común divisor de dos números de acuerdo con el algoritmo de Euclides:</h1>
      <p>Primer número:</p>
    <input type={"number"} className="blue-input" value={A} onChange={(e) => setA(e.target.value)}/>
    <p>Segundo número: </p>
    <input type={"number"} className="purple-input" value={B} onChange={(e) => setB(e.target.value)}/>
    <button type='button' onClick={Execute}>
        Ejecutar
    </button>
    {
        OpArray.length > 0 && OpArray.map((data,idx) => {
                return <p key={idx}>{data.f1} =  <span className={data.f2 == Result ? 'light-blue' : ''}>{data.f2}</span> &times; {data.m} &#43; {data.re}</p>
            })
        
    }
    {
        Result != 0 && <h1>El MCD es: <span className='light-blue'>{Result}</span></h1>
    }
  </div>
}

export default Euclides