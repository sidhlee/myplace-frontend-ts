import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'

const StyledInputSkeleton = styled.div`
  width: 100%;
  height: 2.5em;
  margin-bottom: 16px;
`

const InputSkeleton = () => {
  return (
    <StyledInputSkeleton>
      <Skeleton width="100%" height="100%" />
    </StyledInputSkeleton>
  )
}

export default InputSkeleton
