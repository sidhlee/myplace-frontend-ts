import React, { FormEvent, useEffect } from 'react'

import Form from '../../shared/components/formElements/Form'
import Button from '../../shared/components/UIElements/Button'
import Input from '../../shared/components/formElements/Input'

import { useForm } from '../../shared/hooks/useForm'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/utils/validator'

import { Place } from '../../shared/models/types'
import { useHistory } from 'react-router-dom'

type UpdatePlaceFormProps = {
  place: Place
}

const UpdatePlaceForm = (props: UpdatePlaceFormProps) => {
  const [formState, inputChangeCallback] = useForm(
    {
      title: {
        value: props.place.title,
        isValid: true,
      },
      description: {
        value: props.place.description,
        isValid: true,
      },
    },
    true
  )

  const history = useHistory()

  const handleUpdateFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(formState.inputs)
  }
  return (
    <Form
      buttons={
        <>
          <Button type="button" onClick={() => history.goBack()} large>
            CANCEL
          </Button>
          <Button type="submit" disabled={!formState.isValid} primary large>
            UPDATE
          </Button>
        </>
      }
      onSubmit={handleUpdateFormSubmit}
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
        // All input & output data should be synchronized with formState
        initialValue={formState.inputs.title.value}
        initialIsValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        placeholder="Description"
        validators={[VALIDATOR_MINLENGTH(4)]}
        errorText="Description should be more than 4 letters."
        inputChangeCallback={inputChangeCallback}
        initialValue={formState.inputs.description.value}
        initialIsValid={formState.inputs.description.isValid}
      />
    </Form>
  )
}

export default UpdatePlaceForm
