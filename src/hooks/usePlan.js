import {useState, useCallback} from 'react'
import useSWR from 'swr'
import {useAppContext} from '../context/appContext'
import {useUser} from '../context/user'
import {
  getAccounts,
  showAccount,
  createAccount,
  securityAnswers,
  updateAccount,
} from '../api/accounts'
import {useNotification} from '../hooks/useNotification'
import {decodeError} from '../api/errorDecoder'

export function usePlan() {
  const [isSubmitting, setSubmitting] = useState(false)
  const {setLoading} = useAppContext()
  const {update} = useUser()
  const {success, failed} = useNotification()

  const {data: accounts, mutate} = useSWR('/accounts', getAccounts, {
    suspense: true,
  })

  const showSpinner = useCallback(function spinner(visible) {
    setSubmitting(visible)
    setLoading(visible)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const get = useCallback(function getPlan(id) {
    showSpinner(true)
    return showAccount(id).finally(showSpinner)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const create = useCallback(function createPlan(data) {
    let account
    const {user, answers, ...plan} = data

    showSpinner(true)
    return createAccount({account: plan})
      .then(newAccount => (account = newAccount))
      .then(() =>
        securityAnswers({
          security_answer: {accountId: account.id, answer_batch: answers},
        }),
      )
      .then(() => update({user}))
      .then(() => mutate())
      .then(() => success('User data updated'))
      .then(() => success('Account created!'))
      .then(() => account)
      .catch(e => failed(decodeError(e).text))
      .finally(() => {
        showSpinner(false)
        return account
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateAcc = useCallback(function updateSingleAccount(data, hashId) {
    showSpinner(true)
    return updateAccount({account: data}, hashId)
      .then(() => success('Account updated!'))
      .then(() => {
        mutate(
          accounts.map(a => (a.hashid === hashId ? {...a, ...data} : a)),
          true,
        )
      })
      .catch(e => failed(decodeError(e).text))
      .finally(() => showSpinner(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {create, get, update: updateAcc, isSubmitting, accounts}
}
