import React, { ReactNode, FormEvent } from 'react'
import styled from 'styled-components'
import { createPortal } from 'react-dom'
import { useTransition, animated } from 'react-spring'

import { config } from 'styles'
import Backdrop from './Backdrop'

const StyledModal = styled(animated.div)`
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
`

type ModalProps = {
  show: boolean
  className?: string
  header?: ReactNode
  footer?: ReactNode
  headerClass?: string
  contentClass?: string
  footerClass?: string
  clearModal?: () => void
  onSubmit?: (e: FormEvent) => void
}

const Modal: React.FC<ModalProps> = (props) => {
  const transition = useTransition(props.show, null, {
    from: {
      transform: `translateY(-10rem) translateX(-50%)`,
      opacity: 0,
    },
    enter: {
      transform: `translateY(0) translateX(-50%)`,
      opacity: 1,
    },
    leave: {
      transform: `translateY(-10rem) translateX(-50%)`,
      opacity: 0,
    },
    config: config.smart,
  })

  const content = (
    <>
      <Backdrop show={props.show} onClick={props.clearModal} />
      {transition.map(
        ({ item: show, key, props: transition }) =>
          show && (
            <StyledModal
              key={key}
              style={transition}
              className={props.className}
            >
              <header className={`modal__header ${props.headerClass}`}>
                <h2>{props.header}</h2>
              </header>
              <form
                onSubmit={
                  props.onSubmit ||
                  ((e) => {
                    e.preventDefault()
                  })
                }
              >
                <div className={`modal__content ${props.contentClass}`}>
                  {props.children}
                </div>
              </form>
              <footer className={`modal__footer ${props.footerClass}`}>
                {props.footer}
              </footer>
            </StyledModal>
          )
      )}
    </>
  )

  return createPortal(content, document.getElementById('modal-hook')!)
}

export default Modal
