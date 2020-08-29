import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

type ButtonProps = {
  children: ReactNode
  // You need to mark className as optional in Props interface
  // https://styled-components.com/docs/api#caveat-with-classname
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  to?: string
  href?: string
  primary?: boolean
  success?: boolean
  danger?: boolean
  small?: boolean
  large?: boolean
  onClick?: () => void
  onBlur?: () => void
}

const Button = (props: ButtonProps) => {
  if (props.to) {
    return (
      <Link className={props.className} to={props.to}>
        {props.children}
      </Link>
    )
  }
  if (props.href) {
    return (
      <a className={props.className} href={props.href}>
        {props.children}
      </a>
    )
  }
  return (
    <button
      className={props.className}
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
      onBlur={props.onBlur}
    >
      {props.children}
    </button>
  )
}

const primaryCss = css`
  background: var(--cl-primary);
  border-color: var(--cl-primary);
  color: var(--cl-white);
  &:hover {
    background: var(--text-accent);
    border-color: var(--text-accent);
  }
`

const successCss = css`
  background: var(--cl-success-gradient);
  background-color: var(--cl-success);
  box-shadow: var(--box-shadow-success);
  border: 1px solid var(--cl-border-color-success);
  color: var(--cl-white);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  &:hover {
    background: var(--cl-success-gradient-hover);
  }
`
const dangerCss = css`
  background: var(--cl-danger);
  border-color: var(--cl-danger);
  color: var(--cl-white);
  &:hover {
    background: var(--cl-danger-hover);
    border-color: var(--cl-danger-hover);
  }
`

const largeCss = css`
  font-size: 1rem;
`

const disabledCss = css`
  cursor: not-allowed;
  filter: saturate(0.75) opacity(0.75);
`

export default styled(Button)`
  font: inherit;
  margin: 0.25em;
  font-weight: bold;
  font-size: 0.8rem;
  padding: 0.5em 1.5em;
  color: var(--text-secondary);
  background: var(--cl-btn-bg);
  border: var(--border);
  border-radius: 3px;
  &:hover {
    background: var(--cl-bg);
  }

  text-decoration: none;

  ${(props) => (props.primary ? primaryCss : null)}
  ${(props) => (props.danger ? dangerCss : null)}
  ${(props) =>
    props.success ? successCss : null}
  ${(props) =>
    props.large ? largeCss : null}

  ${(props) =>
    props.disabled ? disabledCss : null}
`
