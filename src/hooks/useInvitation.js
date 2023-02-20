/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback} from 'react'
import axios from 'axios'

import {useNotification} from './useNotification'
import {decodeError} from '../api/errorDecoder'
import {
  getPending,
  getInvitations,
  deleteInvitation,
  resendInvitation,
  createInvitation,
} from '../api/invitations'
import {useAppContext} from '../context/appContext'

export function useInvitation() {
  const {success, failed} = useNotification()
  const {setLoading} = useAppContext()

  const index = useCallback(function all(hashId) {
    setLoading(true)
    return getInvitations(hashId)
      .then(invitations => {
        setLoading(false)
        return invitations
      })
      .catch(e => failed(decodeError(e).text))
  }, [])

  const pending = useCallback(function pendingInvitation() {
    return getPending()
  }, [])

  const create = useCallback(function newInvitation(invitation, accountHashId) {
    return createInvitation(invitation, accountHashId)
  }, [])

  const createBatch = useCallback(function batchInvitations(invitationsArray, accountHashId) {
    const len = invitationsArray.length
    setLoading(true)
    return axios
      .all(invitationsArray.map(invite => create({invitation: {...invite}}, accountHashId)))
      .then(() => success(`${len} invitation${len > 1 ? 's' : ''} sent.`))
      .catch(e => failed(decodeError(e).text))
      .finally(() => setLoading(false))
  }, [])

  const del = useCallback(function delInvitation(accountHashId, invitationHashId) {
    setLoading(true)
    return deleteInvitation(accountHashId, invitationHashId)
      .then(() => success('Invitation deleted successfully.'))
      .catch(e => failed(decodeError(e).text))
      .finally(() => setLoading(false))
  }, [])

  const resend = useCallback(function resendInvite(accountHashId, invitationHashId) {
    setLoading(true)
    return resendInvitation(accountHashId, invitationHashId)
      .then(() => success('Invite resent successfully.'))
      .catch(e => failed(decodeError(e).text))
      .finally(() => setLoading(false))
  }, [])

  return {create, createBatch, pending, index, del, resend}
}
