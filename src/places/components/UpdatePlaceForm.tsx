import React from 'react'

import Form from '../../shared/components/formElements/Form'
import Button from '../../shared/components/UIElements/Button'
import Input from '../../shared/components/formElements/Input'

import { useForm } from '../../shared/hooks/useForm'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/utils/validator'

import { Place } from '../../shared/models/types'

type UpdatePlaceFormProps = {
  place: Place
}

const UpdatePlaceForm = (props: UpdatePlaceFormProps) => {
  const [formState, inputChangeCallback] = useForm()
  return (
    <Form
      buttons={
        <>
          <Button to="/" large>
            CANCEL
          </Button>
          <Button type="submit" disabled={!formState.isValid} primary large>
            UPDATE
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
        initialValue={props.place.title}
        initialIsValid={true}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        placeholder="Description"
        validators={[VALIDATOR_MINLENGTH(4)]}
        errorText="Description should be more than 4 letters."
        inputChangeCallback={inputChangeCallback}
        initialValue={props.place.description}
        initialIsValid={true}
      />
    </Form>
  )
}

export default UpdatePlaceForm
