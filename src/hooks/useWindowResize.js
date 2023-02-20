import {useState, useEffect} from 'react'

function getDimensions() {
  const {innerWidth, innerHeight} = window

  return {
    width: innerWidth,
    height: innerHeight,
  }
}

function useDimensions() {
  let [dimensions, setCurrentDimensions] = useState(getDimensions())

  function determineDimensions() {
    setCurrentDimensions(getDimensions())
  }

  useEffect(() => {
    window.addEventListener('resize', determineDimensions)

    return () => {
      window.removeEventListener('resize', determineDimensions)
    }
  }, [])

  return dimensions
}

export default useDimensions
