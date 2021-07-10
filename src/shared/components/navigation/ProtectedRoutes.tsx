import React from 'react'
import { Redirect, Route } from 'react-router'

type ProtectedRouteProps = {
  authenticated: boolean
  path: string
  exact?: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  authenticated,
  path,
  exact,
}) => {
  if (authenticated) {
    return (
      <Route path={path} exact={exact}>
        {children}
      </Route>
    )
  } else {
    return <Redirect to="/" />
  }
}

export default ProtectedRoute
