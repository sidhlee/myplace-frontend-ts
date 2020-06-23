import React from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';

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
  const content = <StyledBackdrop onClick={props.onClick}></StyledBackdrop>;
  return createPortal(content, document.getElementById('backdrop-hook')!);
};

export default Backdrop;
