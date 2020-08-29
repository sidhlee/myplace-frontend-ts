import React, { FormEvent, useContext, useState, useEffect } from 'react'

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
import Checkbox from '../../shared/components/formElements/Checkbox'

type NewPlaceBody = {
  title: string
  description: string
  address: string
  creator: string
}

type NewPlaceResponse = {}

type NewPlaceFormProps = {}

const NewPlaceForm = (props: NewPlaceFormProps) => {
  const { userId, token } = useContext(AuthContext)
  const [uploadImage, setUploadImage] = useState(true)
  const { sendRequest, isLoading, error, clearError } = useRequest()
  const [
    formState,
    inputChangeCallback,
    setFormStateCallback,
    dispatch,
  ] = useForm(
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

  const { image } = formState.inputs
  useEffect(() => {
    if (image.value) {
      setUploadImage(true)
    }
  }, [image.value])

  const handleNewPlaceSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!formState.isValid) {
      dispatch({ type: 'SHOW_ERROR_MESSAGE' })
      return
    }
    try {
      if (userId) {
        const formData = new FormData()
        formData.append('title', formState.inputs.title.value)
        formData.append('description', formState.inputs.description.value)
        formData.append('address', formState.inputs.address.value)
        formData.append('image', formState.inputs.image.value)
        // now the server gets creator(userId) from token
        await sendRequest<NewPlaceResponse, FormData>(
          `${process.env.REACT_APP_SERVER_URL}/api/places`,
          'POST',
          formData,
          { Authorization: `Bearer ${token}` }
        )
        // if an error occurs during request, below line will not run

        // redirect user on success/fail
        history.push('/')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { title, description, address } = formState.inputs
    let isFormValid = title.isValid && description.isValid && address.isValid

    if (e.target.checked) {
      // if all inputs except image are valid by the time checkbox is checked,
      // form is valid
      setUploadImage(false)
      setFormStateCallback(
        {
          ...formState.inputs,
          image: {
            value: '',
            isValid: true,
          },
        },
        isFormValid
      )
    } else {
      // unchecked
      setUploadImage(true)
      setFormStateCallback(
        {
          ...formState.inputs,
          image: {
            value: '',
            isValid: false,
          },
        },
        false
      )
    }
  }

  const handleSubmitBlur = () => {
    dispatch({ type: 'CLEAR_ERROR_MESSAGE' })
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
            <Button
              onBlur={handleSubmitBlur}
              type="submit"
              disabled={false}
              primary
              large
            >
              ADD PLACE
            </Button>
          </>
        }
      >
        <ImageUpload
          id="image"
          inputChangeCallback={inputChangeCallback}
          errorText="Please select an image or check 'auto-generate' option"
          required={uploadImage}
          showErrorMessage={formState.showErrorMessage}
        />
        <Checkbox onChange={handleCheckboxChange} checked={!uploadImage} />
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          placeholder="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          inputChangeCallback={inputChangeCallback}
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
          showErrorMessage={formState.showErrorMessage}
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
          showErrorMessage={formState.showErrorMessage}
        />
      </Form>
    </React.Fragment>
  )
}

export default NewPlaceForm
