import React, { FormEvent, useReducer } from 'react'
import styled, { css } from 'styled-components'

import { Validator } from '../../models/types'

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
}
type Action = { type: 'CHANGE'; value: string }

const inputReducer = (state: InputState, action: Action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.value,
        isValid: true,
      }
    default:
      return state
  }
}

const Input = (props: InputProps) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false,
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    dispatch({ type: 'CHANGE', value: e.target.value })
  }
  const handleInputBlur = () => {}

  let element
  switch (props.element) {
    case 'textarea':
      element = (
        <textarea
          id={props.id}
          placeholder={props.placeholder}
          onChange={handleInputChange}
          value={inputState.value}
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
          onChange={handleInputChange}
          value={inputState.value}
          placeholder={props.placeholder}
          aria-required
          aria-label={props.label}
        />
      )
  }

  return <StyledInput invalid={!inputState.isValid}>{element}</StyledInput>
}

export default Input
