import React from 'react'
import cn from 'classnames'
import {Input, Select, MaskedInput, TextArea} from './form-inputs'
import {formatSSN, currencyOptions, formatMoney} from 'helpers/common'
import {
  validateDate,
  validatePhone,
  validateSSN,
  validateEmail,
  validateZip,
  validateMoney,
} from 'helpers/form-validators'
import currency from 'currency.js'
import {useFormContext} from 'react-hook-form'
import DatePicker from 'react-datepicker'
import dayjs from 'dayjs'

function DateInput({validate, ...props}) {
  const {setValue, trigger} = useFormContext()
  const [date, setDate] = React.useState(
    props.defaultValue ? dayjs(props.defaultValue?.replace('-', '/')).toDate() : null,
  )

  return (
    <div>
      <DatePicker
        {...props}
        selected={date}
        dateFormat="MM-dd-yyyy"
        dropdownMode="select"
        preventOpenOnFocus
        closeOnScroll
        onChange={date => {
          setDate(date)
          setValue(props.name, dayjs(date).format('MM-DD-YYYY'))
          trigger(props.name)
        }}
        placeholderText={props.placeholder}
        customInput={
          <MaskedInput
            {...props}
            isCalendar={{...props}}
            icon="calendar"
            mask="99-99-9999"
            validation={{validate: {isDateValid: validateDate, ...validate}}}
          />
        }
      />
    </div>
  )
}

function PhoneInput({validate, ...props}) {
  return (
    <MaskedInput
      {...props}
      mask="+1 (999) 999-9999"
      type="tel"
      validation={{validate: {isPhoneValid: validatePhone, ...validate}}}
    />
  )
}

function SSNInput({validate, ...props}) {
  if (props.showSSN) {
    var ssn = props.defaultValue
    return (
      <div className="flex items-center font-bold fs-exclude" style={{height: 54}}>
        SSN: {formatSSN(ssn)}
      </div>
    )
  }

  return (
    <MaskedInput
      {...props}
      className={cn(props.className, 'fs-exclude')}
      mask="999-99-9999"
      validation={{validate: {isSSNValid: validateSSN, ...validate}}}
    />
  )
}

function ZipInput({validate, ...props}) {
  // US accepts both 55555 and 55555-5555
  return (
    <MaskedInput
      {...props}
      mask="99999"
      validation={{
        validate: {
          isZipValid: validateZip,
          ...validate,
        },
      }}
    />
  )
}

function EmailInput(props) {
  return <Input {...props} validation={{validate: {isEmailValid: validateEmail}}} type="email" />
}

function PasswordInput(props) {
  return <Input {...props} type="password" />
}

function MoneyInput({defaultValue, ...props}) {
  const [money, setMoney] = React.useState(defaultValue ? formatMoney(defaultValue) : '')
  const {setValue} = useFormContext()

  function printMoney() {
    const newMoney = currency(money, currencyOptions)

    if (isNaN(newMoney.value)) {
      return setMoney(formatMoney(0))
    }

    return setMoney(newMoney.format())
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => setValue(props.name, money), [money])

  return (
    <Input
      {...props}
      defaultValue={money}
      onBlur={printMoney}
      onChange={e => setMoney(e.target.value)}
      validation={{validate: {isMoneyValid: validateMoney}}}
    />
  )
}

function TextAreaInput(props) {
  return <TextArea {...props} type="textarea" />
}

function FormInput({type = 'input', ...props}) {
  const inputTypes = {
    input: Input,
    select: Select,
    date: DateInput,
    phone: PhoneInput,
    ssn: SSNInput,
    zip: ZipInput,
    email: EmailInput,
    money: MoneyInput,
    textarea: TextAreaInput,
    password: PasswordInput,
  }
  const Component = inputTypes[type] || inputTypes.input

  // TODO: Pass down valid HTML input types
  return <Component {...props} />
}

export {FormInput}
