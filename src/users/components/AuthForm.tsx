import React, { useContext } from 'react'

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
import { AuthMode } from '../pages/Auth'

type LoginBody = {
  email: string
  password: string
}

// intersection type for augmenting existing type
type SignupBody = LoginBody & { name: string }

type AuthResponse = {
  userId: string
  userName: string
  userImageUrl: string
  email: string
  token: string
}

type AuthFormProps = {
  authMode: AuthMode
  toggleAuthMode: () => void
}

const initialInputs = {
  email: {
    value: '',
    isValid: false,
  },
  password: {
    value: '',
    isValid: false,
  },
}

const AuthForm = ({ authMode, toggleAuthMode }: AuthFormProps) => {
  const auth = useContext(AuthContext)

  const { sendRequest, isLoading, error, clearError } = useRequest()
  const [formState, inputChangeCallback, setFormStateCallback, dispatch] =
    useForm(initialInputs, false)

  const handleAuthModeButtonClick = () => {
    // switch to signup - add name & image input field
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
            isValid: true,
          },
        },
        false
      )
    }
    if (authMode === AuthMode.SIGNUP) {
      // switch to login - remove name & image input field
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
    }
    toggleAuthMode()
  }

  const handleAuthFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.isValid) {
      dispatch({ type: 'SHOW_ERROR_MESSAGE' })
      return
    }

    if (authMode === AuthMode.LOGIN) {
      try {
        const responseData = await sendRequest<
          AuthResponse | undefined,
          LoginBody
        >(`${process.env.REACT_APP_SERVER_URL}/api/users/login`, 'POST', {
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        })
        if (responseData) {
          const { userId, userName, userImageUrl, token } = responseData
          auth.login(userId, userName, userImageUrl, token)
        }
      } catch (err) {}
    }
    if (authMode === AuthMode.SIGNUP) {
      try {
        const formData = new FormData()
        formData.append('name', formState.inputs.name.value)
        formData.append('email', formState.inputs.email.value)
        formData.append('password', formState.inputs.password.value)
        formData.append('image', formState.inputs.image.value)

        const responseData = await sendRequest<
          AuthResponse | undefined,
          FormData
        >(
          `${process.env.REACT_APP_SERVER_URL}/api/users/signup`,
          'POST',
          formData
        )
        if (responseData) {
          const { userId, userName, userImageUrl, token } = responseData
          auth.login(userId, userName, userImageUrl, token)
        }
      } catch (err) {}
    }
  }

  const handleSubmitBlur = () => {
    dispatch({ type: 'CLEAR_ERROR_MESSAGE' })
  }

  const handleDemoButtonClick = async () => {
    try {
      const responseData = await sendRequest<
        AuthResponse | undefined,
        LoginBody
      >(`${process.env.REACT_APP_SERVER_URL}/api/users/login`, 'POST', {
        email: 'demo@myplace.com',
        password: '123123',
      })
      if (responseData) {
        const { userId, userName, userImageUrl, token } = responseData
        auth.login(userId, userName, userImageUrl, token)
      }
    } catch (err) {}
  }

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal errorText={error} clearModal={clearError} />
      <Form
        onSubmit={handleAuthFormSubmit}
        buttons={
          <>
            <Button type="button" large onClick={handleAuthModeButtonClick}>
              SWITCH TO {authMode === AuthMode.LOGIN ? 'SIGNUP' : 'LOGIN'}
            </Button>
            <Button
              type="submit"
              onBlur={handleSubmitBlur}
              disabled={false}
              primary
              large
            >
              {authMode === AuthMode.LOGIN ? 'LOGIN' : 'SIGNUP'}
            </Button>
            <Button type="button" onClick={handleDemoButtonClick} large primary>
              TRY DEMO
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
            showErrorMessage={formState.showErrorMessage}
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
          showErrorMessage={formState.showErrorMessage}
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
          showErrorMessage={formState.showErrorMessage}
        />
        {authMode === AuthMode.SIGNUP && (
          <ImageUpload
            id="image"
            inputChangeCallback={inputChangeCallback}
            initialPreviewUrl={require('../../shared/image/Portrait_Placeholder.png')}
            autoFocus
            showErrorMessage={formState.showErrorMessage}
          />
        )}
      </Form>
    </React.Fragment>
  )
}

export default AuthForm
