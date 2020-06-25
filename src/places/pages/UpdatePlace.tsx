import React from 'react'

import FormPage from '../../shared/components/formElements/FormPage'
import UpdatePlaceForm from '../components/UpdatePlaceForm'

type UpdatePlaceProps = {}

const UpdatePlace = (props: UpdatePlaceProps) => {
  const header = (
    <header>
      <h2>Edit Place</h2>
      <p>Update your place information.</p>
    </header>
  )
  return (
    <FormPage header={header}>
      <UpdatePlaceForm />
    </FormPage>
  )
}

export default UpdatePlace
