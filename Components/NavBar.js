import Link from 'next/link'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faTelevision } from '@fortawesome/free-solid-svg-icons'

const NavBar = () => {
  return <nav>
    <Link href={"/"}>
    <h2><FontAwesomeIcon icon={faTelevision}/> Histogramic</h2>
    </Link>
      <Link href={"/creditos"}>
        <button className='nav-btn'>
          Créditos
        </button>
      </Link>
  </nav>
}

export default NavBar