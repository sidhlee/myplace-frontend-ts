import React from 'react';
import styled from 'styled-components';

const StyledUserItem = styled.li``;

type UserItemProps = {
  image: string;
  name: string;
  placeCount: number;
};

const UserItem: React.FC<UserItemProps> = (props) => {
  return (
    <StyledUserItem>
      <div className="user-item__content">
        <div className="user-image">
          <img src={props.image} alt={props.name} />
        </div>
        <div className="user-item__info">
          <h2>{props.name}</h2>
          <h3>
            {props.placeCount} {props.placeCount === 1 ? 'place' : 'places'}
          </h3>
        </div>
      </div>
    </StyledUserItem>
  );
};

export default UserItem;
