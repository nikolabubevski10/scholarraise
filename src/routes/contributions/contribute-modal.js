import React from 'react'
import cn from 'classnames/dedupe'
import {useDisclosure} from 'react-use-disclosure'
import {Dialog} from 'sr-components'
import {Button} from 'components/lib'
import {Form, FormInput} from 'components/forms'
import {useFormContext} from 'react-hook-form'
import {
  parseMoney,
  formatMoney,
  noop,
  transformPaymentSourcesIntoSelectOptions,
} from 'helpers/common'
import recurrencyList from './recurrency-list'
import {getPaymentSources} from 'api/paymentSources'
import {createContribution, updateContribution, cancelRecurring} from 'api/contributions'
import {useNotification} from 'hooks/useNotification'
import {useUser} from 'context/user'
import {useAppContext} from 'context/appContext'
import {AddPaymentSources} from 'components/add-payment-sources'

const STATUS_LOADING = 'loading'
const STATUS_ERROR = 'error'
const STATUS_SUCCESS = 'success'

function ContributionValues({isDeposit}) {
  const {watch} = useFormContext()

  const amount = parseMoney(watch('amount'))
  const fees = amount.multiply(process.env.REACT_APP_SR_FEE)
  const total = amount.add(fees)

  const amountError = isNaN(amount.value) || amount.value < 0
  const feesError = amountError || isNaN(fees.value)
  const totalError = amountError || isNaN(total.value)

  return (
    <div className="mb-4 md:mt-4">
      <div className="font-bold">
        <span>
          Your contribution:{' '}
          <span className={cn(['text-mediumGray', amountError && 'text-error-500'])}>
            {amountError ? 'Invalid amount' : `$${formatMoney(amount.value)}`}
          </span>
        </span>
      </div>
      {!isDeposit && (
        <div className="mt-2 font-bold">
          <span>
            Scholar Raise fees:{' '}
            <span className="text-mediumGray text-error-500">
              ${feesError ? '0.00' : formatMoney(fees.value)}
            </span>
          </span>
        </div>
      )}
      {!isDeposit && (
        <div className="mt-2 font-bold">
          <span>
            Total:{' '}
            <span className="text-mediumGray">
              ${totalError ? '0.00' : formatMoney(total.value)}
            </span>
          </span>
        </div>
      )}
    </div>
  )
}

function MakeAContribution({options = {}}) {
  const {
    classNames,
    formClassNames,
    account = null,
    editing = null,
    beforeForm = null,
    leftButtons = null,
    rightButtons = null,
    onContribute = noop,
    onEdit = noop,
    onFail = noop,
    onCancel = noop,
  } = options
  const {open, close, isOpen} = useDisclosure()
  const [isValid, setIsValid] = React.useState(false)
  const [isPublic, setPublic] = React.useState(editing?.isPublic ?? false)
  const [isRecurring, setRecurring] = React.useState(false)
  const [rawSources, setRawSources] = React.useState() // holds orig data
  const [paymentSources, setPaymentSources] = React.useState([]) // display
  const [loadStatus, setStatus] = React.useState(STATUS_LOADING)
  const {success, failed} = useNotification()
  const {user} = useUser()
  const {setLoading, isLoading} = useAppContext()
  const isDeposit = React.useMemo(() => account?.userId === user.id || editing?.toOwnAccount, [
    editing,
    account,
    user,
  ])

  const isStatusLoading = loadStatus === STATUS_LOADING
  const isStatusError = loadStatus === STATUS_ERROR
  const isStatusSuccess = loadStatus === STATUS_SUCCESS

  React.useEffect(() => {
    if (Array.isArray(rawSources)) {
      const sources = transformPaymentSourcesIntoSelectOptions({sources: rawSources, isDeposit})
      setPaymentSources(sources)
      setStatus(STATUS_SUCCESS)
      setLoading(false)
    }
  }, [rawSources, isDeposit, setLoading])

  React.useEffect(() => {
    getPaymentSources()
      .then(setRawSources)
      .then(() => setStatus(STATUS_SUCCESS))
      // TODO #1: Report errors to sentry/rollbar
      .catch(_error => setStatus(STATUS_ERROR))
  }, [])

  function contribute({message, paymentOption, amount, recurrencyInterval}) {
    const total = isDeposit
      ? parseMoney(amount).value
      : parseMoney(amount).multiply(process.env.REACT_APP_SR_FEE).add(amount).value

    const contribution = {
      accountId: account.hashid,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      amount: total,
      message,
      isPublic,
      paymentSourceId: paymentOption,
      recurrenceInterval: recurrencyInterval ?? 'never',
    }

    const name = `${account.beneficiaryFirstName} ${account.beneficiaryLastName}`

    const msgSuccess = `You just contributed ${amount} to ${name}!`
    const msgFailed = 'Ooops! Something went wrong. Try to contribute again.'

    setLoading(true)
    createContribution({contribution})
      .then(onContribute)
      .then(() => setLoading(false))
      .then(() => success(msgSuccess))
      .catch(error => {
        failed(msgFailed)
        onFail(error)
        setLoading(false)
      })
  }

  function edit({message, paymentOption, amount, recurrencyInterval}) {
    const {beneficiaryFirstName, beneficiaryLastName, hashid} = editing
    const name = `${beneficiaryFirstName} ${beneficiaryLastName}`

    const total = isDeposit
      ? parseMoney(amount).value
      : parseMoney(amount).multiply(process.env.REACT_APP_SR_FEE).add(amount).value

    const contribution = {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      amount: total,
      message,
      isPublic,
      paymentSourceId: paymentOption,
      recurrenceInterval: recurrencyInterval,
    }

    const msgFailed = 'Ooops! Something went wrong. Try to contribute one more time.'
    const msgSuccess = `Your contribution to ${name} is now of ${amount}.`

    setLoading(true)
    updateContribution({contribution}, hashid)
      .then(onEdit)
      .then(() => setLoading(false))
      .then(() => success(msgSuccess))
      .catch(error => {
        failed(msgFailed)
        onFail(error)
        setLoading(false)
      })
  }

  function cancel() {
    const {hashid, beneficiaryFirstName, beneficiaryLastName} = editing
    const name = `${beneficiaryFirstName} ${beneficiaryLastName}`

    const msgCancel = 'Please contact our support team to cancel this contribution.'
    const msgSuccess = `Your future contributions to ${name} were cancelled.`

    setLoading(true)
    cancelRecurring(hashid)
      .then(close)
      .then(onCancel)
      .then(() => setLoading(false))
      .then(() => success(msgSuccess))
      .catch(_error => {
        failed(msgCancel)
        setLoading(false)
      })
  }

  function handleNewSourceAdded(newSource) {
    setRawSources([newSource])
  }

  const handleSubmit = editing ? edit : contribute

  return (
    <div className={cn(['w-full p-10 bg-white', classNames])}>
      <div className="formBox">
        <Form onSubmit={handleSubmit} getIsValid={setIsValid}>
          {beforeForm}
          {(isStatusLoading ||
            isStatusError ||
            (isStatusSuccess && paymentSources.length === 0)) && (
            <div className="grid grid-cols-1 row-gap-1 col-gap-4">
              {isStatusLoading ? (
                <span className="text-lightGray md:col-span-3">
                  We are loading your payment methods...
                </span>
              ) : (
                <AddPaymentSources isDeposit={isDeposit} onSuccess={handleNewSourceAdded} />
              )}
            </div>
          )}
          {isStatusSuccess && paymentSources.length > 0 && (
            <>
              <div
                className={cn([
                  'grid grid-cols-1 col-gap-4 row-gap-1',
                  !editing && 'md:grid-cols-3',
                  formClassNames,
                ])}
              >
                <div>
                  <FormInput
                    name="paymentOption"
                    type="select"
                    options={paymentSources}
                    placeholder="Select a payment method"
                    required
                  />
                  <div className="flex flex-row w-full md:mt-1">
                    <div className="flex items-center h-12 px-4 my-1">
                      <span>$</span>
                    </div>
                    <div className="w-full">
                      <FormInput
                        type="money"
                        name="amount"
                        required
                        placeholder="Amount"
                        defaultValue={editing?.amount}
                      />
                    </div>
                  </div>
                  {!editing && <ContributionValues isDeposit={isDeposit} />}
                </div>
                <div>
                  <FormInput
                    name="message"
                    type="textarea"
                    placeholder="Write a message..."
                    required
                    defaultValue={editing?.message}
                  />
                  <div
                    className="flex items-center mt-1 mb-4 cursor-pointer"
                    onClick={() => setPublic(!isPublic)}
                  >
                    <input
                      type="checkbox"
                      className="mr-2 leading-tight form-checkbox"
                      checked={isPublic}
                      readOnly
                    />
                    <span className="text-sm font-bold">Make contribution amount public</span>
                  </div>
                  {!editing && (
                    <div
                      className="flex items-center mt-1 mb-4 cursor-pointer"
                      onClick={() => setRecurring(!isRecurring)}
                    >
                      <input
                        type="checkbox"
                        className="mr-2 leading-tight form-checkbox"
                        checked={isRecurring}
                        readOnly
                      />
                      <span className="text-sm font-bold">Repeat this contribution</span>
                    </div>
                  )}
                  {(isRecurring || editing) && (
                    <FormInput
                      name="recurrencyInterval"
                      type="select"
                      options={recurrencyList}
                      placeholder="Select interval"
                      required
                      defaultValue={editing?.recurrenceInterval}
                    />
                  )}
                </div>
                {editing && <ContributionValues isDeposit={isDeposit} />}
              </div>
            </>
          )}
          {isStatusSuccess && (
            <div className="flex flex-col justify-between w-full mt-4 md:flex-row">
              {editing && paymentSources.length > 0 ? (
                <>
                  <Button disabled={isLoading} type="button" onClick={open} variant="error">
                    Stop contributing
                  </Button>
                  <Button disabled={!isValid || isLoading} type="submit" className="mt-4 md:mt-0">
                    Update contribution
                  </Button>
                </>
              ) : (
                <>
                  {leftButtons}
                  {isStatusSuccess && paymentSources.length > 0 ? (
                    <Button disabled={!isValid || isLoading} type="submit">
                      Make contribution
                    </Button>
                  ) : (
                    <div />
                  )}
                  {rightButtons}
                </>
              )}
            </div>
          )}
        </Form>
      </div>
      <Dialog
        isOpen={isOpen}
        close={close}
        heading={`Cancel all future contributions to ${editing?.beneficiaryFirstName}`}
        width={[1]}
        buttons={{
          left: [
            <Button variant="error" type="button" onClick={cancel}>
              Stop contribution
            </Button>,
          ],
        }}
      >
        <div className="w-full my-2">
          Are you sure you want to stop contributing to {editing?.beneficiaryFirstName}'
          {editing?.beneficiaryFirstName?.slice(-1) !== 's' ? 's' : ''} future?
        </div>
      </Dialog>
    </div>
  )
}

export {MakeAContribution}
