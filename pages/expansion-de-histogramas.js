import { faHighlighter } from "@fortawesome/free-solid-svg-icons";
import { getDisplayName } from "next/dist/shared/lib/utils";
import Link from "next/link";
import {useRef, useEffect, useState} from "react"

export default function Home() {

  const canvasRef = useRef(null)
  const histogram1Ref = useRef(null)
  const expandido = useRef(null)
  const histogram2Ref = useRef(null)
  const [IsImageOn, setIsImageOn] = useState(false)
  const [MinValue, setMinValue] = useState(undefined)
  const [MaxValue, setMaxValue] = useState(undefined)

  // El e es el file que acabamos de colocar
  const imageChange = async (e) => {

    // validar si es que se eligió alguna imagen
    if (e.target.files && e.target.files.length > 0) {
      var theIMG = e.target.files[0]
      var reader = new FileReader()
      reader.readAsDataURL(theIMG)
      reader.onloadend = function (e) {
        var myImage = new Image(); 
        myImage.src = e.target.result; 

        myImage.onload = function(ev) {
          var originalCanvas = canvasRef.current; 
          var expandedCanvas = expandido.current
          var originalContext = originalCanvas.getContext("2d"); 
          var expandedContext = expandedCanvas.getContext('2d')
          var histo1 = histogram1Ref.current; 
          var histo1Context = histo1.getContext("2d");
          histo1Context.clearRect(0,0, histo1.width, histo1.height) 
          originalCanvas.width = myImage.width; 
          originalCanvas.height = myImage.height; 
          expandedCanvas.width = myImage.width
          expandedCanvas.height = myImage.height
          originalContext.drawImage(myImage,0,0);
          expandedContext.drawImage(myImage,0,0);

          // Draws the image on canvas
          const scannedImage = originalContext.getImageData(0,0, originalCanvas.width, originalCanvas.height)
          const ExpandedImage = scannedImage
          var auxArr = []
          for (let i = 0; i < scannedImage.data.length; i+=4) {
            var total = scannedImage.data[i] + scannedImage.data[i+1] + scannedImage.data[i+2]
            var AV = Math.floor(total/3)
            if(AV < 42) AV = 42
            if(AV > 214) AV = 214 
            scannedImage.data[i] = AV;
            scannedImage.data[i+1] = AV;
            scannedImage.data[i+2] = AV;
            
            auxArr.push(AV)
          }
          auxArr.sort(function(a, b){return a - b})
          var min = auxArr[0]
          var max = auxArr[auxArr.length-1]
          
          setMaxValue(max)
          setMinValue(min)
          originalContext.putImageData(scannedImage, 0, 0);

          //expansión
          var pendent = 255/(max-min)
          var B = -(pendent*min)

           for (let i = 0; i < scannedImage.data.length; i+=4) {
            var total = scannedImage.data[i] + scannedImage.data[i+1] + scannedImage.data[i+2]
            var AV = Math.floor(total/3)
             ExpandedImage.data[i] = AV*pendent + B;
             ExpandedImage.data[i+1] = AV*pendent + B;
             ExpandedImage.data[i+2] = AV*pendent + B;
           }  
           console.log(min,max)
          expandedContext.putImageData(ExpandedImage, 0, 0);
          setIsImageOn(true)



          var FrequenceArr = []
          var highestValue = 0
          var x = 0
          for (let i = 0; i < 256; i++) {
            var c = 0  
            for (let j = 0; j < scannedImage.data.length; j+=4) {
                  if(scannedImage.data[j] == i) ++c
              }
              FrequenceArr.push({
                n: i,
                counter: c,
              })
              if(c > highestValue) highestValue = c;
          }
          
      console.log(FrequenceArr)
      var x = 0;
      var F = histo1.width/255
       for (let i = 0; i < FrequenceArr.length; i++) {
         var height = histo1.height * (5/6 * (highestValue-(highestValue-FrequenceArr[i].counter))) / highestValue
         console.log(height)
        histo1Context.fillStyle = "white";
         histo1Context.beginPath();
         histo1Context.fillRect(x, histo1.height - height , F, height);
         histo1Context.stroke();
         x += F
      } 
      
        }
      }
    }
  };
  
  return <>
    <div className="page align-center">
      <h1>Expansión de un histograma: </h1>
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
    <canvas ref={histogram1Ref} className={IsImageOn ? 'img-canvas' : 'display-none'}/>
    {
      IsImageOn && <>
        <p>La imagen que subiste está a una escala de blanco y negro de {MaxValue-MinValue} tonalidades. El valor más oscuro es de {MinValue} y el más claro es de {MaxValue}.</p>
        <h1>A continuación, se muestra la imagen expandida en una escala de grises de 0 a 255:</h1>
      </>
    }
    <canvas ref={expandido} className={IsImageOn ? 'img-canvas' : 'display-none'}/>
    </div>
  </>
}
