import React, { ReactChild, ReactChildren } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

const StyledModal = styled.div`
  position: fixed;
  z-index: var(--z-modal);
  top: 20vh;
  left: 10%;
  width: 80%;
  background: white;
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
  header {
  }
  .modal__content {
    padding: 1rem;
  }

  /* These transition classes are attached to the StyledModal itself (not to its children)*/
  &.modal-enter {
    transform: translateY(-10rem);
    opacity: 0;
  }
  &.modal-enter-active {
    transition: all 200ms;
    transform: translateY(0);
    opacity: 1;
  }
  &.modal-exit {
    transform: translateY(0);
    opacity: 1;
  }
  &.modal-exit-active {
    transition: all 200ms;
    transform: translateY(-10rem);
    opacity: 0;
  }
`;

type ModalProps = {
  show: boolean;
  children: ReactChild | ReactChildren;
  header?: ReactChild | ReactChildren;
  footer?: ReactChild | ReactChildren;
};

const Modal = (props: ModalProps) => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="modal"
      mountOnEnter
      unmountOnExit
    >
      <StyledModal>
        <header>
          <h2>{props.header}</h2>
        </header>
        <form className="modal__content">{props.children}</form>
        <footer>{props.footer}</footer>
      </StyledModal>
    </CSSTransition>
  );

  return createPortal(content, document.getElementById('modal-hook')!);
};

export default Modal;
