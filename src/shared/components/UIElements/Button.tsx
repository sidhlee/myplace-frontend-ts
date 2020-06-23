import React, { ReactChild, ReactChildren } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

type ButtonProps = {
  children: ReactChild | ReactChildren;
  // You need to mark className as optional in Props interface
  // https://styled-components.com/docs/api#caveat-with-classname
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  to?: string;
  href?: string;
  success?: boolean;
  danger?: boolean;
  onClick?: () => void;
};

const Button = (props: ButtonProps) => {
  if (props.to) {
    return (
      <Link className={props.className} to={props.to}>
        {props.children}
      </Link>
    );
  }
  if (props.href) {
    return (
      <a className={props.className} href={props.href}>
        {props.children}
      </a>
    );
  }
  return (
    <button
      className={props.className}
      type={props.type}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

const successCss = css`
  background: var(--cl-primary);
  border-color: var(--cl-primary);
  color: var(--cl-white);
  &:hover {
    background: var(--text-accent);
    border-color: var(--text-accent);
  }
`;

const dangerCss = css`
  background: var(--cl-danger);
  border-color: var(--cl-danger);
  color: var(--cl-white);
  &:hover {
    background: var(--cl-danger-hover);
    border-color: var(--cl-danger-hover);
  }
`;

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

  ${(props) => (props.success ? successCss : null)}
  ${(props) => (props.danger ? dangerCss : null)}
`;
