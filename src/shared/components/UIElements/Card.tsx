import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  background: var(--cl-white);
  border: var(--border);
  border-radius: var(--border-radius);
`;
const Card: React.FC = (props) => {
  return <StyledCard>{props.children}</StyledCard>;
};

export default Card;
