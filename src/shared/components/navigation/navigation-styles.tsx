import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'

const expandingHoverCss = css`
  &::before {
    content: '';
    position: absolute;
    /* MUST set the bottom separately otherwise left & right border will show*/
    border-bottom-width: 4px;
    border-bottom-style: solid;
    border-color: var(--cl-primary);

    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    width: 0;
    transition: width 0.2s ease;
  }
  &:hover::before {
    width: 100%;
  }
  &.active::before {
    width: 100%;
  }
`

export const StyledNavItem = styled('li')<{ circle: boolean }>`
  --size: calc(var(--main-header_height) * 0.8);
  height: var(--size);
  width: var(--size);
  display: block;
  justify-content: center;
  align-items: center;
  a,
  button {
    --size: calc(var(--main-header-height) * 0.66);
    width: ${(props) => (props.circle ? 'var(--size)' : 'auto')};
    height: var(--size);
    background-color: ${(props) =>
      props.circle ? 'var(--cl-border-color)' : 'transparent'};
    color: ${(props) =>
      props.circle ? 'var(--text-inverse)' : 'var(--text-main)'};
    border-radius: ${(props) => (props.circle ? '50%' : 0)};
    margin: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding: 0.25em;
    white-space: nowrap;

    /* expanding border-bottom on hover */
    position: relative;
    ${(props) => (props.circle ? null : expandingHoverCss)}
    &:hover {
      color: var(--cl-primary);
    }

    svg {
      --size: 30px;
      fill: var(--text-main);
      height: var(--size);
      width: var(--size);
    }
    &.active svg {
      fill: var(--cl-primary);
    }
  }
`

export const HomeButton = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5em;
  &:hover,
  &:active {
    background: var(--text-accent);
  }
`

export const NavItem = styled('li')`
  --size: calc(var(--main-header_height) * 0.8);
  height: var(--size);
  width: var(--size);
  display: block;
  justify-content: center;
  align-items: center;
`

export const NavIcon = styled('button')`
  --size: calc(var(--main-header_height) * 0.66);
  width: var(--size);
  height: var(--size);
  background-color: var(--cl-border-color);
  border-radius: 50%;
  margin: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  svg {
    --size: 20px;
    fill: var(--text-main);
    height: var(--size);
    width: var(--size);
  }

  transition: filter var(--transition-duration);
  &:hover {
    filter: brightness(1.2);
  }
`
