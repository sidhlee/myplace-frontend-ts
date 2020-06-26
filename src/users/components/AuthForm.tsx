import React, { useState, useContext } from 'react'

import Form from '../../shared/components/formElements/Form'
import Button from '../../shared/components/UIElements/Button'
import Input from '../../shared/components/formElements/Input'
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/validator'
import { useForm } from '../../shared/hooks/useForm'
import { AuthContext } from '../../shared/context/AuthContext'

enum AuthMode {
  LOGIN,
  SIGNUP,
}

type AuthFormProps = {}

const AuthForm = (props: AuthFormProps) => {
  const auth = useContext(AuthContext)

  const [authMode, setAuthMode] = useState(AuthMode.LOGIN)

  const [formState, inputChangeCallback, setFormStateCallback] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  )

  const handleAuthFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    auth.login()
    console.log(formState.inputs)
  }

  const toggleAuthMode = () => {
    // switch to signup
    if (authMode === AuthMode.LOGIN) {
      setFormStateCallback(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
        },
        false
      )

      setAuthMode(AuthMode.SIGNUP)
    } else {
      // switch to login

      setFormStateCallback(
        {
          email: {
            value: formState.inputs.email.value,
            isValid: formState.inputs.email.isValid,
          },
          password: {
            value: formState.inputs.password.value,
            isValid: formState.inputs.password.isValid,
          },
        },
        formState.isValid
      )

      setAuthMode(AuthMode.LOGIN)
    }
  }

  return (
    <Form
      onSubmit={handleAuthFormSubmit}
      buttons={
        <>
          <Button type="button" large onClick={toggleAuthMode}>
            SWITCH TO {authMode === AuthMode.LOGIN ? 'SIGNUP' : 'LOGIN'}
          </Button>
          <Button type="submit" disabled={!formState.isValid} primary large>
            {authMode === AuthMode.LOGIN ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </>
      }
    >
      {authMode === AuthMode.SIGNUP && (
        <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          placeholder="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name"
          inputChangeCallback={inputChangeCallback}
        />
      )}
      <Input
        id="email"
        element="input"
        type="email"
        label="Email"
        placeholder="Email"
        validators={[VALIDATOR_EMAIL()]}
        errorText="Please enter a valid email"
        inputChangeCallback={inputChangeCallback}
      />
      <Input
        id="password"
        element="input"
        type="password"
        label="Password"
        placeholder="Password"
        validators={[VALIDATOR_MINLENGTH(6)]}
        errorText="Password should be at least 6 characters"
        inputChangeCallback={inputChangeCallback}
      />
    </Form>
  )
}

export default AuthForm
