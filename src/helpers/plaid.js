import React, {Component} from 'react'
import PlaidLink from 'react-plaid-link'

// TODO: Once we hit 100 live users, change this from "development" to "production"
import {PLAID_ENV, PLAID_PUBLIC_KEY} from '../constants/constants'

class AddPlaidAccount extends Component {
  plaidSuccess = (token, metadata) => {
    const {submit} = this.props

    submit({
      payment_source: {
        payment_type: 'ach',
      },
      plaid_account_id: metadata.account_id,
      token,
    })
  }

  render() {
    const {style, innerRef} = this.props

    return (
      <PlaidLink
        publicKey={PLAID_PUBLIC_KEY}
        product={['auth']}
        env={PLAID_ENV}
        selectAccount={true}
        clientName="Add bank account"
        onSuccess={this.plaidSuccess}
        style={style}
        ref={innerRef}
        data-cy="add-bank-button"
      >
        Add bank account
      </PlaidLink>
    )
  }
}

export default AddPlaidAccount
