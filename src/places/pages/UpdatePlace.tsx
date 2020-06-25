import React from 'react'
import styled from 'styled-components'
import { Place } from '../../shared/models/types'

import FormPage from '../../shared/components/formElements/FormPage'
import UpdatePlaceForm from '../components/UpdatePlaceForm'
import { useParams } from 'react-router-dom'

const PLACES: Place[] = [
  {
    id: 'p1',
    title: 'Rainbow Cinema',
    description: 'A cozy movie theater near Harbourfront',
    address: 'Rainbow Cinema, Toronto',
    image: 'https://placem.at/places?w=800&random=1',
    location: {
      lat: 43.649584,
      lng: -79.372489,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'The Central',
    description: 'Now-defunct music & comedy club that I used to play at',
    address: 'The central, Bathurst & Bloor, Toronto',
    image: 'https://placem.at/places?w=800&random=2',
    location: {
      lat: 43.664416,
      lng: -79.412119,
    },
    creator: 'u2',
  },
]

const StyledImage = styled.img`
  width: 100%;
  height: 16rem;
  object-fit: cover;
  margin-bottom: 0.5em;
`

type UpdatePlaceProps = {}

const UpdatePlace = (props: UpdatePlaceProps) => {
  const { placeId } = useParams()
  const place = PLACES.find((p) => p.id === placeId)
  if (!place) {
    return (
      <div className="center">
        <h2>Cannot find the place!</h2>
      </div>
    )
  }

  const header = (
    <header>
      <h2>Edit Place</h2>
      <p>Update your place information.</p>
    </header>
  )
  return (
    <FormPage header={header}>
      <StyledImage src={place.image} alt={place.title} />
      <UpdatePlaceForm place={place} />
    </FormPage>
  )
}

export default UpdatePlace
