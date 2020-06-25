import React, { FormEvent } from 'react'

import Form from '../../shared/components/formElements/Form'
import Input from '../../shared/components/formElements/Input'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/utils/validator'
import Button from '../../shared/components/UIElements/Button'

import { useForm } from '../../shared/hooks/useForm'

type NewPlaceFormProps = {}

const NewPlaceForm = (props: NewPlaceFormProps) => {
  const [formState, inputChangeCallback] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
    },
    false
  )

  const handleNewPlaceSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(formState.inputs)
  }

  return (
    <Form
      onSubmit={handleNewPlaceSubmit}
      buttons={
        <>
          <Button to="/" large>
            CANCEL
          </Button>
          <Button type="submit" disabled={!formState.isValid} primary large>
            ADD PLACE
          </Button>
        </>
      }
    >
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        placeholder="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        inputChangeCallback={inputChangeCallback}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        placeholder="Description"
        validators={[VALIDATOR_MINLENGTH(4)]}
        errorText="Description should be more than 4 letters."
        inputChangeCallback={inputChangeCallback}
      />
      <Input
        id="address"
        element="input"
        type="text"
        label="Address"
        placeholder="Address (example: Central Park, NY)"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        inputChangeCallback={inputChangeCallback}
      />
    </Form>
  )
}

export default NewPlaceForm
