import React, { useState } from 'react'

import FormPage from '../../shared/components/formElements/FormPage'
import AuthForm from '../components/AuthForm'

export enum AuthMode {
  LOGIN,
  SIGNUP,
}

const Auth = () => {
  const [authMode, setAuthMode] = useState(AuthMode.LOGIN)

  const toggleAuthMode = () => {
    if (authMode === AuthMode.LOGIN) {
      setAuthMode(AuthMode.SIGNUP)
    } else {
      setAuthMode(AuthMode.LOGIN)
    }
  }
  const header =
    authMode === AuthMode.LOGIN ? (
      <header>
        <h2>Log In</h2>
        <p>Please login to continue.</p>
      </header>
    ) : (
      <header>
        <h2>Sign Up</h2>
        <p>Join MyPlace today.</p>
      </header>
    )

  return (
    <FormPage header={header}>
      <AuthForm authMode={authMode} toggleAuthMode={toggleAuthMode} />
    </FormPage>
  )
}

export default Auth
