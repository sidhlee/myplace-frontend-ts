import React from 'react';
import styled from 'styled-components';

import { Place } from '../../shared/models/types';

import PlaceItem from './PlaceItem';

const StyledPlaceList = styled.ul`
  list-style: none;
  width: calc(100% - 4px);
  max-width: 36rem;
  margin: 0 auto;
`;

type PlaceListProps = {
  places: Place[];
};

const PlaceList: React.FC<PlaceListProps> = (props) => {
  return (
    <StyledPlaceList>
      {props.places.map((place) => (
        <PlaceItem
          key={place.id}
          title={place.title}
          address={place.address}
          description={place.description}
          image={place.image}
        />
      ))}
    </StyledPlaceList>
  );
};

export default PlaceList;
