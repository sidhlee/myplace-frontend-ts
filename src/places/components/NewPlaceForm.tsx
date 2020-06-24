import React from 'react'
import styled from 'styled-components'

import Input from '../../shared/components/formElements/Input'

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
        validators={[]}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        placeholder="Description"
        validators={[]}
      />
      <Input
        id="address"
        element="input"
        type="text"
        label="Address"
        placeholder="Address (example: Central Park, NY)"
        validators={[]}
      />
    </StyledNewPlaceForm>
  )
}

export default NewPlaceForm
