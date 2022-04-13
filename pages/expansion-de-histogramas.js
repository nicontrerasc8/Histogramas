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
          var expandedCanvas = expandido.current
          var originalContext = originalCanvas.getContext("2d"); // Creates a contect object
          var expandedContext = expandedCanvas.getContext('2d')
          originalCanvas.width = myImage.width; // Assigns image's width to canvas
          originalCanvas.height = myImage.height; // Assigns image's height to canvas
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
          let imgData = originalCanvas.toDataURL("image/jpeg",0.75); // Assigns image base64 string in jpeg format to a variable
        }
      }
    }
  };
  
  return <>
    <div className="page align-center">
      <h1>Expansión de un histograma: </h1>
    <input
          accept="image/*"
          type="file"
          id="file"
          onChange={imageChange}
        /> 
         <label htmlFor="file">
          Elige tu imagen
        </label>
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