import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'

const StyledInputSkeleton = styled.div`
  display: inline-block;
  width: 10rem;
  height: 2.5rem;
`

const ButtonSkeleton = () => {
  return (
    <StyledInputSkeleton>
      <Skeleton width="100%" height="100%" />
    </StyledInputSkeleton>
  )
}

export default ButtonSkeleton
