import React, { ReactNode } from 'react'
import styled from 'styled-components'

export const StyledForm = styled.form`
  width: 100%;
  input,
  textarea {
    margin-bottom: 1em;
  }
  .form-actions {
    text-align: right;
    display: flex;
    flex-wrap: wrap;
    button {
      flex: 1 1 auto;
    }
  }
`

type FormProps = {
  className?: string
  children: ReactNode
  buttons: ReactNode
  onSubmit?: (e: React.FormEvent) => void
}

const Form = (props: FormProps) => {
  return (
    <StyledForm className={props.className} onSubmit={props.onSubmit}>
      {props.children}
      <div className="form-actions">{props.buttons}</div>
    </StyledForm>
  )
}

export default Form
