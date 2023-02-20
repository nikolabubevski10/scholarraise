import React from 'react'
import cn from 'classnames'
import {noop} from 'helpers/common'

function Button({children, disabled = false, variant = 'primary', ...props}) {
  let inlineClasses = props.className ?? ''
  if (disabled) {
    inlineClasses += ' disabled'
  }

  return (
    <button {...props} className={`sr-button sr-button-${variant} ${inlineClasses}`}>
      {children}
    </button>
  )
}

function Checkbox({
  children,
  className = '',
  disabled = false,
  required = false,
  defaultChecked = false,
  onChange = noop, // make sure this function doesn't change on every render!
}) {
  const [checked, setChecked] = React.useState(defaultChecked)
  const firstRun = React.useRef(true)

  React.useEffect(() => {
    if (!firstRun.current) {
      onChange(checked)
      return
    }

    firstRun.current = false
  }, [checked, onChange])

  return (
    <div
      className={cn('relative flex items-start w-full my-2', className)}
      onClick={() => !disabled && setChecked(!checked)}
    >
      <input
        type="checkbox"
        className="w-4 h-5 cursor-pointer justify-self-center"
        checked={checked}
        disabled={disabled}
        required={required}
        readOnly
      />
      <div className="flex flex-row items-start">
        <span className="ml-2">{children}</span>
        {required && (
          <span
            className="absolute text-3xl font-extrabold leading-5 text-error-500"
            style={{right: 16}}
          >
            *
          </span>
        )}
      </div>
    </div>
  )
}

export {Button, Checkbox}
