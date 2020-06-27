import React from 'react'
import { StyledUserItem } from './UserItem'
import Card from '../../shared/components/UIElements/Card'
import Skeleton from 'react-loading-skeleton'

const UserItemSkeleton = () => {
  return (
    <StyledUserItem>
      <Card>
        <a href="#">
          <div className="user-item__image">
            <Skeleton circle height={60} width={60} />
          </div>
          <div className="user-item__info">
            <h2>
              <Skeleton />
            </h2>
            <h3>
              <Skeleton />
            </h3>
          </div>
        </a>
      </Card>
    </StyledUserItem>
  )
}

export default UserItemSkeleton
