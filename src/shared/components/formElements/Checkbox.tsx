import styled from 'styled-components'

// forked from:
// https://codepen.io/aaroniker/pen/PowZbgb
const StyledCheckbox = styled.div`
  --background: #fff;
	--border: #d1d6ee;
	--border-hover: #bbc1e1;
	--border-active: var(--cl-primary);
	--tick: #fff;
	--length: 18px;
	display: flex;
  position: relative;
  margin-bottom: 1em;
	label {
		margin-right: 5px;
		margin-top: -2px;
    color: var(--text-secondary);
	}
	.box {
		position: relative;
		input,
		svg {
			width: var(--length);
			height: var(--length);
			display: block;
		}
		input {
			-webkit-appearance: none;
			-moz-appearance: none;
			position: relative;
			outline: none;
			background: var(--cl-white);
			border: none;
			margin: 0;
			padding: 0;
			cursor: pointer;
			border-radius: 4px;
			transition: box-shadow 0.2s;
      box-shadow: inset 0 0 0 var(--s, 1px) var(--b, var(--border));
      
			&:hover {
				--s: 2px;
				--b: var(--border-hover);
			}
      &:checked {
        --b: var(--border-active);
				--s: 11px;
				& + svg {
					animation: bounce 0.2s linear forwards 0.1s;
				}
			}
		}
		svg {
      --stroke: var(--tick);
			pointer-events: none;
			fill: none;
			stroke-width: 2px;
			stroke-linecap: round;
			stroke-linejoin: round;
			stroke: var(--stroke, var(--border-active));
			position: absolute;
			top: 0;
			left: 0;
			width: var(--length);
      height: var(--length);
      --scale: 0;
			transform: scale(var(--scale, 1)) translateZ(0);
		}
	}				
}

@keyframes bounce {
	50% {
		transform: scale(1.2);
	}
	75% {
		transform: scale(0.9);
	}
	100% {
		transform: scale(1);
	}
`

type CheckboxProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  checked?: boolean
}

const Checkbox = (props: CheckboxProps) => {
  return (
    <StyledCheckbox>
      <label htmlFor="box">Auto-generate image</label>
      <div className="box">
        <input
          type="checkbox"
          id="box"
          onChange={props.onChange}
          checked={props.checked}
        />
        <svg viewBox="0 0 21 21">
          <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
        </svg>
      </div>
    </StyledCheckbox>
  )
}

export default Checkbox
