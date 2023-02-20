import api from './index'

export function getPending() {
  return api().get(`/invitations/pending`)
}

export function getInvitations(accountHashId) {
  return api().get(`/accounts/${accountHashId}/invitations`)
}

export function createInvitation(data, accountHashId) {
  return api().post(`/accounts/${accountHashId}/invitations`, data)
}

export function resendInvitation(accountHashId, invitationHashId) {
  return api().get(`/accounts/${accountHashId}/invitations/${invitationHashId}/resend`)
}

export function deleteInvitation(accountHashId, invitationHashId) {
  return api().delete(`/accounts/${accountHashId}/invitations/${invitationHashId}`)
}
