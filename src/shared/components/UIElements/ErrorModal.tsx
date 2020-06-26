import React from 'react'
import Button from './Button'
import AlertModal from './AlertModal'

type ErrorModalProps = {
  errorText: string | null
  clearModal: () => void
}

const ErrorModal = (props: ErrorModalProps) => {
  return (
    <AlertModal
      show={!!props.errorText}
      clearModal={props.clearModal}
      header="Error"
      footer={
        <Button onClick={props.clearModal} large>
          Okay
        </Button>
      }
    >
      <p>{props.errorText}</p>
    </AlertModal>
  )
}

export default ErrorModal
