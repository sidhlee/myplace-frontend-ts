import React from 'react';
import styled from 'styled-components';
import Card from '../../shared/components/UIElements/Card';

import { Place } from '../../shared/models/types';
import { bp } from '../../shared/styled/vars';

const StyledPlaceItem = styled.li`
  margin: 1em 0;
  .place-item__image {
    width: 100%;
    height: 12.5rem;
    @media (min-width: ${bp.desktop}) {
      height: 20rem;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .place-item__info {
    margin: 1em auto;
    text-align: center;
  }
  .place-item__actions {
    text-align: right;
  }
`;

type PlaceItemProps = Pick<
  Place,
  'title' | 'address' | 'description' | 'image'
>;

const PlaceItem = (props: PlaceItemProps & { key: string }) => {
  return (
    <StyledPlaceItem>
      <Card>
        <div className="place-item__image">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="place-item__info">
          <h2>{props.title}</h2>
          <h3>{props.address}</h3>
          <p>{props.description}</p>
        </div>
        <div className="place-item__actions">
          <button>VIEW ON MAP</button>
          <button>EDIT</button>
          <button>DELETE</button>
        </div>
      </Card>
    </StyledPlaceItem>
  );
};

export default PlaceItem;
