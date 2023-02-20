import React, {createContext, useContext, useState} from 'react'
import {get, update} from '../api/user'

const _sr_tag = '__scholar_raise__'

const User = createContext()

function getUserFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(_sr_tag))
  } catch {
    return undefined
  }
}

function getTokenFromStorage() {
  return getUserFromStorage()?.apiKey
}

function clearTokenAndUser() {
  localStorage.removeItem(_sr_tag) // RemoveItem doesn't throw any exceptions
}

function UserProvider(props) {
  const [user, setUser] = useState(getUserFromStorage())
  return <User.Provider value={{user, setUser}} {...props} />
}

function useUser() {
  const context = useContext(User)

  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`)
  }

  const {setUser} = context

  function save(user) {
    if (!user) {
      throw new Error('Empty user received')
    }

    try {
      setUser(user)
      localStorage.setItem(_sr_tag, JSON.stringify(user))
    } catch {
      throw new Error('Unable to save data; running on tab data')
    }
  }

  async function refresh() {
    return get(context.user?.hashid).then(save)
  }

  async function updateUser(data) {
    return update(context.user?.hashid, data).then(save)
  }

  function logout() {
    setUser()
    clearTokenAndUser()
  }

  return {
    user: context.user,
    token: context.user?.apiKey,
    save,
    logout,
    refresh,
    update: updateUser,
  }
}

export {getTokenFromStorage, getUserFromStorage, useUser, UserProvider, clearTokenAndUser}
