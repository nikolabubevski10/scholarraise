import currency from 'currency.js'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'

dayjs.extend(customParseFormat)
dayjs.extend(utc)

export function clearToNumber(n) {
  return n.replace(/[^0-9]/g, '')
}

export function removeInternationalCode(tel) {
  // only handling US numbers for now
  if (typeof tel === 'string' && tel[0] === '1') {
    return tel.slice(1)
  }
  return tel
}

export function validatePhone(tel) {
  if (!tel) {
    return
  }

  let clearedTel = clearToNumber(tel)

  // remove +1?
  if (clearedTel.length === 11) {
    clearedTel = removeInternationalCode(clearedTel)
  }

  if (clearedTel.length !== 10) {
    return 'Please insert the full number'
  }
}

export function maskPhone(tel) {
  if (!tel) {
    return tel
  }

  var strTel = String(tel)
  return `+1 (${strTel.slice(0, 3)}) ${strTel.slice(3, 6)}-${strTel.slice(6)}`
}

const from900To999 = Array.from({length: 100}, (_, i) => 900 + i)

export function validateSSN(ssn) {
  if (!ssn) {
    return
  }

  const clearedSSN = clearToNumber(ssn)

  if (clearedSSN.length < 9) {
    return 'Please insert the full SSN'
  }

  if (['000', '666', ...from900To999].includes(clearedSSN.substring(0, 3))) {
    return 'Check the first three digits'
  }

  if (clearedSSN.substring(3, 5) === '00') {
    return 'Check the middle digits'
  }

  if (clearedSSN.substring(5, 9) === '0000') {
    return 'Check the last four digits'
  }
}

export function validateDate(date) {
  if (!date) {
    return
  }

  // last argument is to be strict re date format
  const parsedDate = dayjs(date, 'MM-DD-YYYY', true)

  if (!parsedDate.isValid()) {
    return 'Please insert a valid date'
  }

  const year = parsedDate.year()

  if (year < 1930 || year > 2050) {
    return 'Check the year inserted'
  }
}

export function validateAdultBirthDate(date) {
  if (!date) {
    return
  }

  // last argument is to be strict re date format
  const parsedDate = dayjs(date, 'MM-DD-YYYY', true)

  if (!parsedDate.isValid()) {
    return 'Please insert a valid date'
  }

  if (dayjs.utc().diff(parsedDate, 'year') < 10) {
    return 'Insert a valid birth date'
  }
}

export function validatePregnancyDate(date) {
  if (!date) {
    return
  }

  const parsedDate = dayjs(date, 'MM-DD-YYYY', true)
  const yesterday = dayjs().subtract(1, 'day')

  if (parsedDate.isBefore(yesterday)) {
    return 'Please insert a date in the future'
  }
}

// Simple regex for email validation
var emailRegex = /^\S+@\S+$/

export function validateEmail(email) {
  if (!email) {
    return
  }

  if (email?.length > 256) {
    return 'Too long! Check the email'
  }

  if (!emailRegex.test(email)) {
    return 'Please insert a valid email'
  }
}

export function validateZip(zip) {
  if (!zip) {
    return
  }

  const clearedZip = clearToNumber(zip)

  if (clearedZip.length < 5) {
    return 'Check your postal code'
  }
}

export function validateMoney(money) {
  if (!money) {
    return
  }

  const validMoney = currency(money, {
    pattern: '#',
    negativePattern: '-#',
    decimal: '.',
    separator: ',',
    errorOnInvalid: true,
  })

  if (isNaN(validMoney.value)) {
    return 'Invalid amount'
  }

  if (validMoney.value <= 0) {
    return 'Insert a positive amount'
  }
}

export function isSamePassword(password, passwordConfirmation) {
  const msgFailed = "Passwords don't match"

  if (password !== passwordConfirmation) {
    return msgFailed
  }

  return true
}
