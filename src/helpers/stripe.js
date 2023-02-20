import React, {Component} from 'react'
import {StripeProvider, Elements, CardElement} from 'react-stripe-elements'
import {STRIPE_PUBLIC_KEY} from '../constants/constants'

import {Button} from 'components/lib'

import './stripe.css'

class AddStripeCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isShowing: false,
      stripe: null,
      error: false,
      complete: false,
    }

    this.submitStripe = this.submitStripe.bind(this)
  }

  componentDidMount() {
    const setupElements = () => {
      let elements = this.state.stripe.elements()

      this.card = elements.create('card', {})
      this.card.mount(this.refs.cardElement._ref)
      this.card.addEventListener('change', ({error, complete}) =>
        this.setState({error: error ? error : false, complete}),
      )
    }

    const setStripe = () => {
      this.setState(
        {
          stripe: window.Stripe(STRIPE_PUBLIC_KEY),
        },
        setupElements,
      )
    }

    if (window.Stripe) {
      setStripe()
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        setStripe()
      })
    }
  }

  componentDidUpdate(prevProps) {
    const {isShowing} = this.state
    const {cardError} = this.props
    if (prevProps.cardError !== cardError && isShowing) {
      this.setState(() => ({isShowing: Boolean(this.props.cardError)}))
    }
  }

  submitStripe(event) {
    event.preventDefault()
    event.stopPropagation()

    this.state.stripe.createToken(this.card).then(({token, error}) => {
      if (token) {
        const {submit} = this.props

        submit({
          payment_source: {
            payment_type: 'card',
          },
          stripe_source_id: token.id,
        })

        this.setState({isShowing: false})
      }
    })
  }

  render() {
    const {isShowing, error, complete, stripe} = this.state
    const {showFunction} = this.props

    return (
      <div className="w-full sm:w-auto stripe-payment-method">
        {!isShowing && (
          <Button
            className="w-full mr-2 sm:w-auto sm:mr-4"
            onClick={() => {
              this.setState({isShowing: true})
              showFunction && showFunction(true)
            }}
            mr={[2, null, 3]}
          >
            Add card
          </Button>
        )}
        <div className={isShowing ? 'stripe show' : 'stripe hide'}>
          <StripeProvider stripe={stripe}>
            <Elements>
              <form width="100%" onSubmit={this.submitStripe}>
                <CardElement ref="cardElement" />
                {!error && complete && (
                  <Button
                    data-cy="add-card-button"
                    className="w-full sm:w-auto sm:mr-4"
                    mr={[0, null, 2]}
                  >
                    Submit
                  </Button>
                )}
                {(error || !complete) && (
                  <Button
                    data-cy="add-card-button"
                    className="w-full sm:w-auto sm:mr-4"
                    type="button"
                    variant="error"
                    onClick={() => {
                      this.setState({isShowing: false})
                      showFunction && showFunction(false)
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </form>
            </Elements>
          </StripeProvider>
        </div>
      </div>
    )
  }
}

export default AddStripeCard
