import styled from 'styled-components'

const StyledMainHeader = styled.div`
  width: 100%;
  height: var(--main-header-height);
  background: var(--cl-navbar);
  position: fixed;
  z-index: var(--z-navbar);
  top: 0;
  left: 0;

  .container {
    max-width: var(--app-max-width);
    margin: auto;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 1em;
    justify-content: space-between;
  }
`
const MainHeader: React.FC = (props) => {
  // To be able to extend the style,
  // you need to attach the passed className prop to a DOM element
  return (
    <StyledMainHeader {...props}>
      <div className="container">{props.children}</div>
    </StyledMainHeader>
  )
}

export default MainHeader
