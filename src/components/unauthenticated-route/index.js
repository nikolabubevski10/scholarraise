import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useUser} from '../../context/user'
import {useAppContext} from '../../context/appContext'

const UnauthenticatedRoute = ({component: Component, ...rest}) => {
  const {token} = useUser()
  const {visited} = useAppContext()

  return (
    <Route
      {...rest}
      render={props =>
        !token ? <Component {...props} /> : <Redirect to={visited || '/dashboard'} />
      }
    />
  )
}

export default UnauthenticatedRoute
