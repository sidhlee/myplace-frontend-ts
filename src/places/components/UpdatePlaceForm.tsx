import React, { FormEvent, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { useForm } from '../../shared/hooks/useForm'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/utils/validator'
import { Place } from '../../shared/models/types'
import { useRequest } from '../../shared/hooks/useRequest'
import { AuthContext } from '../../shared/context/AuthContext'

import Form from '../../shared/components/formElements/Form'
import Button from '../../shared/components/UIElements/Button'
import Input from '../../shared/components/formElements/Input'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

type UpdatePlaceBody = Pick<Place, 'title' | 'description'>

type UpdatePlaceFormProps = {
  place: Place
}

const UpdatePlaceForm = (props: UpdatePlaceFormProps) => {
  const { sendRequest, isLoading, error, clearError } = useRequest()
  const history = useHistory()
  const { placeId } = useParams<{ placeId: string }>()
  const { userId, token } = useContext(AuthContext)
  const [formState, inputChangeCallback] = useForm(
    {
      title: {
        value: props.place.title,
        isValid: true,
      },
      description: {
        value: props.place.description,
        isValid: true,
      },
    },
    true
  )

  const handleUpdateFormSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/places/${placeId}`
      await sendRequest<undefined, UpdatePlaceBody>(
        url,
        'PATCH',
        {
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        },
        { Authorization: `Bearer ${token}` }
      )

      history.push(`/${userId}/places`)
    } catch (err) {}
  }
  return (
    <React.Fragment>
      <ErrorModal errorText={error} clearModal={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <Form
        buttons={
          <>
            <Button type="button" onClick={() => history.goBack()} large>
              CANCEL
            </Button>
            <Button type="submit" disabled={!formState.isValid} primary large>
              UPDATE
            </Button>
          </>
        }
        onSubmit={handleUpdateFormSubmit}
      >
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          placeholder="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          inputChangeCallback={inputChangeCallback}
          // All input & output data should be synchronized with formState
          initialValue={formState.inputs.title.value}
          initialIsValid={formState.inputs.title.isValid}
          showErrorMessage={formState.showErrorMessage}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          placeholder="Description"
          validators={[VALIDATOR_MINLENGTH(4)]}
          errorText="Description should be more than 4 letters."
          inputChangeCallback={inputChangeCallback}
          initialValue={formState.inputs.description.value}
          initialIsValid={formState.inputs.description.isValid}
          showErrorMessage={formState.showErrorMessage}
        />
      </Form>
    </React.Fragment>
  )
}

export default UpdatePlaceForm
