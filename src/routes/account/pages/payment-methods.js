import React from 'react'
import {Row, Column, Note, Paragraph, PaymentMethod} from 'sr-components'
import dayjs from 'dayjs'

import ErrorBoundary from '../../../components/error-handling'
import {usePaymentSources} from '../../../hooks/usePaymentSources'

const PaymentMethodsList = ({sources, onRemove}) => {
  return [...sources.card, ...sources.bank].map(item => (
    <Column width={[1, null, 1 / 3]} key={item.id}>
      <PaymentMethod
        mr={2}
        mb={4}
        type={item.paymentType}
        addedOn={dayjs(item.createdAt).format('MMMM DD, YYYY')}
        lastFour={item.lastFour}
        onRemove={() => onRemove(item.id)}
      />
    </Column>
  ))
}

function PaymentMethods() {
  const {sources, remove, Buttons} = usePaymentSources()

  return (
    <>
      <Buttons />
      <Row>
        <Column width={[1, null, 1 / 2]} mb={3}>
          <Note>
            <b>Note:</b> Unfortunately we cannot accept credit, debit, and gift cards to fund
            accounts that you own. You can, however, use them to make contributions to other
            scholars.
          </Note>
        </Column>
      </Row>
      <Row>
        <ErrorBoundary
          fallback={
            <Paragraph>
              There was an error loading the payment sources. Please try again in a few minutes.
            </Paragraph>
          }
        >
          <PaymentMethodsList sources={sources} onRemove={remove} />
        </ErrorBoundary>
      </Row>
    </>
  )
}
export default PaymentMethods
