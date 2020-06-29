import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Card from '../../shared/components/UIElements/Card'
import Avatar from '../../shared/components/UIElements/Avatar'

export const StyledUserItem = styled.li`
  margin-bottom: 2em;
  .user-item__link {
    padding: 1em;
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  .user-item__image {
    width: 4rem;
    height: 4rem;
    margin-right: 1rem;
  }

  .user-item__info {
    h2 {
      color: var(--cl-primary);
      font-size: 1.2rem;
    }
    h3 {
      font-weight: normal;
      font-size: 1rem;
    }
    h2,
    h3 {
      &:hover {
        text-decoration: underline;
      }
    }
  }
`

type UserItemProps = {
  id: string
  image: string
  name: string
  placeCount: number
}

const UserItem: React.FC<UserItemProps> = (props) => {
  return (
    <StyledUserItem>
      <Card>
        <Link className="user-item__link" to={`${props.id}/places`}>
          <div className="user-item__image">
            <Avatar
              src={`${process.env.REACT_APP_ASSETS_URL}/${props.image}`}
              alt={props.name}
            />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount} {props.placeCount === 1 ? 'place' : 'places'}
            </h3>
          </div>
        </Link>
      </Card>
    </StyledUserItem>
  )
}

export default UserItem
