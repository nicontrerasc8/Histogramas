import { getDisplayName } from "next/dist/shared/lib/utils";
import Link from "next/link";
import {useRef, useEffect, useState} from "react"

export default function Home() {

  const canvasRef = useRef(null)
  const expandido = useRef(null)
  const [IsImageOn, setIsImageOn] = useState(false)
  const [DataArray, setDataArray] = useState([])
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
    {
      IsImageOn && <>
        <p>La imagen que subiste está a una escala de blanco y negro de {MaxValue-MinValue} tonalidades. El valor más oscuro es de {MinValue} y el más claro es de {MaxValue}.</p>
        <h1>A continuación, se muestra la imagen expandida en una escala de grises de 0 a 255:</h1>
      </>
    }
    <canvas ref={expandido} className={IsImageOn ? 'img-canvas' : 'display-none'}/>
      {/* <Link href={"/ecualizar"}>
      <button>
        Ecualizar un histograma
      </button>
      </Link>
      <Link href={"/expandir"}>
      <button>
        Expandir un histograma
      </button>
      </Link> */}
    </div>
  </>
}
