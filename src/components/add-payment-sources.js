import React from 'react'
import AddPlaidBank from 'helpers/plaid'
import AddStripeCard from 'helpers/stripe'
import {Button} from 'components/lib'
import {useAppContext} from 'context/appContext'
import {useNotification} from 'hooks/useNotification'
import {createPaymentSource} from 'api/paymentSources'

function AddPaymentSources({isDeposit, onSuccess}) {
  const plaidButtonRef = React.useRef()
  const {setLoading} = useAppContext()
  const {failed} = useNotification()
  const msgFailed =
    'We could not add this payment source. Check the provided information and try again!'

  const handleSubmit = React.useCallback(
    function onSubmit(data) {
      setLoading(true)
      createPaymentSource(data)
        .then(onSuccess)
        .catch(_error => {
          failed(msgFailed)
          setLoading(false)
        })
    },
    [onSuccess, failed, setLoading],
  )

  return (
    <div className="flex flex-col flex-wrap w-full sm:flex-row">
      <div className="mb-4">{!isDeposit && <AddStripeCard submit={handleSubmit} />}</div>
      <div>
        <AddPlaidBank innerRef={plaidButtonRef} style={{display: 'none'}} submit={handleSubmit} />
        <Button
          className="w-full sm:w-auto"
          type="button"
          onClick={() => plaidButtonRef.current.handleOnClick()}
        >
          Add bank account
        </Button>
      </div>
    </div>
  )
}

export {AddPaymentSources}
