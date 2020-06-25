import React, { ReactChild, ReactChildren } from 'react'
import styled from 'styled-components'

const StyledFormPage = styled.div`
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
  header {
    padding: 20px 0;
    color: var(--text-main);
    margin-bottom: 0.5rem;
    h2 {
      font-size: 2.5rem;
    }
    p {
      font-size: 1.3rem;
      color: var(--text-secondary);
    }
  }
`

type FormPageProps = {
  className?: string
  children: ReactChild | ReactChildren
  header: ReactChild
}

const FormPage = (props: FormPageProps) => {
  return (
    <StyledFormPage className={props.className}>
      {props.header}
      {props.children}
    </StyledFormPage>
  )
}

export default FormPage