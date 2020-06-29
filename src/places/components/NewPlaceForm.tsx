import React, { FormEvent, useContext } from 'react'

import Form from '../../shared/components/formElements/Form'
import Input from '../../shared/components/formElements/Input'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/utils/validator'
import Button from '../../shared/components/UIElements/Button'

import { useForm } from '../../shared/hooks/useForm'
import { useRequest } from '../../shared/hooks/useRequest'
import { AuthContext } from '../../shared/context/AuthContext'
import { useHistory } from 'react-router-dom'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ImageUpload from '../../shared/components/formElements/ImageUpload'

type NewPlaceBody = {
  title: string
  description: string
  address: string
  creator: string
}

type NewPlaceResponse = {}

type NewPlaceFormProps = {}

const NewPlaceForm = (props: NewPlaceFormProps) => {
  const { userId } = useContext(AuthContext)
  const { sendRequest, isLoading, error, clearError } = useRequest()
  const [formState, inputChangeCallback] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  )
  const history = useHistory()

  const handleNewPlaceSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (userId) {
        const formData = new FormData()
        formData.append('title', formState.inputs.title.value)
        formData.append('description', formState.inputs.description.value)
        formData.append('address', formState.inputs.address.value)
        formData.append('image', formState.inputs.image.value)
        formData.append('creator', userId)
        await sendRequest<NewPlaceResponse, FormData>(
          `${process.env.REACT_APP_SERVER_URL}/api/places`,
          'POST',
          formData
        )
        // if an error occurs during request, below line will not run

        // redirect user on success/fail
        history.push('/')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <React.Fragment>
      <ErrorModal errorText={error} clearModal={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <Form
        onSubmit={handleNewPlaceSubmit}
        buttons={
          <>
            <Button to="/" large>
              CANCEL
            </Button>
            <Button type="submit" disabled={!formState.isValid} primary large>
              ADD PLACE
            </Button>
          </>
        }
      >
        <ImageUpload
          id="image"
          inputChangeCallback={inputChangeCallback}
          errorText="Please select an image"
          required
        />
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          placeholder="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          inputChangeCallback={inputChangeCallback}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          placeholder="Description"
          validators={[VALIDATOR_MINLENGTH(4)]}
          errorText="Description should be more than 4 letters."
          inputChangeCallback={inputChangeCallback}
        />
        <Input
          id="address"
          element="input"
          type="text"
          label="Address"
          placeholder="Address (example: Central Park, NY)"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          inputChangeCallback={inputChangeCallback}
        />
      </Form>
    </React.Fragment>
  )
}

export default NewPlaceForm
