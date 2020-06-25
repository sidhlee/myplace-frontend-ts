import React, { useReducer, useCallback, FormEvent } from 'react'
import styled from 'styled-components'

import Input from '../../shared/components/formElements/Input'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/utils/validator'
import Button from '../../shared/components/UIElements/Button'

const StyledNewPlaceForm = styled.form`
  width: 100%;
  input,
  textarea {
    margin-bottom: 1em;
  }
  .form-actions {
    text-align: right;
  }
`
type FormStateInputId = 'title' | 'description' | 'address'

type FormStateInputs = {
  [inputId in FormStateInputId]: {
    value: string
    isValid: boolean
  }
}

type FormState = {
  inputs: FormStateInputs
  isValid: boolean
}

type Action = {
  type: 'INPUT_CHANGE'
  inputId: string
  value: string
  isValid: boolean
}

const formReducer = (state: FormState, action: Action) => {
  // assertion signature only works with function declaration (no arrow func)
  // https://github.com/microsoft/TypeScript/issues/34523
  function validateInput(
    input: string
    // TS will ensure that input is the type of:
    // keyof (FormStateInputId) typeof(FormStateInputs) state.inputs
    // in any block guarded by a call to the validateInput
    // if this function returns at all (otherwise an error is thrown)
    // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions

    // MORE on advanced types:
    // https://www.typescriptlang.org/docs/handbook/advanced-types.html#using-type-predicates
  ): asserts input is keyof typeof state.inputs {
    // input type validation inspired by:
    // https://stackoverflow.com/a/56569217/13036807
    if (!(input in state.inputs)) throw Error('invalid inputId')
  }

  switch (action.type) {
    case 'INPUT_CHANGE':
      let isFormValid = true
      for (const input in state.inputs) {
        validateInput(input)
        if (input === action.inputId) {
          isFormValid = isFormValid && action.isValid
        } else {
          // Without type validation(validateInput), TS will error out
          // because 'input' is of the type 'string'
          // (TS cannot know what property state.inputs will have in runtime)
          // and you cannot index 'FormStateInputs' type with 'string'
          // because 'FormStateInputs' has the index type of 'FormStateInputId'
          isFormValid = isFormValid && state.inputs[input].isValid

          /*
          // Alternatively you can typecast input with type assertion 
          // (shorter, but less safe)
          isFormValid = isFormValid && state.inputs[input as FormStateInputId].isValid
          */
        }
      }
      // update formState.inputs with 'INPUT_CHANGE' payload
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: isFormValid,
      }
    default:
      return state
  }
}

type NewPlaceFormProps = {}

const NewPlaceForm = (props: NewPlaceFormProps) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
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
    isValid: false,
  })

  const inputChangeCallback = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({ type: 'INPUT_CHANGE', inputId: id, value, isValid })
    },
    []
  )

  const handleNewPlaceSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(formState.inputs)
  }

  return (
    <StyledNewPlaceForm onSubmit={handleNewPlaceSubmit}>
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
      <div className="form-actions">
        <Button to="/" large>
          CANCEL
        </Button>
        <Button type="submit" disabled={!formState.isValid} primary large>
          ADD PLACE
        </Button>
      </div>
    </StyledNewPlaceForm>
  )
}

export default NewPlaceForm
