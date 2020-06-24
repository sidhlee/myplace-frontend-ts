import React, { useReducer } from 'react'
import styled, { css } from 'styled-components'

import { validate, Validator } from '../../utils/validator'

const invalidCss = css`
  border-color: var(--cl-danger);
`

const StyledInput = styled.div<{ invalid: boolean }>`
  margin-bottom: 0.625em;
  input,
  textarea {
    display: block;
    width: 100%;
    font: inherit;
    font-size: 1.125rem;
    padding: 8px 10px;
    border: var(--border);
    border-radius: var(--border-radius);
    ${(props) => (props.invalid ? invalidCss : null)}
  }
  textarea {
    resize: none;
  }
`

type InputProps = {
  id: string
  element: 'input' | 'textarea'
  type?: 'text'
  label: string
  placeholder?: string
  rows?: number
  validators: Validator[]
  errorText?: string
}

type InputState = {
  value: string
  isValid: boolean
  validators: Validator[]
  isTouched: boolean
}
type Action =
  | { type: 'CHANGE'; value: string; validators: Validator[] }
  | { type: 'TOUCH' }

const inputReducer = (state: InputState, action: Action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      }
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      }
    default:
      return state
  }
}

const Input = (props: InputProps) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false,
    validators: [],
    isTouched: false,
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    dispatch({
      type: 'CHANGE',
      value: e.target.value,
      validators: props.validators,
    })
  }
  const handleInputBlur = () => {
    dispatch({
      type: 'TOUCH',
    })
  }

  let element
  switch (props.element) {
    case 'textarea':
      element = (
        <textarea
          id={props.id}
          placeholder={props.placeholder}
          value={inputState.value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          rows={props.rows || 3}
          aria-required
          aria-label={props.label}
        ></textarea>
      )
      break
    default:
      element = (
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          value={inputState.value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          aria-required
          aria-label={props.label}
        />
      )
  }

  return (
    <StyledInput invalid={!inputState.isValid && inputState.isTouched}>
      {element}
    </StyledInput>
  )
}

export default Input
