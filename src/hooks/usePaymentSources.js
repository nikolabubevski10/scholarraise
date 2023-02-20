import React, {useState, useEffect, useCallback, useRef} from 'react'
import {Row, Column} from 'sr-components'
import useSWR from 'swr'

import {getPaymentSources, createPaymentSource, deletePaymentSource} from '../api/paymentSources'
import {useNotification} from '../hooks/useNotification'
import {decodeError} from '../api/errorDecoder'
import {useAppContext} from '../context/appContext'
import {Button} from 'components/lib'

import AddStripeCard from '../helpers/stripe'
import AddPlaidBank from '../helpers/plaid'

function get() {
  return getPaymentSources()
    .then(r => r)
    .catch(e => e)
}

function usePaymentSources() {
  const {data: paymentSources, mutate} = useSWR('/payment_sources', get, {
    suspense: true,
  })
  const [validSources, setValidSources] = useState({bank: [], card: []})
  const {success, failed} = useNotification()
  const {setLoading} = useAppContext()
  const plaidButtonRef = useRef()

  const create = useCallback(function createNewSource(data) {
    setLoading(true)
    createPaymentSource(data)
      .then(() => success('Payment method successfully added!'))
      .then(() => mutate())
      .catch(e => failed(decodeError(e).text))
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const remove = useCallback(function onRemove(id) {
    setLoading(true)
    deletePaymentSource(id)
      .then(() => success('Payment source removed.'))
      .then(() => mutate())
      .catch(e => failed(decodeError(e).text))
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const update = useCallback(
    function updatePaymentSources() {
      let bank = []
      let card = []
      paymentSources.forEach(source => {
        let type = source.paymentType === 'ach' ? bank : card
        type.push(source)
      })
      setValidSources({bank, card})
    },
    [paymentSources],
  )

  const Buttons = useCallback(function add({onlyBanks}) {
    return (
      <Row>
        <Column width={1}>
          <div className="flex flex-col flex-wrap w-auto sm:flex-row">
            <div className="mb-4">{!onlyBanks && <AddStripeCard submit={create} />}</div>
            <div className="mb-4">
              <AddPlaidBank innerRef={plaidButtonRef} style={{display: 'none'}} submit={create} />
              <Button
                className="w-full sm:w-auto"
                type="button"
                onClick={() => plaidButtonRef.current.handleOnClick()}
              >
                Add bank account
              </Button>
            </div>
          </div>
        </Column>
      </Row>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (paymentSources && Array.isArray(paymentSources)) {
      update()
    }
  }, [paymentSources, update])

  return {sources: validSources, create, remove, Buttons}
}

export {usePaymentSources}
