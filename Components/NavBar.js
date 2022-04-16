import Link from 'next/link'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTelevision } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const NavBar = () => {

  const [OpenNav, setOpenNav] = useState(false);

  const ChangeNavigationValue = () => setOpenNav(!OpenNav)

  return <>
  <nav>
    <Link href={"/"}>
    <h2><FontAwesomeIcon icon={faTelevision}/> Histogramic</h2>
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
  </aside>
  </>
}

export default NavBar