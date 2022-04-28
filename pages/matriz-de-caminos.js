import {useEffect} from 'react'

const Matriz = () => {
  
    useEffect(() => {
      var array = []
      for (let i = 0; i < 5; i++) {
          var aux = []
          for (let j = 0; j < 5; j++) {
              aux.push(Math.round(Math.random()))
          }
          array.push(aux)
      }
      console.log(array)
    }, [])
    

  return <>
  
  </>
}

export default Matriz