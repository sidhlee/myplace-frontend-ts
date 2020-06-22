import React from 'react';
import styled from 'styled-components';

const StyledBackdrop = styled.div`
  position: fixed;
  z-index: var(--z-backdrop);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--cl-backdrop);
`;
const Backdrop: React.FC<{ onClick: () => void }> = (props) => {
  return <StyledBackdrop onClick={props.onClick}></StyledBackdrop>;
};

export default Backdrop;
