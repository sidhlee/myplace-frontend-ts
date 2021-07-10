import styled from 'styled-components'
import { useTransition, animated } from 'react-spring'
import { createPortal } from 'react-dom'

const StyledBackdrop = styled(animated.div)`
  position: fixed;
  z-index: var(--z-backdrop);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--cl-backdrop);
`

type BackdropProps = {
  show: boolean
  onClick?: () => void
}
const Backdrop = (props: BackdropProps) => {
  const transition = useTransition(props.show, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const content = (
    <>
      {transition.map(
        ({ item: show, key, props: transition }) =>
          show && (
            <StyledBackdrop
              key={key}
              style={transition}
              onClick={props.onClick}
            ></StyledBackdrop>
          )
      )}
    </>
  )
  return createPortal(content, document.getElementById('backdrop-hook')!)
}

export default Backdrop
