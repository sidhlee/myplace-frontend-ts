import { StyledUserItem } from './UserItem'
import Card from '../../shared/components/UIElements/Card'
import Skeleton from 'react-loading-skeleton'

const UserItemSkeleton = () => {
  return (
    <StyledUserItem>
      <Card>
        <div className="user-item__link">
          <div className="user-item__image">
            <Skeleton circle height={60} width={60} />
          </div>
          <div className="user-item__info">
            <h2>
              <Skeleton width={'50%'} />
            </h2>
            <h3>
              <Skeleton width={'6em'} />
            </h3>
          </div>
        </div>
      </Card>
    </StyledUserItem>
  )
}

export default UserItemSkeleton
