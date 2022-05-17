import { faHighlighter } from "@fortawesome/free-solid-svg-icons";
import { getDisplayName } from "next/dist/shared/lib/utils";
import Link from "next/link";
import {useRef, useEffect, useState} from "react"
import { Bar, Line } from "react-chartjs-2";
import Chart from 'chart.js/auto'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import Loader from "../Components/Loader";


var Fs = []

for (let i = 0; i < 256; i++) {
  Fs.push(i)
}


export default function Home() {

  const canvasRef = useRef(null)
  const histogram1Ref = useRef(null)
  const expandido = useRef(null)
  const [IsLoading, setIsLoading] = useState(false)
  const [OriginalDownload, setOriginalDownload] = useState("")
  const [ExpandedDownload, setExpandedDownload] = useState("")
  const [FirstHistogramChart, setFirstHistogramChart] = useState([])
  const [SecondHistogramChart, setSecondHistogramChart] = useState([])
  const [IsImageOn, setIsImageOn] = useState(false)
  const [MinValue, setMinValue] = useState(undefined)
  const [MaxValue, setMaxValue] = useState(undefined)

  // El e es el file que acabamos de colocar
  const imageChange = async (e) => {
    setIsLoading(true)
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
          var FrequenceArr = []
          var HistogramArr = []
          var highestValue = 0
          var min = 257
          var max = 0
          var x = 0
          for (let i = 0; i < 256; i++) {
            var c = 0  
            for (let j = 0; j < scannedImage.data.length; j+=4) {
                  if(scannedImage.data[j] === i) {
                    ++c
                    if(i < min) min = i
                    else if(i > max) max = i
                  }
              }
              FrequenceArr.push({
                n: i,
                counter: c,
              })
              HistogramArr.push(c)
              if(c > highestValue) highestValue = c;
          }
          setFirstHistogramChart(HistogramArr)

          var auxArr = []
          for (let i = 0; i < scannedImage.data.length; i+=4) {
            var total = scannedImage.data[i] + scannedImage.data[i+1] + scannedImage.data[i+2]
            var AV = Math.floor(total/3)
            scannedImage.data[i] = AV;
            scannedImage.data[i+1] = AV;
            scannedImage.data[i+2] = AV;
            auxArr.push(AV)
          }
          setMaxValue(max)
          setMinValue(min)
          originalContext.putImageData(scannedImage, 0, 0);
          var image = originalCanvas.toDataURL("image/png")
          setOriginalDownload(image)

          //expansión
          var pendent = 255/(max-min)
          var B = -(pendent*min)

           for (let i = 0; i < scannedImage.data.length; i+=4) {
            var total = scannedImage.data[i] + scannedImage.data[i+1] + scannedImage.data[i+2]
            var AV = Math.floor(total/3)
             scannedImage.data[i] = AV*pendent + B;
             scannedImage.data[i+1] = AV*pendent + B;
             scannedImage.data[i+2] = AV*pendent + B;
           }  
     
          var SecondHistogramArr = []
          for (let i = 0; i < 256; i++) {
            var c = 0  
            for (let j = 0; j < scannedImage.data.length; j+=4) {
                  if(scannedImage.data[j] === i) ++c
              }
              SecondHistogramArr.push(c)
          }
          setSecondHistogramChart(SecondHistogramArr)
          expandedContext.putImageData(scannedImage, 0, 0);
          var image2 = expandedCanvas.toDataURL("image/png")
          setExpandedDownload(image2)
          setIsImageOn(true)
        }
      }
    }
  };

  const Restart = () => {
    setIsImageOn(false)
    setFirstHistogramChart([])
    setSecondHistogramChart([])
    setOriginalDownload("")
    setExpandedDownload("")
  }

  useEffect(() => {
    if(IsImageOn == true) setIsLoading(false)
  }, [IsImageOn])
  
  
  return <>
  {IsLoading && <Loader/>}
    <div className="page align-center">
      <h1>Expansión de un histograma: </h1>
      {/* De la 93 a la 101, es para que la imagen se muestre */}
    {
      IsImageOn ? <button onClick={Restart} className="cool-btn">Reiniciar</button>
      : <>
      <input
      accept="image/*"
      type="file"
      id="file"
      onChange={imageChange} /* Es la función que hace que la imagen se muestre en sus valores iniciales */
    /> 
     <label htmlFor="file">
      Elige tu imagen
    </label>
    </>
    }
        
        {/* Línea 103 Este es el canvas de la imagen original de una escala de 42 a 214  */}
    <canvas ref={canvasRef} className={IsImageOn ? 'img-canvas' : 'display-none'}/>
    {
     IsImageOn &&  <>
         <a className="cool-btn" download="imagen-original.png" href={OriginalDownload}>
      Descargate la imagen
    </a>
      <Bar
        data={{
          
          labels: Fs,
          datasets: [
            {
              label: "Frecuencia en el histograma original",
              fill: true,
              lineTension: 0.1,
              backgroundColor: "white",
              borderColor: "white",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              data: FirstHistogramChart,
            },
          ],
        }}
      />
     </>
   }
  <canvas ref={histogram1Ref} className={'display-none'}/> 
    {
      IsImageOn && <>
        <p>La imagen que subiste está a una escala de blanco y negro de {MaxValue-MinValue} tonalidades. El valor más oscuro es de {MinValue} y el más claro es de {MaxValue}.</p>
        <h1>A continuación, se muestra la imagen expandida en una escala de grises de 0 a 255:</h1>
      </>
    }
    <canvas ref={expandido} className={IsImageOn ? 'img-canvas' : 'display-none'}/>
    {
     IsImageOn && <>
         <a className="cool-btn" download="imagen-expandida.png" href={ExpandedDownload}>
      Descargate la imagen
    </a>
      <Bar
          data={{  
            labels: Fs,
            datasets: [
              {
                label: "Frecuencia en el histograma expandido",
                fill: true,
                lineTension: 0.1,
                backgroundColor: "white",
                borderColor: "white",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                data: SecondHistogramChart,
              },
            ],
          }}
      />
     </> 
   }
    </div>
  </>
}
