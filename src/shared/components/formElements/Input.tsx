import React, { useReducer } from 'react'
import styled, { css } from 'styled-components'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import { validate, Validator } from '../../utils/validator'

const invalidCss = css`
  border-color: var(--cl-danger);
`
const StyledInput = styled.div<{ invalid: boolean }>`
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

const DangerTippy = styled(Tippy)`
  background: var(--cl-danger-alpha);
  &[data-placement^='top'] > .tippy-arrow::before {
    border-top-color: var(--cl-danger);
  }
  &[data-placement^='bottom'] > .tippy-arrow::before {
    border-bottom-color: var(--cl-danger);
  }
  &[data-placement^='left'] > .tippy-arrow::before {
    border-left-color: var(--cl-danger);
  }
  &[data-placement^='right'] > .tippy-arrow::before {
    border-right-color: var(--cl-danger);
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

  const invalid = !inputState.isValid && inputState.isTouched
  return (
    <DangerTippy
      content={props.errorText}
      visible={invalid}
      placement="left"
      popperOptions={{
        modifiers: [
          { name: 'flip', options: { fallbackPlacements: ['top-end'] } },
        ],
      }}
      maxWidth={220}
    >
      <StyledInput invalid={invalid}>{element}</StyledInput>
    </DangerTippy>
  )
}

export default Input
