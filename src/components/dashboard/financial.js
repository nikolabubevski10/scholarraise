import React from 'react'
import {Flex, Statistic, Row, Column} from 'sr-components'

export default function Financial({account, financialSummary = {}, balances}) {
  const {withdrawalTotal} = financialSummary
  const {currentBalance, principal, interest} = balances

  const financialsArray = [
    {
      title: 'Balance',
      amount: currentBalance,
    },
    {
      title: 'Principal',
      tooltip: 'The combined amount of money you and others have put into the account.',
      amount: principal,
    },
    {
      title: 'Gains',
      tooltip:
        'Your principal money is invested, and this is the income earned off of your investments. AKA “Free Money”',
      amount: interest,
    },
    {
      title: 'Withdrawal',
      tooltip:
        'Please make your withdrawals through NYSaves. We are working to make this available on Scholar Raise.',
      amount: withdrawalTotal,
    },
  ]

  return account ? (
    <Row>
      <Column width={1} px={0}>
        <Flex
          flexDirection={['column', 'row']}
          alignItems={['flex-start', 'center']}
          justifyContent="space-between"
          width={['auto', '100%']}
        >
          {financialsArray.map(({title, tooltip, amount}, index) => {
            const isLast = financialsArray.length - 1 === index
            const isFirst = index === 0

            return (
              <Statistic
                key={index}
                mb={isLast ? 0 : [3, 0]}
                alignItems="flex-start"
                width={['auto', null, `${100 / financialsArray.length}%`]}
                title={title}
                important={isFirst}
                value={amount}
                tooltip={tooltip}
                name={'oi'}
              />
            )
          })}
        </Flex>
      </Column>
    </Row>
  ) : null
}
