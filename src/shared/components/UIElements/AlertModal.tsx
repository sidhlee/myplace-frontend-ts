import styled from 'styled-components'
import Modal from './Modal'

const AlertModal = styled(Modal)`
  max-width: 30rem;
  header {
    padding: 1em;
    h2 {
      font-size: 1.4rem;
      font-weight: bold;
    }
  }
  .modal__content {
    font-size: 1.2rem;
    padding: 1em;
  }
  .modal__footer {
    text-align: right;
    margin: 0 0.5em 0.5em;
  }
`

export default AlertModal
