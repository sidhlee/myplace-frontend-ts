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
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

enum AuthMode {
  LOGIN,
  SIGNUP,
}

type AuthFormProps = {}

const AuthForm = (props: AuthFormProps) => {
  const auth = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
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

  const handleAuthFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (authMode === AuthMode.LOGIN) {
    }
    if (authMode === AuthMode.SIGNUP) {
      try {
        setIsLoading(true)

        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/users/signup`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: formState.inputs.name.value,
              email: formState.inputs.email.value,
              password: formState.inputs.password.value,
            }),
          }
        )

        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.message)
        }
        console.log(data)

        setIsLoading(false)
        auth.login()
      } catch (err) {
        console.log(err)
        setIsLoading(false)
        setError(err.message || 'Something went wrong.🙁 Please try again.')
      }
    }
    console.log(formState.inputs)
  }

  const clearError = () => {
    setError(null)
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
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal errorText={error} clearModal={clearError} />
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
    </React.Fragment>
  )
}

export default AuthForm
