import React from 'react'
import cn from 'classnames'
import {useFormContext} from 'react-hook-form'
import {Tooltip} from 'sr-components'
import {ReactComponent as CalendarAlt} from 'assets/icons/calendar-alt-solid.svg'
import {ReactComponent as CaretDown} from 'assets/icons/caret-down-solid.svg'
import Masked from 'react-input-mask'

function RequiredMark({right = 0}) {
  return (
    <span className="absolute text-3xl font-extrabold text-error-500" style={{right, top: 14}}>
      *
    </span>
  )
}

function CalendarMark({onClick}) {
  return (
    <div
      className={cn([
        'absolute flex items-center justify-center w-12 bg-white border-l border-solid rounded-r  border-snow focus:border-primary-500',
        onClick && 'cursor-pointer',
      ])}
      onClick={onClick}
      style={{right: 1, top: 1, height: 52}} // height is fixed! trick to use borders
    >
      <CalendarAlt width="12" className="text-lightGray" />
    </div>
  )
}

function ErrorOrHelperText({message, helperText}) {
  return (
    <div
      className={cn([
        'items-center justify-center h-full px-4 text-xs rounded-b align-center leading-5',
        helperText && 'text-darkGray',
        message && 'bg-error-100 text-error-800',
      ])}
    >
      {message || helperText}
    </div>
  )
}

// function that handles react-hook-form error objects
function traverseErrorObject(field, errObj) {
  if (!field || typeof field !== 'string' || !errObj) {
    return errObj
  }

  let split = field.split(/\.(.+)/)

  if (split.length > 1) {
    return traverseErrorObject(split[1], errObj?.[split[0]])
  }

  return errObj?.[field]
}

function Input({name, helperText, ...props}) {
  const localRef = React.useRef()
  const localCalendarClick = React.useRef(false)
  const methods = useFormContext()
  const errors = traverseErrorObject(name, methods.errors) // supports nested rhf error objects

  // input padding right
  let paddingRight = props.required ? 32 : undefined
  // required marker right
  let right = 16

  if (props.tooltip) {
    paddingRight = paddingRight ? paddingRight + 32 : 32
    right += 32
  }

  if (props.icon) {
    paddingRight = paddingRight ? paddingRight + 48 : 48
    right += 48
  }

  return (
    <div className="flex flex-col">
      <div className="relative select-none">
        <input
          {...props}
          id={name}
          name={name}
          ref={e => {
            methods.register(e, {
              required: props.required ? 'This field is required' : undefined,
              ...props.validation,
            })
            localRef.current = e
          }}
          onClick={() => {
            // handling calendar input
            if (localCalendarClick.current) {
              props.onClick && props.onClick()
            }
            localCalendarClick.current = false
            localRef.current.focus()
          }}
          className={cn(['sr-input', errors && 'sr-input-error', props.className])}
          style={{paddingRight}}
        />
        {props.required && <RequiredMark right={right} />}
        {props.tooltip && <Tooltip tooltip={props.tooltip} withinInput />}
        {props.icon === 'calendar' && (
          <CalendarMark
            onClick={() => {
              localCalendarClick.current = true
              localRef.current.click()
            }}
          />
        )}
      </div>
      <div className="h-5">
        {(errors?.message || helperText) && (
          <ErrorOrHelperText message={errors?.message} helperText={helperText} />
        )}
      </div>
    </div>
  )
}

function Select({name, options = [], ...props}) {
  const localRef = React.useRef()
  const [currValue, setValue] = React.useState(props.defaultValue)
  const methods = useFormContext()
  const errors = traverseErrorObject(name, methods.errors)

  // input padding right
  let paddingRight = props.required ? 48 : 16
  let right = 32

  return (
    <div>
      <div className="relative inline-block w-full">
        <select
          defaultValue={props.defaultValue ?? ''}
          {...props}
          className={cn(['appearance-none sr-input', !currValue && 'text-lightGray'])}
          name={name}
          ref={e => {
            methods.register(e, {
              required: props.required ? 'This field is required' : undefined,
              ...props.validation,
            })
            localRef.current = e
          }}
          style={{paddingRight}}
          onChange={d => {
            setValue(d.target.value)
            localRef.current.blur()
          }}
        >
          <option value="" disabled selected hidden>
            {props.placeholder}
          </option>
          {options.map((opt, index) => (
            <option value={opt.value} key={`${name}-${opt.label}-${index}`}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
          <CaretDown className="w-4 h-4" />
        </div>
        {props.required && <RequiredMark right={right} />}
      </div>
      <div className="h-5">
        {(errors?.message || props.helperText) && (
          <ErrorOrHelperText message={errors.message} helperText={props.helperText} />
        )}
      </div>
    </div>
  )
}

function MaskedInput(props) {
  // We have to do this because react-datepicker injects a bunch of new props that will eventually
  // reach the input. We don't want that to happen. I added a prop in the date picker called
  // `isCalendar` that will be passed down and this prop contains the original props given to the
  // date picker. We'll pass that down to the input.
  if (props.isCalendar?.name) {
    const {value, validation, ...rest} = props
    return (
      <Masked {...rest}>
        <Input {...props.isCalendar} validation={validation} />
      </Masked>
    )
  }

  return (
    <Masked {...props}>
      <Input {...props} />
    </Masked>
  )
}

function TextArea({name, fullHeight, helperText, ...props}) {
  const methods = useFormContext()
  const errors = traverseErrorObject(name, methods.errors)

  // input padding right
  let paddingRight = props.required ? 32 : undefined
  // required marker right
  let right = 16

  if (props.tooltip) {
    paddingRight = paddingRight ? paddingRight + 32 : 32
    right += 32
  }
  if (props.icon) {
    paddingRight = paddingRight ? paddingRight + 48 : 48
    right += 48
  }

  return (
    <div className={cn(['flex flex-col', fullHeight && 'h-full'])}>
      <div className={cn(['relative select-none', fullHeight && 'h-full'])}>
        <textarea
          {...props}
          id={name}
          name={name}
          ref={methods.register({
            required: props.required ? 'This field is required' : undefined,
            ...props.validation,
          })}
          className={cn([
            'sr-input',
            errors && 'sr-input-error',
            props.className,
            fullHeight && 'h-full',
          ])}
          style={{paddingRight, height: !fullHeight && (props.height ?? 90)}}
        />
        {props.required && <RequiredMark right={right} />}
        {props.tooltip && <Tooltip tooltip={props.tooltip} withinInput />}
      </div>
      <div className="h-5">
        {(errors?.message || helperText) && (
          <ErrorOrHelperText message={errors?.message} helperText={helperText} />
        )}
      </div>
    </div>
  )
}

export {Input, Select, MaskedInput, TextArea}
