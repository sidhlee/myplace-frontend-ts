import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  padding: 1em;
  background: var(--cl-white);
  border: var(--border);
  border-radius: 6px;
`;
const Card: React.FC = (props) => {
  return <StyledCard>{props.children}</StyledCard>;
};

export default Card;
