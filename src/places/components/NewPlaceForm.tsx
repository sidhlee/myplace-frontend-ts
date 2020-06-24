import React from 'react'
import styled from 'styled-components'

import Input from '../../shared/components/formElements/Input'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/utils/validator'

const StyledNewPlaceForm = styled.form`
  width: 100%;
`

type NewPlaceFormProps = {}

const NewPlaceForm = (props: NewPlaceFormProps) => {
  return (
    <StyledNewPlaceForm>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        placeholder="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        placeholder="Description"
        validators={[VALIDATOR_MINLENGTH(4)]}
        errorText="Description should be more than 4 letters."
      />
      <Input
        id="address"
        element="input"
        type="text"
        label="Address"
        placeholder="Address (example: Central Park, NY)"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
      />
    </StyledNewPlaceForm>
  )
}

export default NewPlaceForm
