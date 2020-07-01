import styled from 'styled-components'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

const getThemeColor = (theme: string) => {
  switch (theme) {
    case 'danger':
      return 'var(--cl-danger-alpha)'
    case 'primary':
      return 'var(--cl-primary)'
    default:
      return 'var(--cl-danger-alpha)'
  }
}

type ThemedTippyExtraProps = {
  theme?: string
}

const ThemedTippy = styled(Tippy)<ThemedTippyExtraProps>`
  background: ${(props) => getThemeColor(props.theme)};
  &[data-placement^='top'] > .tippy-arrow::before {
    border-top-color: ${(props) => getThemeColor(props.theme)};
  }
  &[data-placement^='bottom'] > .tippy-arrow::before {
    border-bottom-color: ${(props) => getThemeColor(props.theme)};
  }
  &[data-placement^='left'] > .tippy-arrow::before {
    border-left-color: ${(props) => getThemeColor(props.theme)};
  }
  &[data-placement^='right'] > .tippy-arrow::before {
    border-right-color: ${(props) => getThemeColor(props.theme)};
  }
`

export default ThemedTippy
