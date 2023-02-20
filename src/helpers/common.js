import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import {clearToNumber} from './form-validators'
import currency from 'currency.js'

dayjs.extend(advancedFormat)
dayjs.extend(customParseFormat)

/**
 * Formats dates into SR's standard date display
 * @param {String} date dayjs interpretable `date` string
 */
export function formatDate(date) {
  return dayjs(date).format('MMMM DD, YYYY')
}

export function formatBirthdate(date) {
  return dayjs(date).format('MM-DD-YYYY')
}

export function formatFullDate(date) {
  return dayjs(date, 'MM/DD/YYYY').format('MMMM Do, YYYY')
}

export function formatZip(zip) {
  if (!zip) {
    return zip
  }

  let strZip = clearToNumber(zip)

  if (strZip === 5) {
    return strZip
  }

  if (strZip === 9) {
    return `${strZip.slice(0, 5)}-${strZip.slice(5)}`
  }

  return zip
}

/**
 * Formats phone numbers
 */
export function formatFullPhone(tel) {
  if (!tel || tel?.[0] === '+') {
    return tel
  }
  const clearedTel = clearToNumber(tel)
  if (clearedTel.length === 11) {
    return tel
  }

  if (clearedTel.length === 10) {
    return `+1 (${clearedTel.slice(0, 3)}) ${clearedTel.slice(3, 6)}-${clearedTel.slice(
      6,
      8,
    )}-${clearedTel.slice(8)}`
  }

  return tel
}

/**
 * Generic function for parsing SR data arrays
 * @param {Array} data
 * @param {Function} fn cleaning function
 */
export function parse(data, fn) {
  if (Array.isArray(data)) {
    const parsed = data.map(fn)
    parsed._parsed = true
    return parsed
  }
  return undefined
}

/**
 * This function extracts the account's hash id from a SR url
 * @param {String} url url string ending with the hash id
 */
export function extractHashIdFromURL(url) {
  let hashId = ''
  try {
    hashId = url.substring(url.lastIndexOf('/') + 1)
  } catch (e) {
    console.warn('Invalid URL received!')
  }
  return hashId
}

export function formatSSN(ssn) {
  if (typeof ssn !== 'string') {
    return ''
  }

  const onlyNumbersSSN = clearToNumber(ssn)

  // case where SSN is XXX-XX-LAST and LAST are the last 4 digits of SSN
  if (ssn.includes('X')) {
    return `XXX-XX-${onlyNumbersSSN}`
  }

  return `${onlyNumbersSSN.slice(0, 3)}-${onlyNumbersSSN.slice(3, 5)}-${onlyNumbersSSN.slice(5)}`
}

export function formatPhone(phone) {
  return typeof phone === 'string' ? phone.replace(/\D/g, '') : ''
}

// test:
// [-4,-1,0,1,2,3,4,10,11,12,13,14,20,21,22,100,101,111].forEach(
//   n => console.log(n + ' -> ' + getNumberWithOrdinal(n))
// );
export function getNumberWithOrdinal(n) {
  let s = ['th', 'st', 'nd', 'rd']
  let v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

export const scrollToId = (id, doNotPush = true) => {
  const elem = document.getElementById(id.split('#').join(''))

  if (elem) {
    window.scrollTo(0, elem.offsetTop - 80)

    if (!doNotPush) window.history.pushState(null, null, `#${id}`)
  }
}

export const currencyOptions = {
  pattern: '#',
  negativePattern: '-#',
  decimal: '.',
  separator: ',',
}

export function formatMoney(money) {
  return currency(money, currencyOptions).format()
}

export function parseMoney(money) {
  return currency(money, currencyOptions)
}

export function noop() {}

export const BANK_ACCOUNT_TYPE = 'ach'

export function transformPaymentSourcesIntoSelectOptions({sources, isDeposit}) {
  return sources
    .filter(source => (isDeposit ? source.paymentType === BANK_ACCOUNT_TYPE : source))
    .map(source => ({
      data: {...source},
      value: source.id,
      label:
        source.paymentType === BANK_ACCOUNT_TYPE
          ? `Bank account ending in ${source.lastFour}`
          : `Credit card ending in ${source.lastFour}`,
    }))
}
