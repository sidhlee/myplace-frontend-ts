import React, { useContext } from 'react'
import styled from 'styled-components'

import { Place } from '../../shared/models/types'

import PlaceItem from './PlaceItem'
import FormPage from '../../shared/components/formElements/FormPage'
import Button from '../../shared/components/UIElements/Button'
import PlaceItemSkeleton from './PlaceItemSkeleton'
import { AuthContext } from '../../shared/context/AuthContext'
import { useParams } from 'react-router-dom'

const StyledPlaceList = styled.ul`
  list-style: none;
  width: calc(100% - 4px);
  max-width: 36rem;
  margin: 0 auto;
`

type PlaceListProps = {
  places: Place[] | null
  updateLoadedPlaces: (placeId: string) => void
}

const PlaceList: React.FC<PlaceListProps> = (props) => {
  const auth = useContext(AuthContext)
  const { userId } = useParams()
  if (!props.places) {
    return (
      <StyledPlaceList>
        {[...Array(2)].map((skeleton, i) => (
          <PlaceItemSkeleton key={i} />
        ))}
      </StyledPlaceList>
    )
  }
  if (props.places.length === 0) {
    return (
      <FormPage
        header={
          <header>
            <h2 className="center" style={{ fontSize: '1.4rem' }}>
              No places found.{' '}
            </h2>
            {userId === auth.userId && <p>Create a new place!</p>}
          </header>
        }
      >
        {userId === auth.userId && (
          <div className="control">
            <Button to="/places/new" large>
              CREATE
            </Button>
          </div>
        )}
      </FormPage>
    )
  }
  return (
    <StyledPlaceList>
      {props.places.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          title={place.title}
          address={place.address}
          description={place.description}
          image={place.image}
          location={place.location}
          creator={place.creator}
          handleConfirmDelete={props.updateLoadedPlaces}
        />
      ))}
    </StyledPlaceList>
  )
}

export default PlaceList
