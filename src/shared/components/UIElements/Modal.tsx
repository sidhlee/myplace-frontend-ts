import React, { ReactChild, ReactChildren, useRef } from 'react'
import styled from 'styled-components'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'

const StyledModal = styled.div`
  position: fixed;
  z-index: var(--z-modal);
  top: 20vh;
  left: 0;
  width: 100%;
  max-width: 36rem;
  margin-left: 50%;
  transform: translateX(-50%);
  background: white;
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
  header {
    padding: 1em 0.5em;
    background: var(--cl-primary);
    color: var(--cl-white);
    h2 {
      font-weight: normal;
      font-size: 1.2rem;
    }
  }
  .modal__content {
  }

  /* These transition classes are attached to the StyledModal itself (not to its children)*/
  &.modal-enter {
    /*
    This will override the existing transform value 
    Therefore, you also need to specify horizontal transform here. 
    */
    transform: translateY(-10rem) translateX(-50%);
    opacity: 0;
  }
  &.modal-enter-active {
    transition: all 200ms;
    transform: translateY(0) translateX(-50%);
    opacity: 1;
  }
  &.modal-exit {
    transform: translateY(0) translateX(-50%);
    opacity: 1;
  }
  &.modal-exit-active {
    transition: all 200ms;
    transform: translateY(-10rem) translateX(-50%);
    opacity: 0;
  }
`

type ModalProps = {
  show: boolean
  className?: string
  children: ReactChild | ReactChildren
  header?: ReactChild | ReactChildren
  footer?: ReactChild | ReactChildren
  headerClass?: string
  contentClass?: string
  footerClass?: string
}

const Modal = (props: ModalProps) => {
  const nodeRef = useRef(null)

  const content = (
    <CSSTransition
      // nodeRef for deprecated findDOMNode
      // https://github.com/reactjs/react-transition-group/blob/1fd4a65ac45edd2aea3dec18eeb8b9c07c7eb93f/CHANGELOG.md#440-2020-05-05
      nodeRef={nodeRef}
      in={props.show}
      timeout={200}
      classNames="modal"
      mountOnEnter
      unmountOnExit
    >
      <StyledModal className={props.className} ref={nodeRef}>
        <header className={`modal__header ${props.headerClass}`}>
          <h2>{props.header}</h2>
        </header>
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <div className={`modal__content ${props.contentClass}`}>
            {props.children}
          </div>
        </form>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </StyledModal>
    </CSSTransition>
  )

  return createPortal(content, document.getElementById('modal-hook')!)
}

export default Modal
