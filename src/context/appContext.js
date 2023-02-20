/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useContext, useState, useCallback} from 'react'

const __sr_context_tag = '__scholar_raise_app__'

function getContextFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(__sr_context_tag))
  } catch {
    return undefined
  }
}

const AppContext = createContext(false)

function AppContextProvider(props) {
  const [isLoading, setLoading] = useState()
  const [visited, setVisited] = useState(getContextFromStorage())
  return <AppContext.Provider value={{isLoading, setLoading, visited, setVisited}} {...props} />
}

function useAppContext() {
  const context = useContext(AppContext)

  if (context === undefined) {
    throw new Error('Please use useAppContext within AppContextProvider')
  }

  const {setVisited} = context

  const saveVisitedProfile = useCallback(function saveProfile(url) {
    setVisited(url)
    localStorage.setItem(__sr_context_tag, JSON.stringify(url))
  }, [])

  const clearVisitedProfile = useCallback(function clearVisited() {
    setVisited()
    localStorage.removeItem(__sr_context_tag)
  }, [])

  return {...context, saveVisitedProfile, clearVisitedProfile}
}

export {AppContextProvider, useAppContext}
