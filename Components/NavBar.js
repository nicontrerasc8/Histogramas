import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'

const NavBar = () => {

  const [OpenNav, setOpenNav] = useState(false);

  const ChangeNavigationValue = () => setOpenNav(!OpenNav)

  const router = useRouter()
  const ChangeRoute = (route) => {
      router.push(route)
      setOpenNav(false)
  }

  return <>
  <nav>
    <Link href={"/"}>
    <h2>Histogramic</h2>
    </Link>
     <div>
     <Link href={"/ecualizacion-de-histogramas"}>
        <button className='nav-btn'>
          Ecualización
        </button>
      </Link>
     <Link href={"/expansion-de-histogramas"}>
        <button className='nav-btn'>
          Expansión
        </button>
      </Link>
     <Link href={"/creditos"}>
        <button className='nav-btn'>
          Créditos
        </button>
      </Link>
     </div>
     <section onClick={ChangeNavigationValue} className={OpenNav ? 'hamburger open-nav' : 'hamburger'}>
          <span className='hamburger-1'/>
          <span className='hamburger-2'/>
          <span className='hamburger-3'/>
     </section>
  </nav>
  <aside className={OpenNav ? "nav-aside" : "display-none"}>
  <button className='nav-btn' onClick={() => ChangeRoute("/ecualizacion-de-histogramas")}>
    Ecualización
  </button>
  <button className='nav-btn' onClick={() => ChangeRoute("/expansion-de-histogramas")}>
    Expansión
  </button>
  <button className='nav-btn' onClick={() => ChangeRoute("/creditos")}>
    Créditos
  </button>
  </aside>
  </>
}

export default NavBar