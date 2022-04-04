import MetaTags from '../Components/MetaTags'
import NavBar from '../Components/NavBar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <>
  <MetaTags/>
  <NavBar/> 
    <Component {...pageProps} />
  </>
}

export default MyApp
