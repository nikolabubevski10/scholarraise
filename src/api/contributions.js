import api from './index'

export function getContributions() {
  return api().get('/contributions')
}

export function cancelRecurring(id) {
  return api().put(`/contributions/${id}/cancel_recurrence`)
}

export function updateContribution(contribution, hashId) {
  return api().put(`/contributions/${hashId}`, contribution)
}

export function createContribution(contribution) {
  return api().post('/contributions', contribution)
}

export function flagContribution(hashId) {
  return api().put(`/contributions/${hashId}/flagged`)
}
