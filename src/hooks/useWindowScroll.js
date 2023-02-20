import {useState, useEffect} from 'react'

function getScroll() {
  return {
    scrollX: window.scrollX,
    scrollY: window.scrollY,
  }
}

function useWindowScroll() {
  let [windowScroll, setWindowScroll] = useState(getScroll())

  function handleScroll() {
    setWindowScroll(getScroll())
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return windowScroll
}

export default useWindowScroll
