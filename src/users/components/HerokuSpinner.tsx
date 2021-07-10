import React from 'react'
import styled from 'styled-components'
import Modal from '../../shared/components/UIElements/Modal'

const StyledHerokuSpinner = styled('div')`
  padding: 2rem 1em;
  text-align: center;
`

type HerokuSpinnerProps = {
  isLoading: boolean
}

const HerokuSpinner: React.FC<HerokuSpinnerProps> = ({ isLoading }) => {
  return (
    <Modal show={isLoading} header={'⏳ Loading...'}>
      <StyledHerokuSpinner>
        <p>Cloud server is spinning up from sleep..</p>
        <p>
          I can keep it running 24/7 if I pay them{' '}
          <span role="img" aria-label="money">
            💰😛
          </span>
        </p>
      </StyledHerokuSpinner>
    </Modal>
  )
}

export default HerokuSpinner
