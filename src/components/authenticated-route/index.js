import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useUser} from '../../context/user'

const AuthenticatedRoute = ({component: Component, ...rest}) => {
  const {token} = useUser()

  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : props.location.pathname === '/logout' ? (
          <Redirect to={`/`} />
        ) : (
          <Redirect to={`/login`} />
        )
      }
    />
  )
}

export default AuthenticatedRoute
