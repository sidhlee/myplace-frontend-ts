import { StyledPlaceItem } from './PlaceItem'
import Card from '../../shared/components/UIElements/Card'
import Skeleton from 'react-loading-skeleton'

const PlaceItemSkeleton = () => {
  return (
    <StyledPlaceItem>
      <Card>
        <div className="place-item__image">
          <Skeleton width="100%" height="100%" />
        </div>
        <div className="place-item__info">
          <h2>
            <Skeleton width="5rem" />
          </h2>
          <h3>
            <Skeleton width="10rem" />
          </h3>
          <p>
            <Skeleton width="50%" />
          </p>
        </div>
        <div className="place-item__actions">
          <Skeleton width="6rem" height="1.5rem" />
        </div>
      </Card>
    </StyledPlaceItem>
  )
}

export default PlaceItemSkeleton
