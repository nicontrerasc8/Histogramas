import React from 'react'
import { useState, useEffect } from 'react'
import { useRef } from 'react';

const m = 32

const Ecualizar = () => {

    const [GeneralArray, setGeneralArray] = useState([])
    const canvasRef = useRef(null)
    const HistogramRef = useRef(null)

    useEffect(() => {
        var InitArr = []
        var acummulatedF = 0;
        var TotalFrecuence
        for (let i = 0; i < 64*2; i++) {
            var f;
            if(i < 16*2 || i > 48*2) f = 0.78125/2;
            else if(i >= 16*2 && i < 24*2 || i > 40*2 && i <= 48*2) f = 1.5625/2;
            else f = 3.125/2;
            f/=100;
            acummulatedF += f
            TotalFrecuence = f*1024
            InitArr.push({
                n: i,
                fr: TotalFrecuence,
                aF: acummulatedF*127
            })
        }
         //Our first draw
         setGeneralArray(InitArr)
     }, [])

     useEffect(() => {
        if(GeneralArray.length > 0){
            console.log(GeneralArray)
            const canvas = canvasRef.current
         const histogram = HistogramRef.current
         const ctx = canvas.getContext('2d')
         const HSctx = histogram.getContext('2d')
         var x = 0;
         var y =0
         for (let i = 0; i < GeneralArray.length; i++) {
            for (let j = 0; j < GeneralArray[i].fr; j++) {
            
                   ctx.fillStyle = `rgb(
                    ${Math.floor(255 / 128 * GeneralArray[i].n)},
                    ${Math.floor(255 / 128 * GeneralArray[i].n)},
                    ${Math.floor(255 / 128 * GeneralArray[i].n)})`;
                    ctx.fillRect(x, y, ctx.canvas.width/m, ctx.canvas.height);

                    
                        HSctx.fillStyle = `rgb(
                        ${Math.floor(255 / 128 * Math.round(GeneralArray[i].aF))},
                        ${Math.floor(255 / 128 * Math.round(GeneralArray[i].aF))},
                        ${Math.floor(255 / 128 * Math.round(GeneralArray[i].aF))})`;
                    HSctx.fillRect(x, y, ctx.canvas.width/m, ctx.canvas.height/m);
                y+=canvas.height/m
                if(y == canvas.height) {
                    y = 0
                    x += canvas.width/m
                }
            }
        }
        }
     }, [GeneralArray])
     

  return <div className='page align-center'>
      <h1>Ecualización de un histograma de 1024 píxeles en 128 tonalidades de grises.</h1>
      <canvas ref={canvasRef} className={'img-canvas'}/>
      <canvas ref={HistogramRef} className='img-canvas'/>
  </div>
}

export default Ecualizar