import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)
dayjs.extend(utc)

function getTimestamp(date, dateFormat = 'YYYY-MM-DD') {
  return dayjs.utc(date, dateFormat).valueOf()
}

// Takes a balances array as input, returns an object with all needed fields
// for dashboard data consumption
export function sortAndCreateBalances(balances = []) {
  let balance = 0
  let principal = 0
  let interest = 0
  let allBalances = []

  if (balances.length > 0) {
    allBalances = balances
      .slice()
      .sort((a, b) => getTimestamp(b.asOfDate) - getTimestamp(a.asOfDate))
    balance = allBalances[0].balance
    principal = allBalances[0].principal
    interest = allBalances[0].moneyReturn
  }

  return {balances: allBalances, currentBalance: balance, principal, interest}
}
