import { ReactNode } from 'react'
import styled from 'styled-components'

const StyledFormPage = styled.div`
  width: 95%;
  max-width: 350px;
  margin: 0 auto;
  header {
    padding: 20px 0;
    color: var(--text-main);
    margin-bottom: 0.5rem;
    text-align: center;
    h2 {
      font-size: 2.5rem;
    }
    p {
      font-size: 1.3rem;
      color: var(--text-secondary);
    }
  }
  .control {
    text-align: center;
  }
`

type FormPageProps = {
  className?: string
  children: ReactNode
  header: ReactNode
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
