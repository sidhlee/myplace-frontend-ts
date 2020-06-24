import React from 'react'
import styled from 'styled-components'
import NewPlaceForm from '../components/NewPlaceForm'

const StyledNewPlace = styled.form`
  width: 90%;
  max-width: 350px;
  margin: 0 auto;
  .new-place__header {
    padding: 20px 0;
    color: var(--text-main);
    h2 {
      font-size: 2.5rem;
    }
    p {
      font-size: 1.3rem;
      color: var(--text-secondary);
    }
  }
`
const NewPlace: React.FC = (props) => {
  return (
    <StyledNewPlace>
      <div className="new-place__header">
        <h2>Add a New Place</h2>
        <p>Share your favorite places with friends!</p>
      </div>
      <div className="new-place__form">
        <NewPlaceForm />
      </div>
    </StyledNewPlace>
  )
}

export default NewPlace
