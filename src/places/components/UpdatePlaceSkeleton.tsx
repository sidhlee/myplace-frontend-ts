import React from 'react'
import Skeleton from 'react-loading-skeleton'

import { StyledImageWrapper } from '../pages/UpdatePlace'
import { StyledForm } from '../../shared/components/formElements/Form'
import InputSkeleton from '../../shared/components/formElements/InputSkeleton'
import ButtonSkeleton from '../../shared/components/UIElements/ButtonSkeleton'

const UpdatePlaceSkeleton = () => {
  return (
    <div className="skeleton">
      <StyledImageWrapper>
        <Skeleton width="100%" height="100%" />
      </StyledImageWrapper>
      <StyledForm>
        <InputSkeleton />
        <InputSkeleton />
        <div className="form-actions">
          <ButtonSkeleton />
        </div>
      </StyledForm>
    </div>
  )
}

export default UpdatePlaceSkeleton
