import React, { FormEvent } from 'react'
import styled from 'styled-components'

import { Validator } from '../../models/types'

const StyledInput = styled.div`
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
}

const Input = (props: InputProps) => {
  const handleInputChange = () => {}
  const handleInputBlur = () => {}

  let element
  switch (props.element) {
    case 'textarea':
      element = (
        <textarea
          id={props.id}
          placeholder={props.placeholder}
          onChange={handleInputChange}
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
          placeholder={props.placeholder}
          aria-required
          aria-label={props.label}
        />
      )
  }

  return <StyledInput>{element}</StyledInput>
}

export default Input
