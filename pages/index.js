import { getDisplayName } from "next/dist/shared/lib/utils";
import Link from "next/link";
import {useRef, useEffect, useState} from "react"
import Loader from "../Components/Loader";
import Particles from 'react-tsparticles'
import { loadFull } from "tsparticles";

export default function Home() {

  const [IsLoading, setIsLoading] = useState(true)

  const HandleInit = async(main) => {
    await loadFull(main)
  } 
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000);
  }, [])
  
  
  return <>
  <div className='particles'>
     <Particles id='particles' init={HandleInit}
  options={{
    background: {
      color: {
        value: "#111111",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },

        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 4,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  }}
  />
  </div>
    <div className="page">
    {IsLoading && <Loader/>}
      <h1 style={{marginBottom: "2rem"}}>
        Bienvenido a Histogramic, una web donde puedes 
      </h1>
       <section className="main-grid">
       <Link href={"/ecualizacion-de-histogramas"}>
      <article>
        <img src="https://firebasestorage.googleapis.com/v0/b/prochristo-b4aea.appspot.com/o/Dise%C3%B1o_sin_t%C3%ADtulo__12_-removebg-preview.png?alt=media&token=88a234b4-96fd-4a41-ad94-ad4de1c94a90"/>
      <h3>
        Ecualizar un histograma
      </h3>
      </article>
      </Link>
      <Link href={"/expansion-de-histogramas"}>
      <article>
      <img src="https://firebasestorage.googleapis.com/v0/b/prochristo-b4aea.appspot.com/o/imagen-expandida__1_-removebg-preview.png?alt=media&token=d25587d7-aaa1-48e6-bfd9-4873a628d27a"/>
      <h3>
        Expandir un histograma
      </h3>
      </article>
      </Link> 
       </section>
    </div>
  </>
}
