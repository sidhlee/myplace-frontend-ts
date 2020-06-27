import React, { useContext } from 'react'
import styled from 'styled-components'

import { Place } from '../../shared/models/types'

import PlaceItem from './PlaceItem'
import FormPage from '../../shared/components/formElements/FormPage'
import Button from '../../shared/components/UIElements/Button'
import PlaceItemSkeleton from './PlaceItemSkeleton'
import { AuthContext } from '../../shared/context/AuthContext'

const StyledPlaceList = styled.ul`
  list-style: none;
  width: calc(100% - 4px);
  max-width: 36rem;
  margin: 0 auto;
`

type PlaceListProps = {
  places: Place[] | null
}

const PlaceList: React.FC<PlaceListProps> = (props) => {
  const auth = useContext(AuthContext)

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
            {auth.isLoggedIn && <p>Create a new place!</p>}
          </header>
        }
      >
        {auth.isLoggedIn && (
          <Button to="/places/new" large>
            CREATE
          </Button>
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
        />
      ))}
    </StyledPlaceList>
  )
}

export default PlaceList
