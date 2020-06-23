import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/UIElements/Button';
import Modal from '../../shared/components/UIElements/Modal';

import { Place } from '../../shared/models/types';
import { bp } from '../../shared/styled/vars';
import Backdrop from '../../shared/components/UIElements/Backdrop';

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
    h2 {
      font-size: 1.2rem;
      color: var(--text-accent);
    }
    h3 {
      font-size: 1rem;
    }
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
  const [showMap, setShowMap] = useState(true);
  return (
    <React.Fragment>
      <Backdrop onClick={() => {}} />
      <Modal show={showMap}>
        <div className="map-container">
          <h2>MAP GOES HERE</h2>
        </div>
      </Modal>
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
            <Button>VIEW ON MAP</Button>
            <Button>EDIT</Button>
            <Button danger>DELETE</Button>
          </div>
        </Card>
      </StyledPlaceItem>
    </React.Fragment>
  );
};

export default PlaceItem;
