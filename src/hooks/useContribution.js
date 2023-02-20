import {useState, useEffect, useCallback} from 'react'
import useSWR from 'swr'

import {
  getContributions,
  createContribution,
  updateContribution,
  flagContribution,
} from '../api/contributions'
import {decodeError} from '../api/errorDecoder'
import {useNotification} from './useNotification'
import {useAppContext} from '../context/appContext'
import {useUser} from '../context/user'

export function useContribution() {
  const [contribution, setContribution] = useState()
  const [isSubmitting, setSubmitting] = useState()
  const {setLoading} = useAppContext()
  const {refresh} = useUser()
  const {success, failed} = useNotification()

  function showSpinner(show) {
    setSubmitting(show)
    setLoading(show)
  }

  const get = useCallback(() => {
    return getContributions()
      .then(contributions =>
        contributions.map(c => {
          if (c.flagged) {
            c.message = '[Flagged as inappropriate]'
          }
          return c
        }),
      )
      .catch(e => e)
  }, [])

  const edit = useCallback(function editContribution(data, hashId) {
    showSpinner(true)
    return updateContribution(data, hashId)
      .then(() => mutate())
      .catch(e => failed(decodeError(e).text))
      .finally(() => showSpinner(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const flag = useCallback(function flagContrib(hashId) {
    showSpinner(true)
    return flagContribution(hashId)
      .then(() => mutate())
      .catch(e => failed(decodeError(e).text))
      .finally(() => showSpinner(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isSubmitting && contribution) {
      const {onSuccess = () => {}, ...data} = contribution
      showSpinner(true)
      createContribution(data)
        .then(onSuccess)
        .then(() => success('Contribution made successfully!'))
        .then(() => mutate())
        .then(refresh)
        .then(() => setContribution())
        .catch(e => failed(decodeError(e).text))
        .finally(() => showSpinner(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contribution])

  const {data: contributions, mutate} = useSWR('/contributions', get, {
    suspense: true,
  })

  return {contribute: setContribution, edit, flag, isSubmitting, contributions, refresh: mutate}
}
