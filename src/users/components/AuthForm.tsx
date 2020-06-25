import React from 'react'
import styled from 'styled-components'

import Form from '../../shared/components/formElements/Form'
import Button from '../../shared/components/UIElements/Button'
import Input from '../../shared/components/formElements/Input'
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../../shared/utils/validator'
import { useForm } from '../../shared/hooks/useForm'

const StyledAuthForm = styled.div``

type AuthFormProps = {}

const AuthForm = (props: AuthFormProps) => {
  const [formState, inputChangeCallback] = useForm(
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
    console.log(formState.inputs)
  }

  return (
    <Form
      onSubmit={handleAuthFormSubmit}
      buttons={
        <>
          <Button type="submit" disabled={!formState.isValid} primary large>
            LOGIN
          </Button>
        </>
      }
    >
      <Input
        id="email"
        element="input"
        type="email"
        label="Email"
        placeholder="Your email"
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
