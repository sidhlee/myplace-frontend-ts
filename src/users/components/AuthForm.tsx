import React, { useState, useContext } from 'react'

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/validator'
import { useForm } from '../../shared/hooks/useForm'
import { useRequest } from '../../shared/hooks/useRequest'
import { AuthContext } from '../../shared/context/AuthContext'

import Form from '../../shared/components/formElements/Form'
import Button from '../../shared/components/UIElements/Button'
import Input from '../../shared/components/formElements/Input'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ImageUpload from '../../shared/components/formElements/ImageUpload'

enum AuthMode {
  LOGIN,
  SIGNUP,
}

type LoginBody = {
  email: string
  password: string
}

// intersection type for augmenting existing type
type SignupBody = LoginBody & { name: string }

type AuthResponse = {
  userId: string
  email: string
  token: string
}

type AuthFormProps = {}

const AuthForm = (props: AuthFormProps) => {
  const auth = useContext(AuthContext)
  const [authMode, setAuthMode] = useState(AuthMode.LOGIN)

  const { sendRequest, isLoading, error, clearError } = useRequest()
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
      const responseData = await sendRequest<
        AuthResponse | undefined,
        LoginBody
      >(`${process.env.REACT_APP_SERVER_URL}/api/users/login`, 'POST', {
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      })
      if (responseData) {
        auth.login(responseData?.userId)
      }
    }
    if (authMode === AuthMode.SIGNUP) {
      const responseData = await sendRequest<
        AuthResponse | undefined,
        SignupBody
      >(`${process.env.REACT_APP_SERVER_URL}/api/users/signup`, 'POST', {
        name: formState.inputs.name.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      })
      if (responseData) {
        auth.login(responseData?.userId)
      }
    }
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
          image: {
            // HTML input element of type="file" has string value
            // that represents the path to the selected file(s)
            value: null,
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
        {authMode === AuthMode.SIGNUP && (
          <ImageUpload id="image" inputChangeCallback={inputChangeCallback} />
        )}
      </Form>
    </React.Fragment>
  )
}

export default AuthForm
