import { getDisplayName } from "next/dist/shared/lib/utils";
import Link from "next/link";
import {useRef, useEffect, useState} from "react"

export default function Home() {

  const canvasRef = useRef(null)
  const [IsImageOn, setIsImageOn] = useState(false)
  const imageChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      var theIMG = e.target.files[0]
      var reader = new FileReader()
      reader.readAsDataURL(theIMG)
      reader.onloadend = function (e) {
        var myImage = new Image(); // Creates image object
        myImage.src = e.target.result; // Assigns converted image to image object
        myImage.onload = function(ev) {
          var myCanvas = canvasRef.current; // Creates a canvas object
          var myContext = myCanvas.getContext("2d"); // Creates a contect object
          myCanvas.width = myImage.width; // Assigns image's width to canvas
          myCanvas.height = myImage.height; // Assigns image's height to canvas
          myContext.drawImage(myImage,0,0); // Draws the image on canvas
          const scannedImage = myContext.getImageData(0,0, myCanvas.width, myCanvas.height)
          for (let i = 0; i < scannedImage.data.length; i+=4) {
            var total = scannedImage.data[i] + scannedImage.data[i+1] + scannedImage.data[i+2]
            var AV = total/3
            scannedImage.data[i] = AV;
            scannedImage.data[i+1] = AV;
            scannedImage.data[i+2] = AV;
          }
          myContext.putImageData(scannedImage, 0, 0);
          setIsImageOn(true)

          let imgData = myCanvas.toDataURL("image/jpeg",0.75); // Assigns image base64 string in jpeg format to a variable
        }
      }
    }
  };
  
  return <>
    <div className="page align-center">
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
