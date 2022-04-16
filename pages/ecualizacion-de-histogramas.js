import React from 'react'
import { useState, useEffect } from 'react'
import { useRef } from 'react';


const Ecualizar = () => {

    const canvasRef = useRef(null)
  const ecualizado = useRef(null)
  const [IsImageOn, setIsImageOn] = useState(false)
  const [MinValue, setMinValue] = useState(undefined)
  const [MaxValue, setMaxValue] = useState(undefined)

  const imageChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      var theIMG = e.target.files[0]
      var reader = new FileReader()
      reader.readAsDataURL(theIMG)
      reader.onloadend = function (e) {
        var myImage = new Image(); // Creates image object
        myImage.src = e.target.result; // Assigns converted image to image object

        myImage.onload = function(ev) {
          var originalCanvas = canvasRef.current; // Creates a canvas object
          var equalizedCanvas = ecualizado.current
          var originalContext = originalCanvas.getContext("2d"); // Creates a contect object
          var equalizedContext = equalizedCanvas.getContext('2d')
          originalCanvas.width = myImage.width; // Assigns image's width to canvas
          originalCanvas.height = myImage.height; // Assigns image's height to canvas
          equalizedCanvas.width = myImage.width
          equalizedCanvas.height = myImage.height
          originalContext.drawImage(myImage,0,0);
          equalizedContext.drawImage(myImage,0,0);
          // Draws the image on canvas
          const scannedImage = originalContext.getImageData(0,0, originalCanvas.width, originalCanvas.height)
          const equalizedImage = scannedImage
          var auxArr = []
          for (let i = 0; i < scannedImage.data.length; i+=4) {
            var total = scannedImage.data[i] + scannedImage.data[i+1] + scannedImage.data[i+2]
            var AV = Math.floor(total/3)
            scannedImage.data[i] = AV;
            scannedImage.data[i+1] = AV;
            scannedImage.data[i+2] = AV;
            auxArr.push(AV)
          }
          auxArr.sort(function(a, b){return a - b})
          var min = auxArr[0]
          var max = auxArr[auxArr.length-1]
          var TableArray = []
          for (let i = 0; i < 256; i++) {
            var c = 0;
            for (let j = 0; j < auxArr.length; j++) {
              if(i == auxArr[j]) ++c;
            }
            if(c > 0 && i > max) max = i

            TableArray.push({
              n: i,
              f: c,
            })
          }
          
          setMaxValue(max)
          setMinValue(min)
          originalContext.putImageData(scannedImage, 0, 0);
          var auxOfFrequences = []
          var Frequence = 0
          for (let i = 0; i < 256; i++) {
            var c = 0  
            for (let j = 0; j < scannedImage.data.length; j+=4) {
                  if(scannedImage.data[j] == i) ++c
              }
              Frequence += c
              auxOfFrequences.push({
                  n: i,
                  aF: Frequence/(scannedImage.data.length/4),
                  newValue: Math.round(255*Frequence/(scannedImage.data.length/4))
              })
          }
          console.log(auxOfFrequences)
          for (let i = 0; i < scannedImage.data.length; i+=4) {
            var total = scannedImage.data[i] + scannedImage.data[i+1] + scannedImage.data[i+2]
            var AV = Math.floor(total/3)
            var NewValue
            for (let i = 0; i < auxOfFrequences.length; i++) {
                if(AV == auxOfFrequences[i].n) NewValue = auxOfFrequences[i].newValue 
            }
             equalizedImage.data[i] = NewValue;
             equalizedImage.data[i+1] = NewValue
             equalizedImage.data[i+2] = NewValue
           } 
          equalizedContext.putImageData(equalizedImage, 0, 0);
          setIsImageOn(true)
        }
      }
    }
  };

  return <div className='page align-center'>
       <h1>Ecualización de un histograma: </h1>
      {/* De la 93 a la 101, es para que la imagen se muestre */}
    <input
          accept="image/*"
          type="file"
          id="file"
          onChange={imageChange} /* Es la función que hace que la imagen se muestre en sus valores iniciales */
        /> 
         <label htmlFor="file">
          Elige tu imagen
        </label>
        {/* Línea 103 Este es el canvas de la imagen original de una escala de 42 a 214  */}
    <canvas ref={canvasRef} className={IsImageOn ? 'img-canvas' : 'display-none'}/>
    {
      IsImageOn && <>
        <p>La imagen que subiste está a una escala de blanco y negro de {MaxValue-MinValue} tonalidades. El valor más oscuro es de {MinValue} y el más claro es de {MaxValue}.</p>
        <h1>A continuación, se muestra la imagen ecualizada en las escalas en una escala de grises de 256 tonalidades:</h1>
      </>
    }
    <canvas ref={ecualizado} className={IsImageOn ? 'img-canvas' : 'display-none'}/>
  </div>
}

export default Ecualizar