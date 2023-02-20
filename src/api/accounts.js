import api from './index'

export function getAccounts() {
  return api().get('/accounts')
}

export function getBalance(id) {
  return api().get(`/accounts/${id}/balance`)
}

export function showAccount(id) {
  return api().get(`/accounts/${id}`)
}

export function createAccount(data) {
  return api().post('/accounts', data)
}

export function securityAnswers(data) {
  return api().post('/security_answers', data)
}

export function updateAccount(data, hashId) {
  return api().put(`/accounts/${hashId}`, data)
}

export function getNYQuestions() {
  return api().get('/security_questions?provider=NY')
}

export function activeRecurrent(hashId) {
  return api().get(`/accounts/${hashId}/active-contributions`, hashId)
}
