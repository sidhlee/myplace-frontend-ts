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
  margin-left: 5px;
  button {
    border: none;
  }
  a,
  button {
    --size: calc(var(--main-header-height) * 0.66);
    width: ${(props) => (props.circle ? 'var(--size)' : 'auto')};
    height: var(--size);
    background-color: ${(props) =>
      props.circle ? 'var(--cl-icon-bg)' : 'transparent'};
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

    transition: filter 0.3s ease;
    &:hover {
      transition: none;
      color: var(--cl-primary);
      filter: ${(props) => (props.circle ? 'brightness(0.9)' : 'none')};
    }

    svg {
      --size: 20px;
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

export const DropdownBackdrop = styled('div')`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: auto;
  background: rgba(0, 0, 0, 0.2);
  z-index: 100;
`

export const StyledDropdownMenu = styled('div')`
  position: absolute;
  min-width: 250px;
  height: auto;
  z-index: 1000;
  top: calc(var(--main-header-height) - 2px);
  right: 1em;
  background-color: var(--cl-navbar);
  padding: 0.5rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
`

export const StyledUser = styled('div')`
  display: flex;
  align-items: center;
  .user__avatar {
    --size: 60px;
    width: var(--size);
    height: var(--size);
  }
  .user__body {
    margin-left: 0.75em;
    h1 {
      margin: 0;
    }
    p {
      font-size: 0.9375rem;
      color: var(--text-secondary);
    }
  }
`

export const DropdownMenuItem = styled('div')`
  padding: 0.5em;
  border-radius: var(--border-radius);
  transition: background-color 0.15s ease-in-out;
  &:hover {
    background: var(--cl-item-hover);
  }

  button {
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    display: flex;
    align-items: center;
    font-size: 1rem;

    span {
      --size: 40px;
      width: var(--size);
      height: var(--size);
      border-radius: 50%;
      background-color: var(--fds-gray-25);
      display: grid;
      place-items: center;
      margin-right: 1em;

      svg {
        --svg-size: 18px;
        width: var(--svg-size);
        height: var(--svg-size);
        fill: var(--text-secondary);
      }
    }
  }
`
