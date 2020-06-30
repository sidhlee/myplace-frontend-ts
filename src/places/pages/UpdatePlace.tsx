import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Place } from '../../shared/models/types'

import FormPage from '../../shared/components/formElements/FormPage'
import UpdatePlaceForm from '../components/UpdatePlaceForm'
import { useParams } from 'react-router-dom'
import { useRequest } from '../../shared/hooks/useRequest'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import UpdatePlaceSkeleton from '../components/UpdatePlaceSkeleton'

export const StyledImageWrapper = styled.div`
  width: 100%;
  height: 16rem;
  margin-bottom: 0.5em;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

type UpdatePlaceProps = {}

const UpdatePlace = (props: UpdatePlaceProps) => {
  const [loadedPlace, setLoadedPlace] = useState<Place | null>(null)
  const { placeId } = useParams()
  const { sendRequest, error, clearError } = useRequest()

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const url = `${process.env.REACT_APP_SERVER_URL}/api/places/${placeId}`
        const responseData = await sendRequest<{ place: Place }>(url)
        if (responseData) {
          setLoadedPlace(responseData.place)
        }
      } catch (err) {}
    }
    fetchPlace()
  }, [sendRequest, placeId])

  const header = (
    <header>
      <h2>Edit Place</h2>
      <p>Update your place information.</p>
    </header>
  )
  return (
    <React.Fragment>
      <ErrorModal errorText={error} clearModal={clearError} />
      <FormPage header={header}>
        {loadedPlace ? (
          <>
            <StyledImageWrapper>
              <img
                src={`${process.env.REACT_APP_ASSETS_URL}/${loadedPlace.image}`}
                alt={loadedPlace.title}
              />
            </StyledImageWrapper>
            <UpdatePlaceForm place={loadedPlace as Place} />
          </>
        ) : (
          <UpdatePlaceSkeleton />
        )}
      </FormPage>
    </React.Fragment>
  )
}

export default UpdatePlace
