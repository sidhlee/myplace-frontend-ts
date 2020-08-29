import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

:root {
  /* FB Vars */
  --fds-gray-00: #f5f6f7;
  --fds-gray-05: #f2f3f5;
  --fds-gray-10: #ebedf0;
  --fds-gray-20: #dadde1;
  --fds-gray-25: #ccd0d5;
  --fds-gray-30: #bec3c9;
  --fds-gray-45: #8d949e;
  --fds-gray-70: #606770;
  --fds-gray-80: #444950;
  --fds-gray-90: #e4e6eb;
  --fds-gray-100: #1c1e21;
  --fds-fb-blue-70: #4267b2;
  --fds-fb-blue-75: #385898;

  /* Custom Vars */
  --cl-dark: #292929;
  --cl-white: #fff;
  --cl-drawer-bg: var(--cl-white);
  --cl-backdrop: rgba(0, 0, 0, 0.75);
  --cl-primary: #1877f2;
  --cl-primary-gradient: linear-gradient(#4e69a2, #3b5998 50%);
  --cl-secondary: #2a006e;
  --cl-accent: #f8df00;
  --cl-danger: #fa3e3e;
  --cl-danger-alpha: rgba(250, 62, 62, 0.9);
  --cl-danger-hover: #ca3131;
  --cl-success-gradient: linear-gradient(#67ae55, #578843);
  --cl-success-gradient-hover: linear-gradient(#79bc64, #578843);
  --cl-success: #69a74e;
  --cl-overlay: rgba(255, 255, 255, 0.9);
  --cl-navbar: var(--cl-white);
  --cl-border-color: #bdc7d8;
  --cl-border-color-success: #3b6e22 #3b6e22 #2c5115;
  --cl-bg: var(--fds-gray-10);
  --cl-btn-bg: var(--fds-gray-00);
  --cl-icon-bg: #e4e6eb;
  --cl-item-hover: var(--fds-gray-10);

  --text-accent: var(--fds-fb-blue-75);
  --text-main: var(--fds-gray-100);
  --text-secondary: #65676b;
  --text-inverse: var(--cl-white);

  --z-navbar: 50;
  --z-drawer: 200;
  --z-backdrop: 100;
  --z-modal: 300;
  --z-spinner: 250;

  --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  --box-shadow-success: inset 0 1px 1px #a4e388;
  --main-header-height: 3.8rem;
  --app-max-width: 1400px;
  --border: 1px solid var(--cl-border-color);
  --border-radius: 5px;

  --transition-duration: 250ms;
}

html {
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // These two body lines are customary
  margin: 0;
  background: var(--cl-bg); // always! set your BG in body
}

.App {
  // If you set background here, it'll only cover as far as the content goes.

  // min-height: 100vh; will introduce weird behaviors when new elements are added
  // outside the initial dimension.
  // (eg. nested scrollbar, vertical overflow-hidden, ...)
  padding: calc(var(--main-header-height) + 1em) 0 2em;
}

button,
a {
  cursor: pointer;
  color: var(--text-main);
}

h1,
h2,
h3,
p {
  margin: 0;
  &:not(:last-child) {
    margin-bottom: 0.3em;
  }
  line-height: 1.4;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

a {
  text-decoration: none;
}

hr {
  background: #dadde1;
  border-width: 0;
  color: #dadde1;
  height: 1px;
}

.center {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
`

export const bp = {
  desktop: '350px',
}

export const config = {
  smart: {
    clamp: true,
    tension: 200,
  },
}
