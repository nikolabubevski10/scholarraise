export const formatOrdinal = num => {
  if (num > 1000 && num < 1000000) {
    return `$${num / 1000 + 'K'}`
  } else if (num >= 1000000) {
    return `$${num / 1000000 + 'M'}`
  }

  return `$${num}`
}

export const formatDollars = amount => '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')

export const financialSummaryBuilder = (balances, account) => {
  const {balance, principal, moneyReturn: interest} = balances.balance
  const withdrawals = account.financialSummary.withdrawalTotal
  return {balance, principal, interest, withdrawals}
}
