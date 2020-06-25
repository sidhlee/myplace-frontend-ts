import React from 'react'

import FormPage from '../../shared/components/formElements/FormPage'
import AuthForm from '../components/AuthForm'

const Auth = () => {
  const header = (
    <header>
      <h2>Log In</h2>
      <p>Please login to continue.</p>
    </header>
  )
  return (
    <FormPage header={header}>
      <AuthForm />
    </FormPage>
  )
}

export default Auth
